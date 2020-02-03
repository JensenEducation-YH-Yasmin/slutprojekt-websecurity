const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
app.use("/", productRoutes);

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.listen(4200, () => console.log("Server started"));
