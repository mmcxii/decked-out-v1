const passport = require('passport');
const express = require('express');
const router = express.Router();
const checkAuthentication = require('../config/checkAuthentication');
const s3Method = require('../models/AWS/s3method');

//USE SECRET

//Auth protected account route
router.get('/account', checkAuthentication, (req, res) => {
    const { username } = req.user.dataValues;

    // this is going to return an array
    s3Method.listDecks(username, data => {
        if (data.error) {
            console.log(data.error);
            res.json(data);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

//check failure redirect here

router.post('/api/login', passport.authenticate('local', { failureRedirect: '/create' }), (req, res) => {
    res.sendStatus(200);
});

//Re-add checkAuthentication after testing
router.get('/api/collection', checkAuthentication, (req, res) => {
    const { username } = req.user.dataValues;

    s3Method.getCollection(username, data => {
        if (data.error) {
            res.json(data);
        } else {
            res.json(data);
        }
    });
});

//Re-add checkAuthentication after testing
router.get('/account/:deckname', checkAuthentication, (req, res) => {
    //Change to req.user.dataValues
    const { username } = req.user.dataValues;
    const deckName = req.params.deckname.split('-').join(' ');

    s3Method.getDeck(username, deckName, data => {
        if (data.error) {
            console.log(data.error);
            res.json(data);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

router.put('/api/updatedeck', (req, res) => {
    //Change to req.user.dataValues
    // const { username } = req.user.dataValues;
    const { username, cardsToAdd, cardsToRemove, deckName } = req.body;

    s3Method.updateDeckList(username, deckName, cardsToAdd, cardsToRemove, data => {
        if (data.error) {
            console.log(data.error);
            res.json(data);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

router.put('/api/updatecollection', checkAuthentication, (req, res) => {
    //Change to req.user.dataValues
    const { cardsToAdd, cardsToRemove } = req.body;
    const { username } = req.user.dataValues;

    s3Method.updateCollection(username, cardsToAdd, data => {
        if (data.error) {
            console.log(data.error);
            res.json(data);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

router.delete('/api/deletedeck', checkAuthentication, (req, res) => {
    const { deckName } = req.body;
    const { username } = req.user.dataValues;

    s3Method.deleteDeckList(username, deckName, data => {
        if (!data.error) {
            res.sendStatus(200);
        } else {
            res.json(data);
        }
    });
});
//make authed

router.post('/api/createcollection', checkAuthentication, (req, res) => {
    const { collection } = req.body;
    //Change to req.user.dataValues for production
    const { username } = req.user.dataValues;

    s3Method.createCollection(username, collection, success => {
        if (success) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
});

//make authed

router.post('/api/createdeck', (req, res) => {
    const { username, deckName, deckList } = req.body;

    //Change to req.user.dataValues for production
    // const { username } = req.user.dataValues;

    s3Method.createDeck(username, deckName, deckList, success => {
        if (success) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;
