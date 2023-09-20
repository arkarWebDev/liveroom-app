const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sent_at: {
    type: Date,
    default: Date.now(),
  },
  room: {
    type: String,
    required: true,
  },
});

module.exports = model("Message", messageSchema);
