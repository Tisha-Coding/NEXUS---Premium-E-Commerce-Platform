import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center mb-3">
      <p className="w-8 sm:w-12 h-[2px] bg-gray-300"></p>
      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-400">
        {text1}{" "}
        <span className="text-gray-900">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[2px] bg-gray-300"></p>
    </div>
  );
};

export default Title;
