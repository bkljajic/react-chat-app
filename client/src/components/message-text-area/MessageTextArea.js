import React from "react";

import "./MessageTextArea.css";

const MessageTextArea = ({ message, handleMessageChange, placeholder }) => {
  return (
    <textarea
      value={message}
      onChange={(e) => handleMessageChange(e)}
      placeholder={placeholder}
      className="new-message-input-field"
    />
  );
};

export default MessageTextArea;
