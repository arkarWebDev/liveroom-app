const Message = require("../models/Message");
const OPEND_ROOMS = ["react", "node"];

exports.getOldMessage = (req, res, next) => {
  const { roomName } = req.params;
  if (OPEND_ROOMS.includes(roomName)) {
    Message.find({ room: roomName })
      .select("username message sent_at")
      .then((messages) => {
        res.status(200).json(messages);
      });
  } else {
    res.status(403).json("Room is not opened.");
  }
};
