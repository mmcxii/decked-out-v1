const db = require("../models");
const express = require("express");
const router = express.Router();
const bCrypt = require("bcrypt");

router.post("/api/createuser", (req, res) => {
  const password = req.body.password;

  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      console.log(user);
      if (!user) {
        bCrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;

          const newUser = {
            username: req.body.username,
            password: hash,
            secret_answer: req.body.secret
          };
          //store hashed pass in the DB
          db.User.create(newUser)
            .then(data => {
              res.redirect("/account");
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
          res.send('Username exists!');
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
