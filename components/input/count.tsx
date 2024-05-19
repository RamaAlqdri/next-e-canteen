import React from "react";

// Props definition if using TypeScript or PropTypes
interface StockCounterProps {
  countInStockValue: number; // Current stock value
  handleIncrement: () => void; // Function to increment the stock
  handleDecrement: () => void;
  label : string; // Function to decrement the stock
}

const StockCounter: React.FC<StockCounterProps> = ({
  countInStockValue,
  handleIncrement,
  handleDecrement,
  label,
}) => {
  return (
    <>
      <label htmlFor="countInStock" className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        
        <input
          type="text"
          id="countInStock"
          value={countInStockValue}
          readOnly
          className="w-full text-gray-600 font-light text-sm focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-3 border-1 px-6 border-gray-400"
        />
        <button
          type="button"
          onClick={handleDecrement}
          className=" btn-ePrimary border-0 px-4 py-[0.6rem] rounded-xl"
        >
          -
        </button>
        <button
          type="button"
          onClick={handleIncrement}
          className="btn-ePrimary border-0 px-4 py-[0.6rem] rounded-xl"
        >
          +
        </button>
      </div>
    </>
  );
};

export default StockCounter;
