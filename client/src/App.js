import React from "react";
import {io} from "socket.io-client";

import './App.css'


const SOCKET_SERVER_URL = "http://localhost:8000";
const ROOM = "GENERAL";
const socket = io(SOCKET_SERVER_URL, {autoConnect: false});
socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.connect();
socket.emit("join_room", ROOM)

function App() {
  return (
    <div>
      <h1 className='heading__one'>React application!!!</h1>
    </div>
  );
}

export default App;
