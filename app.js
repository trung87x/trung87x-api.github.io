const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// EJS & Middleware
app.set('view engine', 'ejs'); // Cấu hình EJS làm view engine
app.set('views', [
  'views', // mặc định
  'apps/blog/views', // thêm blog
  'apps/secret/views' // thêm secret
]);

app.use(express.urlencoded({ extended: true }));  // Middleware để phân tích dữ liệu từ form
app.use(express.static('public')); // Middleware để phục vụ các file tĩnh từ thư mục public
app.use(express.json()); // Middleware để phân tích dữ liệu JSON từ yêu cầu
app.use(expressLayouts); // Sử dụng express-ejs-layouts để hỗ trợ layout cho EJS
// Cấu hình layout cho EJS
app.set('layout', 'layouts/layout'); // Cấu hình layout mặc định

// Middleware để ghi log thông tin yêu cầu
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();  // Tiếp tục xử lý yêu cầu 
});

// Cấu hình các route
const router = require('./routes');
app.use('/', router);

// Middleware để xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);  // Ghi log lỗi ra console  
  res.status(err.status || 500).json({ message: err.message }); 
});

app.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});



