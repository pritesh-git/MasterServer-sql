const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

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

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
