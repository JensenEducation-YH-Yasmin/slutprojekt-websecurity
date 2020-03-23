const express = require("express");
const router = express.Router();
const User = require("../controller/userController.js");

router.post("/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json({
      message: "Username registered successfully."
    });
  } else {
    res.send("Username already exists.");
  }
});

router.post("/auth", async (req, res) => {
  const token = await User.login(req.body);
  if (token) {
    res.json(token);
  } else {
    res.send("Username is not authorized");
  }
});

module.exports = router;
