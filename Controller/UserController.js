const express = require("express");
const router = express.Router();
const mysqlConnection = require("../Config/cnctDb");
var md5 = require('md5');

//Get all User
exports.GetAll = (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.status(200).json({
        success:true,
        data: rows
      })
    }
    else{
      res.status(200).json({
        success: false,
        data: { message: "Something went to wrong!" + err },
      });
    }
  });
};

//Get an User By ID
exports.GetById = (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err){
         res.status(200).json({
        success:true,
        data: rows
      })
      }
      else{
        res.status(200).json({
        success: false,
        data: { message: "Something went to wrong!" + err },
      });
      }
    }
  );
};

//Delete an User
exports.DeleteById = (req, res) => {
  mysqlConnection.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err){
         res.status(200).json({
        success:true,
        data: rows
      })
      }
      else{
        res.status(200).json({
        success: false,
        data: { message: "Something went to wrong!" + err },
      });
      }
    }
  );
};

//Insert an User
exports.CreateUser = (req, res) => {
  let tempData = req.body;
  tempData.password = md5(tempData.password);
  mysqlConnection.query(
    "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?,?,?)",
    [tempData.name, tempData.email, tempData.password],
    function (err, rows) {
      if (!err) {
        res.status(200).json({
          success:true,
          data: rows
        })
      }
      else{
        res.status(200).json({
        success: false,
        data: { message: "Something went to wrong!" + err },
      });
      }
    }
  );
};

//Update an User
exports.UpdateUser = (req, res) => {
  let tempData = req.body;
  if(tempData.password) tempData.password = md5(tempData.password);

  mysqlConnection.query(
    "UPDATE `users` SET `name`=?,`email`=?,`password`=? where `id`=?",
    [tempData.name, tempData.email, tempData.password, req.params.id],
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({
          success:true,
          data: rows
        })
      }
      else {
        res.status(200).json({
          success: false,
          data: { message: "Something went to wrong!" + err },
        });
      }
    }
  );
};
