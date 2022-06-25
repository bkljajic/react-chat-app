import Message from "../message/Message";
import React, { useEffect, useRef } from "react";
import "../ChatRoom.css";

const MessageContainer = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <div className="messages-container">
      <div className="messages-list" ref={messageRef}>
        {messages.map((message, i) => (
          <Message
            key={i}
            ownership={...message}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
