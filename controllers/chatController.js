const Message = require("../models/message");
const io = require("../socket");

exports.getMessages = (req, res, next) => {
  const sort = { timestamp: -1 };

  Message.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
    .sort(sort)
    .limit(100);
};

exports.postMessage = (req, res, next) => {
  const { username, message } = req.body;
  if (!message) return res.json({ success: false });

  const newMessage = new Message({
    username: username,
    message: message,
  });

  newMessage.save(function (err) {
    if (err) {
      return next(err);
    }
  });

  io.getIO().emit("postMessage", newMessage);

  res.json({ success: true });
};
