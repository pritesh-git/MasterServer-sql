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
// app.use(express.static('public'))
//routes path
app.get("/", function (req, res) {
  console.log("server active");
  res.send("Server active");
});

require("./Routes/UserRoute")(app); //route for User actions
require("./Routes/PayRolls")(app); //route for User actions

app.get("/api/signup", (req, res) => {
  res.json({ data: "you hit signup page1" });
});

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
