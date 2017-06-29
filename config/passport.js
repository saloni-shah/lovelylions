var LocalStrategy = require('passport-local').Strategy;  
var FacebookStrategy = require('passport-facebook').Strategy;  
var User = require('../database/index.js');  
var configAuth = require('./auth.js');



module.exports = function(passport) { 

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user[0].id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.db.any("SELECT * FROM artist " +
      "WHERE id = $1", [id])
    .then((user)=>{
      done(null, user);
    })
    .catch((err)=>{
      done(err,user);
    })
  });

  passport.use(new FacebookStrategy({  
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.db.any("SELECT id, username, email, facebookId, token, name FROM artist " +
        "WHERE facebookId = $1", [profile.id])
        .then((user)=>{
          if(user.length > 0) {
            return done(null, user);
          } else {
            var facebookId = profile.id;
            var token = profile.id;
            var name = profile.name.givenName + ' ' + profile.name.familyName;
            var email = (profile.emails[0].value || '').toLowerCase();
            //
            User.db.any('INSERT INTO artist(username, email, facebookId, token, name) VALUES($1, $2, $3, $4, $5) RETURNING id', [name, email, facebookId, token, name])
              .then(data => {
                return done(null, data); 
              })
              .catch(error => {
                return done(error);
                console.log('ERROR:', error); 
              });
          }
        })
        .catch((err)=>{
          return done(err);
        })
      });
    }
  ));
};
  