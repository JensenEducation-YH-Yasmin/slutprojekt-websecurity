const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const OrderModels = require("../models/orders");
require("dotenv").config();

//Returnerar en lista på samtliga ordrar tillhörande inloggad användare.
//Om admin, returnerar samtliga ordrar.

router.get("/api/orders", async (req, res) => {
  if (req.headers.authorization === undefined) {
    //403 Forbidden:
    // The request contained valid data and was understood by the server,
    //but the server is refusing action.
    res.status(403).json({ error: "403 Forbidden" });
  } else {
    try {
      const Client = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.SECRET
      );
      if (Client.role === "admin") {
        const AllOrders = await OrderModels.all();
        res.status(201).json(AllOrders);
      } else if (Client.role === "customer") {
        const OneOrder = await OrderModels.getOne();
        res.json(OneOrder);
      }
    } catch (error) {
      res.status(403).json({ error: "403 Forbidden" });
    }
  }
});

//Skapar en ny order, se order-modell.

router.post("/api/orders", async (req, res) => {
  const Client = jwt.verify(
    req.headers.authorization.replace("Bearer ", ""),
    process.env.SECRET
  );
  if (req.headers.authorization === undefined) {
    res.status(403).json({ error: "403 Forbidden" });
  } else {
    try {
      const Clientorder = await OrderModels.create(req.body, Client.userID);
      res.status(201).json(Clientorder);
    } catch (error) {
      res.status(403).json({ error: "403 Forbidden" });
    }
  }
});

module.exports = router;
