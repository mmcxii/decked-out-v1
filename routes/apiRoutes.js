const db = require("../models");
const express = require("express");
const router = express.Router();
const bCrypt = require("bcrypt");

router.post("/api/createuser", (req, res) => {
  const password = req.body.password;

  db.User.findOne({
    where: {
      username: req.body.username.toLowerCase()
    }
  })
    .then(user => {
      if (!user) {
        //hash password
        bCrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;

          const newUser = {
            username: req.body.username.toLowerCase(),
            password: hash,
            secret_answer: req.body.secret
          };
          //store hashed pass in the DB
          db.User.create(newUser)
            .then(data => {
              res.sendStatus(200);
            })
            .catch(err => {
              res.sendStatus(500);
              console.log(err);
            });
        });
      } else {
        res.json({
          message: "Username alread in use."
        });
      }
    })
    .catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});



module.exports = router;
