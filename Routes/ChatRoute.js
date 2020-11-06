module.exports = function (app) {
    const chat = require("../Controller/ChatController");
  
      app.post("/allChat", chat.GetById);
      app.post("/createChat", chat.CreateChat);
  };