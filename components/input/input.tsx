import React from "react";

// interface InputWithLabelProps {
//   htmlFor: string;
//   label: string;
//   error?: string;
//   type: string;
//   inputProps: any; // This will allow additional props to be passed, including those from register
// }

const InputWithLabel=({
  htmlFor,
  label,
  error,
  type,
  register,
  name,
  validationSchema,
}:any) => {
  // console.log(inputProps)

  return (
    <>
      <label
        htmlFor={htmlFor}
        className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
      >
        {label}
      </label>
      <input
        id={htmlFor}
        type={type}
        {...register(name, validationSchema)}

        className="w-full text-gray-600 font-light text-sm focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-3 border-1 px-6 border-gray-400"
      />
      {error && <p className="text-sm font-light text-red-500 ">{error}</p>}
    </>
  );
}

export default  InputWithLabel;
