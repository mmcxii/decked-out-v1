const passport = require("passport");
const path = require("path");
const express = require("express");
const router = express.Router();
const checkAuthentication = require("../config/checkAuthentication");
const s3Method = require("../models/AWS/s3method");

//USE SECRET

router.use(express.static(path.join(__dirname, "../public/")));

//default fallback route, no auth required
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/user", (req, res) => {
  res.send(req.user.dataValues.username + " You're home!");
});

//Auth protected account route
router.get("/account", checkAuthentication, (req, res) => {
  res.send("This will soon be an account page");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/create" }),
  (req, res) => {
    console.log("POST ROUTE YO");
    console.log(req.user);
    res.redirect(307, "/user");
  }
);

router.get('/account/alldecks', (req, res) => {
  //update to req.user.dataValues
  const {username} = req.body;
  
  // this is going to return an array
  s3Method.listDecks(username, (data) => {
    if (data.error) {
      console.log(data.error);
      res.send(`We apologize. ${data.error}. Please try again later.`);
    } else {
      console.log(data);
      res.send(`Here's your list of decks as an array: ${data}`);
    }
  })
  
})

//Re-add checkAuthentication after testing
router.get("/account/collection", (req, res) => {
  const { username } = req.user.dataValues;

  s3Method.getCollection(username, (data) => {
    console.log(data);

    res.send(`This is your collection: ${JSON.stringify(data)}`);
  });
});

//Re-add checkAuthentication after testing
router.get("/account/:deckname", (req, res) => {
  
  //Change to req.user.dataValues
  const {username} = req.body
  const deckName = req.params.deckname;
  
  s3Method.getDeck(username, deckName, (data) => {
    if (data.error) {
      console.log(data.error);
      res.send(`We apologize. ${data.error}. Please try again later.`);
    } else {
      console.log(data);
      res.send(`Here's your deck! Name: ${deckName} Mainboard: ${data.main} Sideboard: ${data.sideboard}`);
    }
  })
});

//make authed

router.post("/api/createcollection", (req, res) => {
  const { collection } = req.body;
  //Change to req.user.dataValues for production
  const { username } = req.body;

  s3Method.createCollection(username, collection, (succes) => {
    if (succes) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

//make authed

router.post('/api/createdeck', (req, res) => {
  const {deckName, deckList} = req.body

  //Change to req.user.dataValues for production
  const {username} = req.body;
  
  s3Method.createDeck(username, deckName, deckList, (succes) => {
    if (succes) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });

})

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Home.");
});

module.exports = router;
