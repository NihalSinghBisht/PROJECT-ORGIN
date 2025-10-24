const bcrypt = require('bcryptjs');

const users = [
  // Demo user (username: 'test', password: 'password')
  { id: '1', username: 'test', password: bcrypt.hashSync('password', 10), displayName: 'Test User' }
];

module.exports = {
  findById(id) {
    return users.find(user => user.id === id);
  },
  findByUsername(username) {
    return users.find(user => user.username === username);
  },
  findByGoogleId(googleId) {
    return users.find(user => user.googleId === googleId);
  },
  createGoogleUser(profile) {
    const user = {
      id: (users.length + 1).toString(),
      googleId: profile.id,
      username: profile.emails[0].value,
      displayName: profile.displayName
    };
    users.push(user);
    return user;
  }
};
