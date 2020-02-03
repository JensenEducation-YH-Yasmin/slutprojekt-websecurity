const Datastore = require("nedb-promise");

const ordersDB = new Datastore({
  filename: "./database/orders.db",
  autoload: true
});

module.exports = {
  //Med följande defintioner skapar vi order till databasen ordersDB
  //find och insert

  //find hittar alla order
  async all() {
    return await ordersDB.find({});
  },

  //insert skapar ny order
  async insert(body) {
    const OrderInsert = {
      _id: body.id,
      timeStamp: Date.now(),
      status: "inProcess",
      items: body.items,
      orderValue: body.orderValue
    };
    return await ordersDB.insert(OrderInsert);
  }
};
