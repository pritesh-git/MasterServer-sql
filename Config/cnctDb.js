const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "116.75.243.44",
  user: "root",
  password: "",
  database: "dollop",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mysqlConnection;