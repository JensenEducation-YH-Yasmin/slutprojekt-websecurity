const express = require("express");
const router = express.Router();
const ProductModels = require("../models/products");

//Returnerar en lista på samtliga produkter.
router.get("/api/products", async (req, res) => {
  const getAll = await ProductModels.all();
  res.json(getAll);
});

//Returnerar en enstaka produkt.
router.get("/api/products/:id", async (req, res) => {
  const create = await ProductModels.create(req.params.id);
  if (create) {
    res.json(create);
  } else {
    res.json({ message: "This product is not available" });
  }
});

//Skapar en ny produkt, se produkt-modell.
//Enbart tillgänglig för Admin

router.post("/api/products", async (req, res) => {
  const create = await ProductModels.create(req.body);
  if (!create) {
    res.json({ message: "Try again!" });
  } else {
    res.json(create);
  }
});

//Uppdaterar produkt, se produkt-modell.
//Enbart tillgänglig för Admin
router.patch("/api/products/:id", async (req, res) => {
  let update = await ProductModels.update(req.params.id, req.body);
  if (!update) {
    res.json({ message: "Try again! " });
  } else {
    res.json(update);
  }
});

//Tar bort en produkt med :id.
//Enbart tillgänglig för Admin

router.delete("/api/products/:id", async (req, res) => {
  const remove = await ProductModels.remove(req.params.id);
  if (!remove) {
    res.json({ message: "Removed successfully!" });
  } else {
    res.json(remove);
  }
});
module.exports = router;
