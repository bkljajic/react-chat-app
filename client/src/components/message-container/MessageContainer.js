import React from "react";
import { Virtuoso } from "react-virtuoso";

import Message from "../message/Message";
import { replaceStringWithEmoji } from "../../utils/utils";
import MessageItem from "./MessageItem";
import "./MessageContainer.css";

const MessageContainer = ({ messages }) => {
  return (
    <div className="messages-container">
      <Virtuoso
        components={{ Item: MessageItem }}
        className={"virtuoso-container"}
        data={messages}
        totalCount={messages.length}
        initialTopMostItemIndex={messages.length - 1}
        followOutput
        itemContent={(index, message) => (
          <Message
            key={index}
            {...messages[index]}
            content={replaceStringWithEmoji(message?.content)}
          />
        )}
      />
    </div>
  );
};

export default MessageContainer;
