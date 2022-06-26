const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
    });
  }
  console.log('connected')

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_nickname", function (data) {
    socket.data.user = data.nickname;
    socket.to(data.room).emit("receive_send_nickname", data.nickname);
  });

  socket.on("delete_message", (data) => {
    socket.to(data.room).emit("receive_delete_message", data.id);
  });

  socket.on("is_typing", (data) => {
    socket.to(data.room).emit("receive_is_typing", data.is_typing);
  });

  socket.on("fade_last_message", (data) => {
    socket.to(data.room).emit("receive_fade_last_message", data.id);
  });

  socket.on("countdown", (data) => {
    socket.to(data.room).emit("receive_countdown", data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
