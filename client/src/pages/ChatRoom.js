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
  const [chatWith, setChatWith] = React.useState("");

  const commands = {
    "/nick": handleNickCommand,
  };

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
    handleCommands(message);
    setNewMessage("");
  };

  const handleCommands = (newMessage) => {
    commands.hasOwnProperty(newMessage.content.split(" ")[0])
      ? commands[newMessage.content.split(" ")[0]](newMessage)
      : emitMessage(newMessage);
  };

  const emitMessage = (message) => {
    socket.emit("send_message", message);
    setMessages((list) => [...list, message]);
  };

  function handleNickCommand(message) {
    if (message.content.split(" ")[1] != null) {
      socket.emit("send_nickname", {
        nickname: message.content.split(" ")[1],
        room: room,
        userId: socket.id,
      });
    }
  }

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessages((list) => [
        ...list,
        { ...data, ownMessage: socket.id == data.userId },
      ]);
    });
    socket.on("receive_send_nickname", (data) => {
      setChatWith(data);
    });
  }, [socket]);

  return (
    <div className="chat-room-container">
      <ChatHeader title={chatWith} />
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
