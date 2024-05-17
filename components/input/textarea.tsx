import React from "react";

const TextareaWithLabel = ({ htmlFor, label, error, register,name,validationSchema }:any) => {
  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
      >
        {label}
      </label>
      <textarea
        id={htmlFor}
        {...register(name, validationSchema)}
        // type = {type}
        className="w-full focus:border-[#EEA147] text-gray-600 text-sm font-light focus:ring-[#EEA147] rounded-xl py-3 border-1 px-6 border-gray-400"
      />
      {error && <div className="text-error">{error}</div>}
    </div>
  );
};

export default TextareaWithLabel;
