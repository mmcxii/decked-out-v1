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
router.use(express.static(path.join(__dirname, '../public/')));


passport.use(
  new Strategy( function(username, password, cb) {
    
    //Match user
    db.User.findOne({
      where: {
        username: username.toLowerCase()
      }
    })
      .then(user => {
        
        if (!user) {
          return cb(null, false, {message: 'Username not found'})
        }

        // Match password
        bCrypt.compare(password, user.password, (err, match) => {
          if (err) throw err;

          if (match) {
            return cb(null, user);
          } else {
            return cb(null, false, {message: 'Incorrect password'})
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findByPk(id)
    .then(user => {
      cb(null, user);
    })
    .catch(cb);
});

//default fallback route, no auth required
router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/', (req, res) => {
  res.render('home');
})


//Auth protected account route
router.get('/account', passport.authenticate('local', {failureRedirect: '/create'}), (req, res) => {
    console.log('Hit account Route');
    console.log(req.user);
    res.render('account');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/create'}), (req, res) => {
  console.log('POST ROUTE YO');
  console.log(req.user);
  res.redirect(307, '/');
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