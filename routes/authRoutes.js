const passport = require("passport");
const path = require('path');
const express = require('express');
const router = express.Router();
const checkAuthentication = require('../config/checkAuthentication');



//USE SECRET

router.use(express.static(path.join(__dirname, '../public/')));


//default fallback route, no auth required
router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/user', (req, res) => {
  res.render(req.user.name + 'You\'re home!');
})


//Auth protected account route
router.get('/account', checkAuthentication, (req, res) => {
    console.log('Hit account Route');
    console.log(req.user);
    res.send('This will soon be an account page');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/create'}), (req, res) => {
  console.log('POST ROUTE YO');
  console.log(req.user);
  res.redirect(307, '/user');
})


//Auth protected collection route
router.get('/account/collection', checkAuthentication, (req, res) => {
    res.render('collection');
})


//Auth protected decklist route
router.get('/account/:deckname', checkAuthentication, (req, res) => {
    res.render('deck');
})


router.get('/logout', (req, res) => {
    req.logout();
    res.render('home');
});

module.exports = router;