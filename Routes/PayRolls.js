module.exports = function (app) {
    const user = require("../Controller/PayrollController");
  
      app.get("/allSalary", user.GetAll);
      app.get("/salary/:id", user.GetById);
      app.put("/updateSalary/:id", user.UpdateSalary);
      app.delete("/deleteSalary/:id", user.DeleteById);
  };