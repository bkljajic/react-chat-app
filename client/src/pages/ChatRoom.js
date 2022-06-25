import React, { useState } from "react";

import "./ChatRoom.css";

const ChatRoom = ({ socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  return <div className="chat-room-container"></div>;
};
export default ChatRoom;
