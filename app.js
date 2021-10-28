const express = require("express");
const app = express();

//set the template engine ejs
app.set("view engine", "ejs");
//middlewares
app.use(express.static("public"));
//routes
app.get("/", (req, res) => {
  res.render("index");
});
//socket.io instantiation
//listen on every connection

//Listen on port 3000
server = app.listen(4000);
const io = require("socket.io")(server)
io.on("connection", (socket) => {
  console.log("New user connected");
  //default username
  socket.username = "Anonymous";
  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });
  //listen on new_message
  socket.on("new_message", (data) => {
    //broadcast the new message
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});
