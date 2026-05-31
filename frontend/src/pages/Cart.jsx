import { useContext, useState, useEffect } from "react";
import React from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    deleteFromCart,
    token,
    backendUrl,
    setCartItems,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Remove deleted products from cart when cart page loads
  useEffect(() => {
    if (products.length > 0 && cartItems && Object.keys(cartItems).length > 0) {
      let updatedCart = { ...cartItems };
      let hasDeletedItems = false;

      for (const itemId in updatedCart) {
        const product = products.find((p) => p._id === itemId);
        if (!product || product.isDeleted) {
          delete updatedCart[itemId];
          hasDeletedItems = true;
        }
      }

      if (hasDeletedItems) {
        setCartItems(updatedCart);
      }
    }
  }, [products, token]);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    updateQuantity(itemId, size, newQuantity);
  };

  const handleDecrement = (itemId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(itemId, size, currentQuantity - 1);
    }
  };

  const handleIncrement = (itemId, size, currentQuantity) => {
    handleQuantityChange(itemId, size, currentQuantity + 1);
  };

  const handleDeleteClick = (itemId, size) => {
    setDeleteConfirm({ _id: itemId, size });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteFromCart(deleteConfirm._id, deleteConfirm.size);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const isCartEmpty = cartData.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"SHOPPING"} text2={"CART"} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cart is Empty</h2>
            <p className="text-gray-600 text-center max-w-sm mb-8">
              You haven't added any items to your cart yet. Start shopping and add your favorite pieces!
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {cartData.length} {cartData.length === 1 ? "Item" : "Items"}
              </h2>
              <div className="space-y-4">
                {cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id
                  );
                  if (!productData) return null;

                  const displayPrice = productData.saleApplied && productData.finalPrice
                    ? productData.finalPrice
                    : productData.price;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-5 sm:gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={productData.image[0]}
                            alt={productData.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                              {productData.name}
                            </h3>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-base sm:text-lg font-bold text-gray-900">
                                {currency}{Number(displayPrice).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                              </span>
                              {productData.saleApplied && productData.finalPrice && Math.abs(productData.finalPrice - productData.price) > 0.01 && (
                                <span className="text-sm text-gray-500 line-through">
                                  {currency}{Number(productData.price).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                </span>
                              )}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                Size {item.size}
                              </span>
                            </div>
                          </div>

                          {/* Quantity controls and delete */}
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleDecrement(item._id, item.size, item.quantity)
                                }
                                disabled={item.quantity <= 1}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <span className="px-4 py-2 text-sm font-semibold text-gray-900 border-l border-r border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncrement(item._id, item.size, item.quantity)
                                }
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>

                            <button
                              onClick={() => handleDeleteClick(item._id, item.size)}
                              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                              aria-label="Delete item"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                <CartTotal />
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full mt-8 bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/collection")}
                  className="w-full mt-3 border border-gray-300 text-gray-700 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Remove item?</h3>
            <p className="text-gray-600 text-sm text-center mb-6">
              This item will be permanently removed from your cart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
