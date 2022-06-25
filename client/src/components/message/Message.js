import React from "react";

import "./Message.css";

const Message = ({ ownMessage, content, think }) => {
  return (
    <div
      className={`message-item ${ownMessage ? "my-message" : "received-message"}
        ${think ? "think" : ""}`}
    >
      {content}
    </div>
  );
};
export default Message;
