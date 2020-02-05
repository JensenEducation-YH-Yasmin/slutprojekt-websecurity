const Datastore = require("nedb-promise");

const ordersDB = new Datastore({
  filename: "./database/orders.db",
  autoload: true
});
const usersDB = require("../models/users");
module.exports = {
  //Med följande defintioner skapar vi order till databasen ordersDB
  //find, findOne och insert

  //hittar alla order
  async all() {
    return await ordersDB.find({});
  },
  //hittar en order
  async getOne(userID) {
    return await ordersDB.findOne({ owner: userID });
  },

  //insert skapar ny order
  async insert(body, userID) {
    const OrderInsert = {
      owner: userID,
      timeStamp: Date.now(),
      status: "inProcess",
      items: body.items,
      orderValue: body.orderValue
    };
    const OrderInsertAdd = await ordersDB.insert(OrderInsert);

    await usersDB.update(
      {
        _id: userID
      },
      {
        $push: {
          orderHistory: OrderInsertAdd._id
        }
      }
    );
  }
};
