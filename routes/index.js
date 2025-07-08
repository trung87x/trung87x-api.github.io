const express = require('express');
const router = express.Router();

const pageRoutes = require('./pageRoutes');     // Trang chính
const blogApp = require('../apps/blog/index');        // App blog
const userApp = require('../apps/user/index');        // App user

router.use('/', pageRoutes);     // → '/', '/about', '/contact'
router.use('/', blogApp);    // → '/blog', '/blog/new', ...
router.use('/', userApp);    // → '/user', '/user/edit', ...

module.exports = router;
