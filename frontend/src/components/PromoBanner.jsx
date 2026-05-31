import React from "react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-16">
      {/* Card 1 - Men's (dark glass) */}
      <Link
        to="/collection?category=MEN"
        className="group relative overflow-hidden rounded-2xl bg-black p-8 sm:p-10 min-h-[230px] flex flex-col justify-center transition-all hover:shadow-2xl"
      >
        {/* glow + grid */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <span className="relative text-xs font-bold tracking-widest text-white/50 uppercase">
          For Him
        </span>
        <h3 className="relative text-2xl sm:text-3xl font-bold text-white mt-2">
          Men's Edit
        </h3>
        <p className="relative text-white/70 text-sm mt-2 max-w-xs">
          Sharp, comfortable and built to last. Shop the men's lineup.
        </p>
        <span className="relative inline-flex items-center gap-2 text-white font-semibold text-sm mt-5 group-hover:gap-3 transition-all">
          Shop Men
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>

      {/* Card 2 - Women's (light glass) */}
      <Link
        to="/collection?category=WOMEN"
        className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 sm:p-10 min-h-[230px] flex flex-col justify-center transition-all hover:shadow-2xl"
      >
        {/* glow + grid */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-black/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <span className="relative text-xs font-bold tracking-widest text-gray-400 uppercase">
          For Her
        </span>
        <h3 className="relative text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Women's Edit
        </h3>
        <p className="relative text-gray-600 text-sm mt-2 max-w-xs">
          Elegant essentials and statement pieces. Explore the women's range.
        </p>
        <span className="relative inline-flex items-center gap-2 text-black font-semibold text-sm mt-5 group-hover:gap-3 transition-all">
          Shop Women
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default PromoBanner;
