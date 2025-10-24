require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth'); // Passport strategies
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '/')));

// Auth routes
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard.html',
  failureRedirect: '/index.html?error=true'
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/index.html?error=google'
  }),
  (req, res) => {
    res.redirect('/dashboard.html');
  }
);

// Simple middleware to protect dashboard
app.get('/dashboard.html', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  } else {
    res.redirect('/index.html?error=unauth');
  }
});

// Logout
app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/index.html');
  });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Auth server running on http://localhost:3000'));
