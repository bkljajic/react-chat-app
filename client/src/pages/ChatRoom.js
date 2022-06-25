import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import MessageContainer from "../components/message-container/MessageContainer";
import MessageTextArea from "../components/message-text-area/MessageTextArea";
import Button from "../components/button/Button";
import ChatHeader from "../components/header/ChatHeader";
import "./ChatRoom.css";

const ChatRoom = ({ socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const message = {
      content: newMessage,
      userId: socket.id,
      ownMessage: true,
      timestamp: Date.now(),
      room: room,
      id: uuidv4(),
    };
    socket.emit("send_message", message);
    setMessages((list) => [...list, message]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessages((list) => [
        ...list,
        { ...data, ownMessage: socket.id == data.userId },
      ]);
    });
  }, [socket]);

  return (
    <div className="chat-room-container">
      <ChatHeader title={""} />
      <MessageContainer messages={messages} />
      <MessageTextArea
        message={newMessage}
        handleMessageChange={handleNewMessageChange}
        placeholder={"Write message..."}
      />
      <Button
        text={"Send"}
        clickHandler={handleSendMessage}
        disabled={newMessage.length < 1}
      />
    </div>
  );
};
export default ChatRoom;
