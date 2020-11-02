const express = require("express");
const router = express.Router();
const mysqlConnection = require("../Config/cnctDb");
var md5 = require("md5");

//Get all User
exports.GetAll = (req, res) => {
  var qury = "SELECT users.id,name,email,salary FROM users LEFT JOIN payroll ON(users.id = payroll.userId)";
  mysqlConnection.query(qury, (err, rows, fields) => {
    if (!err) {
      res.status(200).json({
        success: true,
        data: rows,
      });
    } else {
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
    "SELECT * FROM users WHERE id = ? LEFT JOIN payroll ON(users.id = payroll.userId)",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          success: true,
          data: rows,
        });
      } else {
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
    "DELETE FROM users WHERE id = ? LEFT JOIN payroll ON(users.id = payroll.userId)",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          success: true,
          data: rows,
        });
      } else {
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
  var salry = tempData.salary?tempData.salary:'0';

  mysqlConnection.query(
    "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?,?,?)",
    [tempData.name, tempData.email, tempData.password],
    function (err, rows) {
      mysqlConnection.query(
        "INSERT INTO `payroll`(`userId`, `salary`) VALUES (?,?)",
        [rows.insertId,salry]
      );
      if (!err) {
        res.status(200).json({
          success: true,
          data: rows,
        });
      } else {
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
  if (tempData.password) tempData.password = md5(tempData.password);

  mysqlConnection.query(
    "UPDATE `users` SET `name`=?,`email`=?,`password`=? where `id`=?",
    [tempData.name, tempData.email, tempData.password, req.params.id],
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({
          success: true,
          data: rows,
        });
      } else {
        res.status(200).json({
          success: false,
          data: { message: "Something went to wrong!" + err },
        });
      }
    }
  );
};
