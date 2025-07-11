const users = require('../data/users');
const secrets = require('../data/secrets');
const { generateApiKey, generateToken, generateId } = require('../utils/generate');

console.log('[DEBUG] secrets =', JSON.stringify(secrets, null, 2));

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  users.push({ username, password });
  res.json({ success: 'Successfully registered.' });
};

exports.generateApiKey = (req, res) => {
  const apiKey = generateApiKey();
  res.json({ apiKey });
};

exports.getAuthToken = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken();
  user.token = token;
  res.json({ token });
};

exports.getRandomSecret = (req, res) => {
  if (secrets.length === 0) return res.json({ secret: 'No secrets yet' });
  const random = secrets[Math.floor(Math.random() * secrets.length)];
  res.json(random);
};

exports.getAllSecrets = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const result = secrets.slice(start, start + pageSize);
  res.json(result);
};

exports.filterSecrets = (req, res) => {
  console.log('[DEBUG] Filter query:', req.query);
  const score = parseInt(req.query.score) || 0;
  const filtered = secrets.filter(s => s.emScore >= score);
  res.json(filtered);
};

exports.getUserSecrets = (req, res) => {
  const username = req.user.username;
  const result = secrets.filter(s => s.username === username);
  res.json(result);
};

exports.getSecretById = (req, res) => {
  const secret = secrets.find(s => s.id === req.params.id);
  if (!secret) return res.status(404).json({ error: 'Not found' });
  res.json(secret);
};

exports.createSecret = (req, res) => {
  const { secret, score } = req.body;
  const newSecret = {
    id: generateId(),
    secret,
    emScore: parseInt(score),
    username: req.user.username,
    timestamp: new Date().toISOString()
  };
  secrets.push(newSecret);
  res.status(201).json(newSecret);
};

exports.updateSecret = (req, res) => {
  const s = secrets.find(s => s.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  s.secret = req.body.secret;
  s.emScore = parseInt(req.body.score);
  res.json(s);
};

exports.partialUpdateSecret = (req, res) => {
  const s = secrets.find(s => s.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  if (req.body.secret) s.secret = req.body.secret;
  if (req.body.score) s.emScore = parseInt(req.body.score);
  res.json(s);
};

exports.deleteSecret = (req, res) => {
  const index = secrets.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  secrets.splice(index, 1);
  res.json({ message: `Secret with ID ${req.params.id} has been deleted successfully.` });
};

