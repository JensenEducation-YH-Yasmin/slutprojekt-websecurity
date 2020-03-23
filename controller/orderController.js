const nedbPromise = require("nedb-promise");
const User = require("./userController");
const ordersDb = new nedbPromise({
  filename: "database/orders.db",
  autoload: true
});

module.exports = {
  async all() {
    return await ordersDb.find({});
  },

  async getOne(userId) {
    return await ordersDb.findOne({ owner: userId });
  },

  async create(body, userId) {
    const order = {
      owner: userId,
      timeStamp: Date.now(),
      status: "inProcess",
      items: body.items
    };
    const orderUpdate = await ordersDb.insert(order);
    await User.payment(userId, body.payment);
    await User.order(userId, orderUpdate._id);
    return orderUpdate;
  }
};
