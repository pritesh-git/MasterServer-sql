const express = require("express");
const router = express.Router();
const mysqlConnection = require("../Config/cnctDb");

//Get all User
exports.GetAll = (req, res) => {
  mysqlConnection.query("SELECT * FROM payroll", (err, rows, fields) => {
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
    "SELECT * FROM payroll WHERE id = ?",
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
    "DELETE FROM payroll WHERE id = ?",
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


//Update an User
exports.UpdateSalary = (req, res) => {
  let tempData = req.body;
  if(tempData.password) tempData.password = md5(tempData.password);

  mysqlConnection.query(
    "UPDATE `payroll` SET `userId`=?,`salary`=? where `id`=?",
    [tempData.userId, tempData.salary, req.params.id],
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
