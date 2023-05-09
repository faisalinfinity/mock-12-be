const express = require("express");
const { userModel } = require("../model/userModel");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email: email });

    if (data.length == 0) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          return res.status(400).send(err.message);
        }
        const new_user = new userModel({ email: email, password: hash });
        await new_user.save();
        res.status(201).send("registered successfully");
      });
    } else {
      res.status(404).send("User already exist");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email: email });

    if (data.length == 0) {
      res.status(404).send("User not found");
    } else {
      let hash = data[0].password;
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          return res.status(400).send(err.message);
        }

        if (result) {
          res.status(201).json({
            token: jwt.sign({ userId: data[0]._id }, "faisal"),
          });
        } else {
          res.status(403).send("incorrect password");
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  userRoute,
};
