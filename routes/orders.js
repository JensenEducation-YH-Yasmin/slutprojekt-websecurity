const express = require("express");
const router = express.Router();
const OrderModels = require("../models/orders");

//Returnerar en lista på samtliga ordrar tillhörande inloggad användare.
//Om admin, returnerar samtliga ordrar.

router.get("/api/orders", async (req, res) => {
  const OrderJSON = await OrderModels.getOrder();
  res.json(OrderJSON);
});

//Skapar en ny order, se order-modell.

router.post("/api/orders", async (req, res) => {
  const OrderJSON = await OrderModels.create(req.body);
  if (!OrderJSON) {
    res.json({ message: "The order is not found" });
  } else {
    res.json({ message: "The order created successfully" });
  }
});

module.exports = router;
