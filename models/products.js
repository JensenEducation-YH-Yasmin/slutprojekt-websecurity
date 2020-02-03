const Datastore = require("nedb-promise");
const productsDB = new Datastore({
  filename: "./database/products.db",
  autoload: true
});

//Här skapar vi products.db filen med hjälp av products.json filen
//Om vi komenterar inte den här koden, db filen uppdateras om och om igen

// const productsJSON = require("../products.json");
// productsDB.insert(productsJSON);

module.exports = {
  //Med följande defintioner gör vi ändringar i databasen productsDB
  //find, findOne, insert, remove and uppdate

  //find hittar alla produkter
  async all() {
    return await productsDB.find({});
  },
  //findOne hittar en enstakt produkt
  async getOne(id) {
    return await productsDB.findOne({ _id: id });
  },
  //insert skapar ny produkt
  async insert(body) {
    const productCreate = {
      _id: body.id,
      serial: body.serial,
      title: body.title,
      price: body.price,
      shortDesc: body.shortDesc,
      longDesc: body.longDesc,
      imgFile: body.imgFile
    };
    return await productsDB.insert(productCreate);
  },
  //trmove tar bort en produkt
  async remove(id) {
    return await productsDB.remove({ _id: id });
  },
  //update kan uppdatera en produkt
  async update(id, body) {
    let productUpdate = await productsDB.findOne({ _id: id }, { $set: body });
    productUpdate = await productsDB.update(product, { $set: body });
    return productUpdatet;
  }
};
