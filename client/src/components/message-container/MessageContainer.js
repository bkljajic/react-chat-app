import React, { useEffect, useRef } from "react";

import Message from "../message/Message";
import './MessageContainer.css'
import {replaceStringWithEmoji} from "../../utils/utils";

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
            {...message}
            content={replaceStringWithEmoji(message.content)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
