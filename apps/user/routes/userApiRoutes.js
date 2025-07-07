const express = require('express');
const router = express.Router();
const userController = require('../controllers/userApiController');
const checkAdmin = require('../middleware/checkAdmin');

// Danh sách người dùng
router.get('/', userController.getAllUsers);

// Lấy 1 người dùng theo ID
router.get('/:id', userController.getUserById);

// Thêm người dùng mới (có kiểm tra admin)
router.post('/', checkAdmin, userController.createUser);

// Cập nhật thông tin người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

module.exports = router;