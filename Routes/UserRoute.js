module.exports = function (app) {
  const user = require("../Controller/UserController");
 const multer = require("multer");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

    app.post("/newUser", upload.single("profile_pic"), user.CreateUser);
    app.get("/users", user.GetAll);
    app.get("/users/:id", user.GetById);
    app.put("/updateUser/:id", user.UpdateUser);
    app.delete("/deleteUser/:id", user.DeleteById);
};
