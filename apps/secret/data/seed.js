const users = require('./users');
const secrets = require('./secrets');
const { generateId } = require('../utils/generate');

function seedData() {
  users.push({ username: 'demo', password: 'demo', token: 'demo-token' });

  secrets.push({
    id: generateId(),
    secret: 'This is a seeded secret.',
    emScore: 3,
    username: 'demo',
    timestamp: new Date().toISOString()
  });
}

module.exports = seedData;