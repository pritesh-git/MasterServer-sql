const express = require("express");
const router = express.Router();
const mysqlConnection = require("../Config/cnctDb");
//Get all User
exports.GetAll = (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

//Get an User By ID
exports.GetById = (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Delete an User
exports.DeleteById = (req, res) => {
  mysqlConnection.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Insert an User
exports.CreateUser = (req, res) => {
  let tempData = req.body;
  mysqlConnection.query(
    "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?,?,?)",
    [tempData.name, tempData.email, tempData.password],
    function (err, result) {
      if (!err) res.send(result);
      else console.log(err);
    }
  );
};

//Update an User
exports.UpdateUser = (req, res) => {
  mysqlConnection.query(
    "UPDATE `users` SET `name`=?,`email`=?,`password`=? where `id`=?",
    [req.body.name, req.body.email, req.body.password, req.params.id],
    function (error, results, fields) {
      if (!error) res.send(results);
      else console.log(error);
    }
  );
};
