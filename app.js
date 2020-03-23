const express = require("express");
const app = express();
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/", productRoute);
app.use("/api/orders", orderRoute);

app.listen(4200, () => console.log("Server started on http://localhost:4200/"));
