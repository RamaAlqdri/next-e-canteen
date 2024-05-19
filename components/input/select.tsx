import React from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  error?: string;
  type?: "input" | "select"; // Add "select" as an option
  options?: Array<{ value: string; label: string }>; // Only needed for type "select"
  register: Function;
  name: string;
  validationSchema?: any;
}
const SelectCustom: React.FC<FormFieldProps> = ({
    htmlFor,
    label,
    error,
    type = "input",
    options,
    register,
    name,
    validationSchema,
  }) => {
    return (
      <>
        <label
          htmlFor={htmlFor}
          className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
        >
          {label}
        </label>
        {type === "input" && (
          <input
            id={htmlFor}
            {...register(name, validationSchema)}
            className="w-full text-gray-600 font-light text-sm focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-3 border-1 px-6 border-gray-400"
          />
        )}
        {type === "select" && (
          <select
            id={htmlFor}
            {...register(name, validationSchema)}
            className="w-full text-gray-600 font-light text-sm focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-3 border-1 px-6 border-gray-400"
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {error && <p className="text-sm font-light text-red-500">{error}</p>}
      </>
    );
  };
  
  export default SelectCustom;