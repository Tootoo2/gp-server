const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  username: { type: String, required: true },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
