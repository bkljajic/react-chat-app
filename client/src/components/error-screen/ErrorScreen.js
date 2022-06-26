import React from "react";

import "./ErrorScreen.css";

const ErrorScreen = ({ message }) => {
  return <div className="error-container">{message}</div>;
};

export default ErrorScreen;

