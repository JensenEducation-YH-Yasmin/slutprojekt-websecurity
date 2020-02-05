const express = require("express");
const app = express();
const products = require("./routes/products");
const bodyParser = require("body-parser");
const orders = require("./routes/orders");
const users = require("./routes/users");

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use("/", products);
app.use("/", orders);
app.use("/", users);

app.listen(4200, () => console.log("Server started"));
