const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModels = require("../models/users");
require("dotenv").config();

//Registrerar en user enligt User-modellen.

router.post("/api/register", async (req, res) => {
  const userRegister = await userModels.register(req.body);
  if (userRegister) {
    res.status(201).json(userRegister);
  } else {
    //404 Not Found
    //The requested resource could not be found but may be available in the future.
    //Subsequent requests by the client are permissible.
    res.status(404).json({ message: "404 Not Found" });
  }
});

//Authentiserar user med email & password.
//Returnerar en JWT-token som används vid varje anrop API:et i en Authorization-header.

router.post("/api/auth", async (req, res) => {
  const userLogin = await userModels.login(req.body);
  if (userLogin) {
    //201 Created: The request has been fulfilled,
    //resulting in the creation of a new resource.
    res.status(201).json(userLogin);
  } else {
    //401 Unauthorized: Similar to 403 Forbidden,
    //but specifically for use when authentication is required
    //and has failed or has not yet been provided.
    res.status(401).json({ error: "401 Unauthorized" });
  }
});

module.exports = router;
