import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const normalizeStatus = (status) => String(status || "").trim().toUpperCase();

  const getStatusStyles = (status) => {
    switch (normalizeStatus(status)) {
      case "PENDING":
      case "PROCESSING":
        return {
          bg: "bg-amber-50",
          text: "text-amber-800",
          border: "border-amber-200",
          badge: "bg-amber-100",
          icon: "⏳",
        };
      case "SHIPPED":
      case "DISPATCHED":
        return {
          bg: "bg-sky-50",
          text: "text-sky-800",
          border: "border-sky-200",
          badge: "bg-sky-100",
          icon: "📦",
        };
      case "DELIVERED":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-800",
          border: "border-emerald-200",
          badge: "bg-emerald-100",
          icon: "✓",
        };
      case "CANCELLED":
      case "CANCELED":
        return {
          bg: "bg-rose-50",
          text: "text-rose-800",
          border: "border-rose-200",
          badge: "bg-rose-100",
          icon: "✕",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          badge: "bg-gray-100",
          icon: "•",
        };
    }
  };

  const filteredOrders =
    statusFilter === "ALL"
      ? orderData
      : orderData.filter(
          (item) => normalizeStatus(item.status) === normalizeStatus(statusFilter)
        );

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item, itemIdx) => {
            const itemWithOrderInfo = {
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order.orderId || null,
              orderMongoId: order._id,
              orderAmount: order.amount,
              showOrderTotal: itemIdx === 0,
            };
            allOrdersItem.push(itemWithOrderInfo);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      // Order loading failed silently
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 text-center max-w-sm mb-8">
              You haven't placed any orders yet. Start shopping and your orders will appear here.
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Collection
            </button>
          </div>
        ) : (
          <div>
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-gray-700 font-medium">
                  {filteredOrders.length} {filteredOrders.length === 1 ? "Order" : "Orders"} Found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 font-medium">Filter:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                >
                  <option value="ALL">All Orders</option>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                {statusFilter !== "ALL" && (
                  <button
                    onClick={() => setStatusFilter("ALL")}
                    className="text-sm font-medium text-gray-600 hover:text-black transition-colors underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  No orders with this status
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Try selecting a different filter.
                </p>
                <button
                  onClick={() => setStatusFilter("ALL")}
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  Show All Orders
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((item, index) => {
                  const statusStyle = getStatusStyles(item.status);
                  const uniqueKey = `${item.orderId || item.orderMongoId || "unknown"}-${index}-${item.name}-${item.size}`;

                  return (
                    <div
                      key={uniqueKey}
                      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                          {/* Product Info */}
                          <div className="flex gap-5 flex-1">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                                {item.name}
                              </h3>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-900 font-semibold">
                                    {currency}{Number(item.finalPrice && item.saleApplied ? item.finalPrice : item.price).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                  </span>
                                  {item.finalPrice && item.saleApplied && item.finalPrice !== item.price && (
                                    <>
                                      <span className="line-through text-gray-400">
                                        {currency}{Number(item.price).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                      </span>
                                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                                        {item.saleDiscountPercentage}% OFF
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 flex-wrap">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                    Size {item.size}
                                  </span>
                                  <span>Qty: {item.quantity}</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                                  <p>Order ID: <span className="font-mono text-gray-700">{item.orderId || "Generating..."}</span></p>
                                  <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                                  <p>Payment: {item.paymentMethod}</p>
                                  {item.showOrderTotal && item.orderAmount != null && (
                                    <p className="mt-2 font-semibold text-gray-900">
                                      Order Total: {currency}{Number(item.orderAmount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Status and Actions */}
                          <div className="flex flex-col items-end gap-4">
                            <span className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold ${statusStyle.badge} ${statusStyle.text}`}>
                              <span className="mr-2">{statusStyle.icon}</span>
                              {item.status}
                            </span>
                            <button
                              onClick={() => {
                                loadOrderData();
                              }}
                              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                              title={`Order ID: ${item.orderId || item.orderMongoId || "N/A"}`}
                            >
                              Track Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
