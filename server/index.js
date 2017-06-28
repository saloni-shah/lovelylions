var express = require('express');

var path = require('path'); 
var favicon = require('serve-favicon');  
var logger = require('morgan');   
var cookieParser = require('cookie-parser');  
var bodyParser = require('body-parser');
var passport = require('passport');  
//var LocalStrategy = require('passport-local').Strategy;  
var session = require('express-session');
require('../config/passport.js')(passport);


var app = express();
app.use(logger('dev'));  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(cookieParser());  


app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/testing', (req, res) => {
  // var str = 'select _path from torso where id = 2';
  // db.query(str, (data) => {
  //   res.send(data);
  // });
  // db.getRandomImage('head');
  // console.log(db.getTwoImages('head'));
  // console.log(db.getImage(1,'head'));
  db.getRandomImage('head', (data) => {
    res.send(data);
  });
});

// app.get('/getTwoImages', (req, res) => {
//   console.log(req.url.split('=')[1] === 'head');

// });


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {  
  successRedirect: '/profile',
  failureRedirect: '/',
}));

app.get('/profile', isLoggedIn, function(req, res) {  
  //res.render('profile.ejs', { user: req.user });
  console.log(req.user);
  //res.send(req.user);
  res.redirect('/?username=' + req.user['facebook']['name']);
});

app.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
