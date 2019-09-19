require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const secret = process.env.SECRET;
const path = require('path');

const db = require('./models');

// Serve static files from react app
app.use(express.static(path.join(__dirname, 'client/build')));
// const flash = require('connect-flash');

// Passport Config
const passport = require('passport');
require('./config/passport')(passport);

// Routers
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

//Authentication Middleware
app.use(require('express-session')({ secret: secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

//Flash messages
// app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('success_msg');
//     next();
// })

// Routes



app.use('/', authRoutes);
app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
    });
});

module.exports = app;
