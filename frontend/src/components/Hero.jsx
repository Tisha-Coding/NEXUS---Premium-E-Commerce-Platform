import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl my-6 bg-black">
      {/* Soft white glow accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-white/5 rounded-full blur-3xl"></div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      ></div>

      {/* ===== Floating glass e-commerce icons ===== */}
      {/* Shopping bag */}
      <div className="hidden sm:flex absolute top-16 left-[8%] w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center animate-float shadow-xl">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>

      {/* Cart */}
      <div className="hidden sm:flex absolute bottom-24 left-[14%] w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center animate-float-slow shadow-xl">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      {/* Price tag */}
      <div className="hidden sm:flex absolute top-24 right-[10%] w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center animate-float shadow-xl" style={{ animationDelay: "1.5s" }}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>

      {/* Gift box */}
      <div className="hidden sm:flex absolute bottom-20 right-[15%] w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center animate-float-slow shadow-xl" style={{ animationDelay: "2s" }}>
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h3.5a1.5 1.5 0 011.06.44L12 7l2.44-2.56A1.5 1.5 0 0115.5 4H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M12 4v16" />
        </svg>
      </div>

      {/* Rotating dashed ring accent */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full border border-dashed border-white/10 animate-spin-slow"></div>

      {/* ===== Center glass content card ===== */}
      <div className="relative z-10 flex justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-3xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl px-6 sm:px-12 py-12 sm:py-16 text-center">
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white/90 text-xs sm:text-sm font-medium tracking-widest">
              NEW SEASON 2026 COLLECTION
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white font-bold text-4xl sm:text-6xl leading-tight tracking-tight">
            Elevate Your
            <br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everyday Style
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-sm sm:text-lg max-w-xl mx-auto mt-6">
            Discover premium fashion crafted for comfort and confidence —
            curated pieces that fit real life, only at NEXUS.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Shop Collection</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-white/70 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              Free Shipping
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              7-Day Returns
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              Secure Checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
