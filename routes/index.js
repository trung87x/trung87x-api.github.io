const express = require('express');
const router = express.Router();

const pageRoutes = require('./pageRoutes');     // Trang chính
const blogApp = require('../apps/blog');        // App blog
const userApp = require('../apps/user');        // App user

router.use('/', pageRoutes);     // → '/', '/about', '/contact'
router.use('/blog', blogApp);    // → '/blog', '/blog/new', ...
router.use('/user', userApp);    // → '/user', '/user/edit', ...

module.exports = router;
