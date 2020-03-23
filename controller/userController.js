const nedbPromise = require("nedb-promise");
const bcryptJS = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersDb = new nedbPromise({
  filename: "database/users.db",
  autoload: true
});

module.exports = {
  async register(body) {
    if (body.password === body.repeatPassword) {
      const user = await usersDb.findOne({ email: body.email });
      if (user) {
        return false;
      } else {
        const hash = await bcryptJS.hash(body.password, 10);
        const register = {
          name: body.name,
          email: body.email,
          password: hash,
          role: "customer",
          adress: {
            street: body.adress.street,
            zip: body.adress.zip,
            city: body.adress.city
          },

          orderHistory: []
        };
        return await usersDb.insert(register);
      }
    } else {
      return false;
    }
  },

  async login(body) {
    const user = await usersDb.findOne({ email: body.email });
    if (!user) {
      return false;
    } else {
      const passwordCompare = await bcryptJS.compare(
        body.password,
        user.password
      );
      if (passwordCompare) {
        const payload = {
          email: user.email,
          role: user.role,
          userId: user._id
        };
        const secret = process.env.SECRET;
        const token = jwt.sign(payload, secret);

        const userAuth = {
          token: token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role,

            adress: {
              street: user.adress.street,
              city: user.adress.city,
              zip: user.adress.zip
            },
            orderHistory: user.orderHistory
          }
        };
        return userAuth;
      } else {
        return false;
      }
    }
  },

  async verify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({ message: "Error 400" });
    }
    try {
      const secret = process.env.SECRET;
      const userVerify = jwt.verify(token.replace("Bearer ", ""), secret);
      req.user = userVerify;
    } catch (error) {
      res.status(400).json({ message: "Error 400" });
    }

    next();
  },
  async payment(userId, payment) {
    await usersDb.update({ _id: userId }, { $set: { payment: payment } });
  },
  async order(userId, _id) {
    await usersDb.update({ _id: userId }, { $push: { orderHistory: _id } });
  }
};
