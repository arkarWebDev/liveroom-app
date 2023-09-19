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

const users = [];

const saveUser = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);
  return user;
};

const getDisconnectUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getSameRomeUsers = (room) => {
  return users.filter((user) => user.room === room);
};

// Run when client-server connected
io.on("connection", (socket) => {
  console.log("client connected.");

  const BOT = "ROOM MANAGER BOT";

  //   fired when user joined room
  socket.on("joined_room", (data) => {
    const { username, room } = data;
    const user = saveUser(socket.id, username, room);

    socket.join(user.room);
    //   send welcome message to joined room
    socket.emit("message", formatMessage(BOT, "Welcome to the room."));

    //   send joined message to all users excepted of joined room
    socket.broadcast
      .to(user.room) // React | Node
      .emit("message", formatMessage(BOT, `${user.username} joined the room.`));

    //   listen message from client
    socket.on("message_send", (data) => {
      //   send back message to client
      io.to(user.room).emit("message", formatMessage(user.username, data));
    });

    // send room users
    io.to(user.room).emit("room_users", getSameRomeUsers(user.room));
  });

  //   send disconnect message to all users
  socket.on("disconnect", (_) => {
    const user = getDisconnectUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(BOT, `${user.username} leaved the room.`)
      );
    }
  });
});
