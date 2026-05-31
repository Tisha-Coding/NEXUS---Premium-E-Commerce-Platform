import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const PageBottomStrip = () => {
  const features = [
    {
      icon: assets.parcel_icon,
      title: "Free Shipping",
      desc: "On orders above ₹999",
      highlight: "FREE",
    },
    {
      icon: assets.exchange_icon,
      title: "Easy Returns",
      desc: "7-day hassle-free returns",
      highlight: "7 Days",
    },
    {
      icon: assets.quality_icon,
      title: "Secure Payment",
      desc: "100% secure transactions",
      highlight: "100%",
    },
    {
      icon: assets.support_img,
      title: "24/7 Support",
      desc: "Always here to help",
      highlight: "24/7",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Happy Customers",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4" />
        </svg>
      ),
    },
    {
      number: "50K+",
      label: "Orders Delivered",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 100-4h14a2 2 0 100 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      number: "4.8",
      label: "Average Rating",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 sm:py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative flex items-center gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Numbers */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {stat.number}
                  </span>
                  {stat.label === "Average Rating" && (
                    <span className="text-yellow-400 text-lg">★</span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {feature.title}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 mb-2">
                  {feature.desc}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-black bg-gray-100 px-2 py-1 rounded-full">
                  {feature.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block">
            <Link
              to="/collection"
              className="group relative inline-flex items-center gap-2 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Explore Our Collection</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-gray-500">
            Join thousands of satisfied customers shopping with us
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageBottomStrip;
