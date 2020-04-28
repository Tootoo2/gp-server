const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-rz9ov.mongodb.net/gambling-picks?retryWrites=true&w=majority`;
const test = require("dotenv").config();
const socketController = require("./controllers/socketController");

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to atlas db");
    const io = require("./socket").init(server);
    socketController(io);
  })
  .catch((err) => console.log(err));

console.log("Server listening on: ", process.env.PORT);
