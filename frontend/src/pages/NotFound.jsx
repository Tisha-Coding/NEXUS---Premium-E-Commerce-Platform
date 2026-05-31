import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Text with animation */}
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-9xl sm:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-lg leading-none">
              404
            </h1>
          </div>
        </div>

        {/* Animated floating elements */}
        <div className="mb-8 flex justify-center gap-4">
          <div className="animate-float">
            <span className="text-4xl">🔍</span>
          </div>
          <div className="animate-float animation-delay-2000">
            <span className="text-4xl">📍</span>
          </div>
          <div className="animate-float animation-delay-4000">
            <span className="text-4xl">❌</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg sm:text-xl mb-4 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted. Let's get you back on track!
        </p>

        {/* Error details */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8 inline-block">
          <p className="text-gray-400 text-sm font-mono">
            Error: Resource Not Found <br />
            Status Code: <span className="text-red-400">404</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            <span>🏠</span>
            Go to Home
          </Link>
          <Link
            to="/collection"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>🛍️</span>
            Browse Products
          </Link>
        </div>

        {/* Help text */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">
            Still need help?
          </p>
          <Link
            to="/contact"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Contact our support team →
          </Link>
        </div>
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-8 left-8 right-8 text-center text-gray-500 text-xs">
        <p>This page was brought to you by NEXUS 🚀</p>
      </div>
    </div>
  );
};

export default NotFound;
