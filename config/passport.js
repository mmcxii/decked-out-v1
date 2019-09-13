const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = function(passport) {

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
              bcrypt.compare(password, user.password, (err, match) => {
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


}