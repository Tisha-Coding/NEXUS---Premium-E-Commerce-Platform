import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const CHECKOUT_FORM_KEY = "checkoutFormData";

const defaultFormData = () => ({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: "",
});

const getRestoredFormData = () => {
  try {
    const s = localStorage.getItem(CHECKOUT_FORM_KEY);
    if (s) {
      const parsed = JSON.parse(s);
      return { ...defaultFormData(), ...parsed };
    }
  } catch (_) {}
  return defaultFormData();
};

const FormInput = ({ label, name, placeholder, type = "text", inputMode = "text", errors, formData, onChangeHandler }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {name !== "lastName" && <span className="text-red-500">*</span>}
    </label>
    <input
      required={name !== "lastName"}
      onChange={onChangeHandler}
      name={name}
      value={formData[name]}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
        errors[name]
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-black"
      }`}
      type={type}
      inputMode={inputMode}
      pattern={inputMode === "numeric" ? "[0-9]*" : undefined}
      placeholder={placeholder}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors[name]}</p>
    )}
  </div>
);

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState(() => getRestoredFormData());
  const [errors, setErrors] = useState({});

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      console.log("❌ User not logged in - redirecting to login");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(formData));
  }, [formData]);

  const clearCheckoutFormData = () => {
    try {
      localStorage.removeItem(CHECKOUT_FORM_KEY);
    } catch (_) {}
  };


  const validateFirstName = (value) => {
    if (!value.trim()) return "First name is required";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "First name can only contain letters and spaces";
    return "";
  };

  const validateLastName = (value) => {
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      return "Last name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return "Email must be valid";
    return "";
  };

  const validateCity = (value) => {
    if (!value.trim()) return "City is required";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "City can only contain letters and spaces";
    return "";
  };

  const validateState = (value) => {
    if (!value.trim()) return "State is required";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "State can only contain letters and spaces";
    return "";
  };

  const validateZipcode = (value) => {
    if (!value.trim()) return "Zipcode is required";
    if (!/^\d+$/.test(value)) return "Zipcode must contain only numbers";
    return "";
  };

  const validateCountry = (value) => {
    if (!value.trim()) return "Country is required";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Country can only contain letters and spaces";
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(value)) return "Phone number must be exactly 10 digits";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return validateFirstName(value);
      case "lastName":
        return validateLastName(value);
      case "email":
        return validateEmail(value);
      case "street":
        return !value.trim() ? "Street is required" : "";
      case "city":
        return validateCity(value);
      case "state":
        return validateState(value);
      case "zipcode":
        return validateZipcode(value);
      case "country":
        return validateCountry(value);
      case "phone":
        return validatePhone(value);
      default:
        return "";
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "phone" || name === "zipcode") {
      value = value.replace(/[^0-9]/g, "");
    }
    if (name === "phone") {
      value = value.slice(0, 10);
    }
    if (name === "firstName" || name === "lastName" || name === "city" || name === "state" || name === "country") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((data) => ({ ...data, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const initPay = (razorpayOrder, orderData) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      receipt: razorpayOrder.receipt,
      handler: async (response) => {
        try {
          const verifyPayload = {
            ...response,
            userId: token ? JSON.parse(atob(token.split('.')[1])).id : null,
            orderData, // Send original order data for database creation
          };

          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            verifyPayload,
            { headers: { token } }
          );

          if (data.success) {
            clearCheckoutFormData();
            navigate("/orders");
            setCartItems({});
            toast.success("Payment successful! Order created.");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          toast.error(error.message || "Payment verification failed");
        }
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Failed to open payment modal");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate all form fields before processing payment
    const newErrors = {};
    newErrors.firstName = validateFirstName(formData.firstName);
    newErrors.lastName = validateLastName(formData.lastName);
    newErrors.email = validateEmail(formData.email);
    newErrors.street = !formData.street.trim() ? "Street is required" : "";
    newErrors.city = validateCity(formData.city);
    newErrors.state = validateState(formData.state);
    newErrors.zipcode = validateZipcode(formData.zipcode);
    newErrors.country = validateCountry(formData.country);
    newErrors.phone = validatePhone(formData.phone);

    const hasValidationErrors = Object.values(newErrors).some((error) => error !== "");

    setErrors(newErrors);

    if (hasValidationErrors) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const totalAmount = getCartAmount() + delivery_fee;
      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
        paymentMethod: method,
      };

      // Stripe minimum amount validation
      if (method === "stripe") {
        const STRIPE_MINIMUM_USD = 0.50;
        const USD_CONVERSION_RATE = 83; // 1 USD = ~83 INR
        const minimumAmountINR = STRIPE_MINIMUM_USD * USD_CONVERSION_RATE;
        const currentAmount = orderData.amount;

        if (currentAmount < minimumAmountINR) {
          const shortfallAmount = (minimumAmountINR - currentAmount).toFixed(2);
          const shortfallUSD = (minimumAmountINR - currentAmount) / USD_CONVERSION_RATE;
          console.log("❌ Stripe Minimum Amount Error:", {
            currentAmount,
            minimumRequired: minimumAmountINR,
            shortfallINR: shortfallAmount,
            shortfallUSD: shortfallUSD.toFixed(2)
          });
          toast.error(
            `Minimum order value for Stripe is ₹${minimumAmountINR.toFixed(2)} ($${STRIPE_MINIMUM_USD}). Please add ₹${shortfallAmount} more to place your order.`
          );
          return;
        }
      }

      switch (method) {
        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            clearCheckoutFormData();
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order, responseRazorpay.data.orderData);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
      }
    } catch (error) {
      toast.error(error.message || "Order placement failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"CHECKOUT"} text2={"DETAILS"} />
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Delivery Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Delivery Information
              </h2>

              <div className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput label="First Name" name="firstName" placeholder="John" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                  <FormInput label="Last Name" name="lastName" placeholder="Doe" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                </div>

                {/* Email */}
                <FormInput label="Email Address" name="email" type="email" placeholder="john@gmail.com" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />

                {/* Address */}
                <FormInput label="Street Address" name="street" placeholder="123 Main St" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />

                {/* City, State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput label="City" name="city" placeholder="New York" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                  <FormInput label="State" name="state" placeholder="NY" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                </div>

                {/* Zipcode, Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput label="Postal Code" name="zipcode" placeholder="10001" inputMode="numeric" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                  <FormInput label="Country" name="country" placeholder="USA" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
                </div>

                {/* Phone */}
                <FormInput label="Phone Number" name="phone" placeholder="1234567890" inputMode="numeric" errors={errors} formData={formData} onChangeHandler={onChangeHandler} />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Payment Method
              </h2>

              <div className="space-y-4">
                {/* Stripe */}
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  method === "stripe"
                    ? "border-black bg-black/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={method === "stripe"}
                    onChange={() => setMethod("stripe")}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <img src={assets.stripe_icon} alt="Stripe" className="h-6" />
                  <span className="font-semibold text-gray-900">Stripe</span>
                </label>

                {/* Razorpay */}
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  method === "razorpay"
                    ? "border-black bg-black/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={method === "razorpay"}
                    onChange={() => setMethod("razorpay")}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
                  <span className="font-semibold text-gray-900">Razorpay</span>
                </label>

              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Order Summary
              </h2>
              <CartTotal />
              <button
                type="submit"
                className="w-full mt-8 bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95"
              >
                Place Order
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing an order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
