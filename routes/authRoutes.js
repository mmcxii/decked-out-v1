const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const path = require('path');
const bCrypt = require("bcrypt");
const db = require("../models");
const express = require('express');
const router = express.Router();
const secret = process.env.SECRET;



//USE SECRET

router.use(require('express-session')({ secret: secret, resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session()); //persistent login sessions
router.use(express.static(path.join(__dirname, '../public/assets')));


passport.use(
  new Strategy(function(username, password, cb) {
    db.User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        //compare incoming password to hashed password from DB
        bCrypt.compare(password, user.password, (err, match) => {
          if (err) throw err;

          if (match) {
            return cb(null, user);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  db.User.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      console.log(err);
    });
});

//default fallback route, no auth required
router.get('/login', (req, res) => {
    res.render('login');
})

//Auth protected account route
router.get('/account', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.render('account');
})


//Auth protected collection route
router.get('/account/collection', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.render('collection');
})


//Auth protected decklist route
router.get('/account/:deckname', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.render('deck');
})


router.get('/logout', (req, res) => {
    req.logout();
    res.render('home');
});

module.exports = router;