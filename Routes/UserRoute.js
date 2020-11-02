module.exports = function (app) {
  const user = require("../Controller/UserController");

  // //   app.post("/login", user.LoginUser);
    app.post("/newUser", user.CreateUser);
    app.get("/users", user.GetAll);
    app.get("/users/:id", user.GetById);
    app.put("/updateUser/:id", user.UpdateUser);
    app.delete("/deleteUser/:id", user.DeleteById);
};
