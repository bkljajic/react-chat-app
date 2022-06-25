import React from "react";

import "./Message.css";

const Message = ({ ownMessage, content }) => {
  return (
    <div
      className={`message-item ${
        ownMessage ? "my-message" : "received-message"
      }`}
    >
      {content}
    </div>
  );
};
export default Message;
