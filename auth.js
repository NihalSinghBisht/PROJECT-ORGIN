const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const userStore = require('./userStore');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = userStore.findById(id);
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = userStore.findByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, function(accessToken, refreshToken, profile, done) {
  let user = userStore.findByGoogleId(profile.id);
  if (!user) {
    // Create user if doesn't exist
    user = userStore.createGoogleUser(profile);
  }
  return done(null, user);
}));
