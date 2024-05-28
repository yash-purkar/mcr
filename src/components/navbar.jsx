import React from "react";
import "./navbar.css";
const Navbar = ({ questions, currentQuestion, handleQuestionClick }) => {
  return (
    <div className="navigation_buttons">
      {Object.values(questions)?.map((item) => (
        <button
        key={item}
          onClick={() => {
            handleQuestionClick(item);
          }}
          className={`navigation_button_item ${
            currentQuestion === item && "active"
          }`}
        >
          {item?.split("")[0]}
          {item?.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
