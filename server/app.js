const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");

const formatMessage = require("./utils/formatMSG");

const app = express();
app.use(cors());

const server = app.listen(4000, (_) => {
  console.log("Server is running at port : 4000");
});

const io = socketIO(server, {
  cors: "*",
});

// Run when client-server connected
io.on("connection", (socket) => {
  console.log("client connected.");

  const BOT = "ROOM MANAGER BOT";
  //   send welcome message to joined room
  socket.emit("message", formatMessage(BOT, "Welcome to the room."));

  //   send joined message to all users excepted of joined room
  socket.broadcast.emit(
    "message",
    formatMessage(BOT, "Anonymous user joined the room.")
  );

  socket.on("disconnect", (_) => {
    io.emit("message", formatMessage(BOT, "Anonymous user leaved the room."));
  });
});
