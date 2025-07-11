// Đăng ký (/api/auth/register)

// Lấy API Key

// Xác thực (token)

// Các thao tác CRUD với secrets


const express = require('express');
const router = express.Router();

// Controllers
const secretsRoutes = require('./routes/secretApiRoutes');
router.use('/api/secret', secretsRoutes);

// Middlewares
const secrets = require('./data/secrets');
const users = require('./data/users');
const seedData = require('./data/seed'); // Nạp dữ liệu mẫu
seedData(); 
setInterval(() => {
  secrets.length = 0;
  users.length = 0;

  seedData(); // Nạp lại dữ liệu mẫu

  console.log('[Reset] All secrets and users have been cleared.');
}, 1000 * 60 * 100); // 100 phút

module.exports = router;