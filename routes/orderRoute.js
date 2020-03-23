const express = require("express");
const router = express.Router();
const ordersDb = require("../controller/orderController");
const usersDb = require("../controller/userController");

router.get("/", usersDb.verify, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const user = await ordersDb.all();
      res.json(user);
    } else if (req.user.role === "customer") {
      const user = await ordersDb.getOne(req.user.ID);
      res.json(user);
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", usersDb.verify, async (req, res) => {
  try {
    const userOrder = await ordersDb.create(req.body, req.user.userId);
    res.json(userOrder);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;
