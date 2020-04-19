const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const ChatController = require("./controllers/chatController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  // Authenticaton
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/user", Authentication.getUser);

  // Message
  app.post("/message", ChatController.postMessage);
  app.get("/chat", ChatController.getMessages);
};
