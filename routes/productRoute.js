const express = require("express");
const router = express.Router();
const usersDb = require("../controller/userController");
const productsDb = require("../controller/productController");

router.get("/products", async (req, res) => {
  const product = await productsDb.all();
  res.json(product);
});

router.post("/products", usersDb.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const product = await productsDb.create(req.body);
    res.json(product);
  } else {
    res.json({ message: "The product successfully created." });
  }
});

router.patch("/products/:id", usersDb.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const product = await productsDb.update(req.params.id, req.body);
    res.json(product);
  } else {
    res.json({ message: "Error: Can't update the product" });
  }
});

router.delete("/products/:id", usersDb.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const product = await productsDb.remove(req.params.id);
    res.json(product);
  } else {
    res.json({ message: "Error: Can't remove the product" });
  }
});
module.exports = router;
