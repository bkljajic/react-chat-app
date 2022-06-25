import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";

import MessageContainer from "../components/message-container/MessageContainer";
import MessageTextArea from "../components/message-text-area/MessageTextArea";
import Button from "../components/button/Button";
import ChatHeader from "../components/header/ChatHeader";
import TypingIndicator from "../components/typing-indicator/TypingIndicator";
import "./ChatRoom.css";

const ChatRoom = ({ socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [chatWith, setChatWith] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const commands = {
    "/nick": handleNickCommand,
    "/think": handleThinkCommand,
    "/oops": handleOopsCommand,
  };

  const handleNewMessageChange = (event) => {
    !isTyping && socket.emit("is_typing", { room: room, is_typing: true });
    setNewMessage(event.target.value);
    debouncedEmitIsTyping();
  };
  const emitIsTyping = () => {
    socket.emit("is_typing", { room: room, is_typing: false });
  };

  const debouncedEmitIsTyping = useMemo(
    () => debounce(emitIsTyping, 1000),
    []
  );


  const handleSendMessage = () => {
    const message = {
      content: newMessage,
      userId: socket.id,
      ownMessage: true,
      timestamp: Date.now(),
      room: room,
      id: uuidv4(),
      think: false,
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
    emitIsTyping();
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

  function handleThinkCommand(message) {
    if (message.content.split(" ")[1] != null) {
      message.think = true;
      message.content = message.content.substring(
        message.content.indexOf(" ") + 1
      );
      socket.emit("send_message", message);
      setMessages((list) => [...list, message]);
    }
  }

  function handleOopsCommand() {
    let lastMessage = getLastMessage();
    socket.emit("delete_message", {
      room: lastMessage.room,
      id: lastMessage.id,
    });
    setMessages((list) => list.filter((item) => item.id !== lastMessage.id));
  }

  function getLastMessage() {
    return messages
      .filter((message) => message.userId == socket.id)
      .sort(messages.timestamp)
      .pop();
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
    socket
      .off("receive_delete_message")
      .on("receive_delete_message", (data) => {
        setMessages((list) => list.filter((item) => item.id !== data));
      });
    socket.on("receive_is_typing", (data) => {
      setIsTyping(data);
    });
  }, [socket]);

  return (
    <div className="chat-room-container">
      <ChatHeader title={chatWith} />
      <MessageContainer messages={messages} />
      {isTyping && <TypingIndicator />}
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
