const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const socketio = require('socket.io');


const server = http.createServer(app);
const io = socketio(server);
// Bodyparser middleware
app.use(bodyParser.json()).use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//handle cors error
app.use(cors("Access-Control-Allow-Origin", "*"));

//Sql connection
require("./Config/cnctDb");
app.use("/public", express.static(__dirname + '/public'));
// http://localhost:8000/public/Image123.png

//routes path
app.get("/", function (req, res) {
  console.log("server active");
  res.send("Server active");
});

require("./Routes/UserRoute")(app); //route for User actions
require("./Routes/PayRolls")(app); //route for Payroll actions
require("./Routes/ChatRoute")(app); //route for Chats actions

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);
  
    socket.join(user.room);
   
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
