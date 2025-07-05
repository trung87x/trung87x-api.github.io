const express = require('express');
const app = express();

// Mảng người dùng mẫu với các thuộc tính id, name, email và role
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
];


app.use(express.static('public'));

// Middleware để ghi log thông tin yêu cầu
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();  // Tiếp tục xử lý yêu cầu 
});

// Middleware để phân tích dữ liệu JSON trong thân yêu cầu
app.use(express.json());

// Middleware để kiểm tra quyền truy cập của người dùng
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

// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Cấu hình thư mục views để chứa các file EJS
app.set('views', './views');

app.get('/', (req, res) => {
  // res.send('Backend is working!');

  // Dữ liệu truyền cho view EJS (có thể thay đổi theo nhu cầu)
  const user = { name: 'John Doe', age: 30 };

  // Render trang home.ejs với dữ liệu truyền vào
  res.render('index', { user: user });

});

app.get('/about', (req, res) => {
  // Render trang about.ejs với dữ liệu truyền vào 
  res.render('about', { title: 'About Page', description: 'This is the about page.' });
});

app.get('/contact', (req, res) => {
  // Render trang contact.ejs với dữ liệu truyền vào
  res.render('contact', { title: 'Contact Page', email: 'admin@gmail.com' });
});

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

// Middleware để xử lý lỗi
// Xử lý lỗi và trả về mã lỗi 500 nếu có lỗi xảy ra
app.use((err, req, res, next) => {
  console.error(err.stack);  // Ghi log lỗi ra console  
  res.status(err.status || 500).json({ message: err.message }); 
});

app.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});