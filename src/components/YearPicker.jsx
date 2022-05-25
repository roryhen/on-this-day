import { useState } from "react";

function YearPicker({ setYear }) {
  const [active, setActive] = useState(1);

  function handleClick(id, range) {
    setYear(range);
    setActive(id);
  }

  function handleClass(id) {
    return `${
      active === id ? "text-white bg-blue-800" : "text-blue-400 bg-blue-100"
    } py-2 px-5 text-lg whitespace-nowrap transition-colors ease duration-300`;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        <button
          onClick={() => handleClick(1, [0, 10])}
          className={handleClass(1)}
        >
          0 - 10
        </button>
        <button
          onClick={() => handleClick(2, [11, 50])}
          className={handleClass(2)}
        >
          11 - 50
        </button>
        <button
          onClick={() => handleClick(3, [51, 100])}
          className={handleClass(3)}
        >
          51 - 100
        </button>
        <button
          onClick={() => handleClick(4, [101, 500])}
          className={handleClass(4)}
        >
          101 - 500
        </button>
        <button
          onClick={() => handleClick(5, [501, 1000])}
          className={handleClass(5)}
        >
          501 - 1000
        </button>
        <button
          onClick={() => handleClick(6, [1001, Infinity])}
          className={handleClass(6)}
        >
          1001+
        </button>
      </div>
    </div>
  );
}

export default YearPicker;
