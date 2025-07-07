let users = require('../data/user');

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: 'user', // mặc định role là user
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  let user = users.find(u => u.id === userId);

  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};