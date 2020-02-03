const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use("/", productsRoutes);
app.use("/", ordersRoutes);

app.listen(4200, () => console.log("Server started"));
