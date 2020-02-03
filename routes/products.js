const express = require("express");
const router = express.Router();
const Product = require("../models/products");

//Returnerar en lista på samtliga produkter.
router.get("/api/products", async (req, res) => {
  const product = await Product.all();
  res.json(product);
});

//Returnerar en enstaka produkt.
router.get("/api/products/:id", async (req, res) => {
  const product = await Product.create(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "This product is not available" });
  }
});

//Skapar en ny produkt, se produkt-modell.
//Enbart tillgänglig för Admin

router.post("/api/products", async (req, res) => {
  const post = await Product.create(req.body);
  if (!post) {
    res.json({ message: "Couldn't create post" });
  } else {
    res.json(post);
  }
});

//Uppdaterar produkt, se produkt-modell.
//Enbart tillgänglig för Admin
router.patch("/api/products/:id", async (req, res) => {
  let post = await Product.update(req.params.id, req.body);
  if (!post) {
    res.json({ message: "Couldn't update " });
  } else {
    res.json(post);
  }
});

//Tar bort en produkt med :id.
//Enbart tillgänglig för Admin

router.delete("/api/products/:id", async (req, res) => {
  const post = await Product.remove(req.params.id);
  if (!post) {
    res.json({ message: "Product removed" });
  } else {
    res.json(post);
  }
});
module.exports = router;
