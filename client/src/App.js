import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import ChatRoom from "./pages/ChatRoom";
import ErrorScreen from "./components/error-screen/ErrorScreen";

const SOCKET_SERVER_URL = "http://localhost:8000";
const ROOM = "GENERAL";
const socket = io(SOCKET_SERVER_URL, { autoConnect: false });
//log events for testing purposes will be deleted
socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.connect();
socket.emit("join_room", ROOM);

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    socket.off("connect_error").on("connect_error", function (err) {
      setErrorMessage("Error connecting to server");
      setHasError(true);
    });
    socket.on("receive_join_room", function (data) {
      if (!data.join) {
        setHasError(true);
        setErrorMessage("Max number of users (2) already joined room");
      }
    });
  }, [socket]);

  return (
    <div>
      {hasError ? (
        <ErrorScreen message={errorMessage} />
      ) : (
        <ChatRoom socket={socket} room={ROOM} />
      )}
    </div>
  );
}

export default App;
