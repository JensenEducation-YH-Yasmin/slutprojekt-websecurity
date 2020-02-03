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
    if (body.password === body.repeatPassword) {
      const userName = await usersDB.findOne({ email: body.email });
      if (userName) {
        return false;
      } else {
        const passwordHash = await bcrypt.hash(body.password, 10);
        const userInsert = {
          email: body.email,
          password: passwordHash,
          role: "costumer",
          name: body.name,
          adress: {
            street: body.adress.street,
            zip: body.adress.zip,
            city: body.adress.city
          },
          payment: {
            cardOwner: cardOwner,
            cardNumber: cardNumber,
            validUntil: validUntil,
            cvv: cvv
          },
          orderHistory: body.orderHistory
        };

        return await usersDB.insert(userInsert);
      }
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
        const payment = {
          token: "JWT_TOKEN",
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
            adress: {
              street: user.adress.street,
              city: user.adress.city,
              zip: user.adress.zip
            }
          }
        };
        const token = jwt.sign(payload, secret);
        return token;
      } else {
        return false;
      }
    }
  }
};
