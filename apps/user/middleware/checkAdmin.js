const users = require('../data/user');

function checkAdmin(req, res, next) {
  const adminName = req.body.adminName;

  if (!adminName) {
    return res.status(400).json({ message: 'User name is required' });
  }

  const isAdmin = users.find(u => u.name === adminName);

  if (isAdmin && isAdmin.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
}

module.exports = checkAdmin;