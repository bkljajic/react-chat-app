import React from "react";
import {io} from "socket.io-client";

import './App.css'
import ChatRoom from "./pages/ChatRoom";


const SOCKET_SERVER_URL = "http://localhost:8000";
const ROOM = "GENERAL";
const socket = io(SOCKET_SERVER_URL, {autoConnect: false});
//log events for testing purposes will be deleted
socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.connect();
socket.emit("join_room", ROOM)

function App() {
  return (
    <div>
      <ChatRoom socket={socket} room={ROOM}/>
    </div>
  );
}

export default App;
