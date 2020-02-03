const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModels = require("../models/users");
require("dotenv").config();
const secret = process.env.SECRET;

//Registrerar en user enligt User-modellen.

router.post("/api/register", async (req, res) => {
  const userRegister = await userModels.register(req.body);
  if (userRegister) {
    res.json(userRegister);
  } else {
    res.send("Error!");
  }
});

//Authentiserar user med email & password.
//Returnerar en JWT-token som används vid varje anrop API:et i en Authorization-header.

router.post("/api/auth", async (req, res) => {
  const token = await userModels.userLogin(req.body);
  const confirm = jwt.verify(token, secret);
  if (confirm) {
    res.json(confirm);
    console.log(confirm);
  } else {
    res.send("Not authorized!");
  }
});

module.exports = router;
