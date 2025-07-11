const users = require('../data/users');

exports.basic = (req, res, next) => {
  const b64auth = req.headers.authorization?.split(' ')[1];
  if (!b64auth) return res.status(401).json({ error: 'Missing Basic Auth' });
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(403).json({ error: 'Invalid credentials' });
  req.user = user;
  next();
};

exports.apiKey = (req, res, next) => {
  const key = req.query.apiKey;
  if (!key) return res.status(401).json({ error: 'Missing API Key' });
  // For demo, accept any key format
  if (!key.match(/^[a-z0-9\-]{10,}$/i)) return res.status(403).json({ error: 'Invalid API Key' });
  next();
};

exports.bearer = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing Bearer Token' });
  const user = users.find(u => u.token === token);
  if (!user) return res.status(403).json({ error: 'Invalid Token' });
  req.user = user;
  console.log(`[Auth] User ${user.username} authenticated with token ${token}`);
  next();
};