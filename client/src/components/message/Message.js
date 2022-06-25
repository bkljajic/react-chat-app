import React from "react";

import "./Message.css";

const Message = ({ ownMessage, content, think, faded, highlight }) => {
  return (
    <div
      className={`message-item ${ownMessage ? "my-message" : "received-message"}
        ${think ? "think" : ""}
        ${faded ? "faded" : ""}
        ${highlight ? "highlight" : ""}`
      }
    >
      {content}
    </div>
  );
};
export default Message;
