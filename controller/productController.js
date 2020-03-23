const nedbPromise = require("nedb-promise");
require("dotenv").config();

const productsDb = new nedbPromise({
  filename: "database/products.db",
  autoload: true
});

// const productsJson = require("../product.json");
// productsDb.insert(productsJson);

module.exports = {
  async all() {
    return await productsDb.find({});
  },

  async getOne(id) {
    return await productsDb.findOne({ _id: id });
  },

  async create(body) {
    return await productsDb.insert({
      _id: body.id,
      serial: body.serial,
      title: body.title,
      price: body.price,
      shortDesc: body.shortDesc,
      longDesc: body.longDesc,
      imgFile: body.imgFile
    });
  },

  async remove(id) {
    return await productsDb.remove({ _id: id });
  },

  async update(id, body) {
    const product = await productsDb.findOne({ _id: id });
    product = await productsDb.update(product, { $set: body });
    return product;
  }
};
