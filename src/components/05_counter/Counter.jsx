import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [inputNumber, setInputNumber] = useState(1);
  const [counter, setCounter] = useState(0);

  const handleClick = (type) => {
    if (type === "ADD") setCounter((prev) => prev + Number(inputNumber));
    else setCounter((prev) => prev - Number(inputNumber));
  };

  return (
    <div>
      <div>
        <h2>Counter: {counter}</h2>
        <div style={{ display: "flex" }}>
          <button
            className="counter_plus_btn"
            onClick={() => handleClick("ADD")}
          >
            +
          </button>
          <button className="counter_minus_btn" onClick={handleClick}>
            -
          </button>
          <input
            type="number"
            className="counter_input"
            value={inputNumber}
            onChange={(e) => {
              console.log(e.target.value);
              setInputNumber(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Counter;
