const passport = require("passport");
const path = require('path');
const express = require('express');
const router = express.Router();
const checkAuthentication = require('../config/checkAuthentication');
const s3Method = require('../models/AWS/s3method');



//USE SECRET

router.use(express.static(path.join(__dirname, '../public/')));


//default fallback route, no auth required
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
})

router.get('/user', (req, res) => {
  res.send(req.user.dataValues.username + ' You\'re home!');
})


//Auth protected account route
router.get('/account', checkAuthentication, (req, res) => {
    res.send('This will soon be an account page');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/create'}), (req, res) => {
  console.log('POST ROUTE YO');
  console.log(req.user);
  res.redirect(307, '/user');
})


//Auth protected collection route
router.get('/account/collection', checkAuthentication, (req, res) => {
    res.send('This is where your collection will display! ' + JSON.stringify(s3Method.getCollection(req.user.dataValues.username)));
})

//Auth protected decklist route
router.get('/account/:deckname', checkAuthentication, (req, res) => {

  res.send('This is will show your deck!');
})


router.post('/api/createcollection', (req, res) => {
    const {collection} = req.body;
    const {username} = req.user.dataValues;

    if (s3Method.createCollection()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
})


router.get('/logout', (req, res) => {
    req.logout();
    res.send('Home.');
});

module.exports = router;