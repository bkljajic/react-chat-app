import React from "react";

import "./Button.css";

const Button = ({ text, clickHandler, disabled }) => {
  return (
    <button
      onClick={clickHandler}
      className="send-message-button"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
