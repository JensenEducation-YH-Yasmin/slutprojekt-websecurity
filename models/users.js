const Datastore = require("nedb-promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersDB = new Datastore({
  filename: "./database/users.db",
  autoload: true
});

module.exports = {
  async register(body) {
    const userName = await usersDB.findOne({ email: body.email });
    if (!userName) {
      return false;
    } else if (body.password === body.repeatPassword) {
      const passwordHash = await bcrypt.hash(body.password, 10);
      const userInsert = {
        email: body.email,
        password: passwordHash,
        role: "customer",
        name: body.name,
        adress: {
          street: body.adress.street,
          zip: body.adress.zip,
          city: body.adress.city
        },
        orderHistory: body.orderHistory
      };

      return await usersDB.insert(userInsert);
    } else {
      return false;
    }
  },

  async login(body) {
    const userName = await usersDB.findOne({ email: body.email });
    if (!userName) {
      return false;
    } else {
      const passwordCompare = await bcrypt.compare(
        body.password,
        userName.password
      );
      if (passwordCompare) {
        const payload = {
          userID: userName._id,
          role: userName.role
        };
        const token = jwt.sign(payload, process.env.SECRET);
        return {
          token: token,
          user: {
            email: userName.email,
            name: userName.name,
            role: userName.role,
            adress: {
              street: userName.adress.street,
              city: userName.adress.city,
              zip: userName.adress.zip
            },
            orderHistory: userName.orderHistory
          }
        };
      } else {
        return false;
      }
    }
  }
};
