const express = require("express");
const router = express.Router();
const mysqlConnection = require("../Config/cnctDb");

//Get an Chat By UserID

exports.GetById = (req, res) => {
    var tempData = req.body;
  mysqlConnection.query(
    "SELECT * FROM chat WHERE (toUserId = ? AND fromUserId = ?) OR (fromUserId = ? AND toUserId = ?)",
    [tempData.toUser,tempData.fromUser,tempData.toUser,tempData.fromUser],
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

//Create an Chat
exports.CreateChat = (req, res) => {
  let tempData = req.body;
  mysqlConnection.query(
    "INSERT INTO `chat`(`toUserId`, `fromUserId`,`msg`) VALUES (?,?,?)",
    [tempData.toUser, tempData.fromUser, tempData.msg],
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
