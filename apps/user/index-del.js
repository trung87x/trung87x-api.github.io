let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
];

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

app.get('/api/users', (req, res) => {
  res.json(users);  // Trả về danh sách người dùng dưới dạng JSON
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// API để thêm người dùng mới, chỉ cho phép người dùng có quyền admin
app.post('/api/users', checkAdmin, (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);  // Trả về người dùng mới với mã trạng thái 201 (Created)
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  let user = users.find(u => u.id === userId);

  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);  // Trả về người dùng đã cập nhật
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    users.splice(index, 1);  // Xóa người dùng khỏi mảng
    res.status(204).end();  // Trả về mã trạng thái 204 (No Content) khi xóa thành công
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});