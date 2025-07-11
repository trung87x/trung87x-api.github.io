const express = require('express');
const router = express.Router();

const pageRoutes = require('./pageRoutes');     // Trang chính
const blogApp = require('../apps/blog/index');        // App blog
const userApp = require('../apps/user/index');        // App user
const secretApp = require('../apps/secret/index');    // App secret

router.use('/', pageRoutes);     // → '/', '/about', '/contact'
router.use('/', blogApp);    // → '/blog', '/blog/new', ...
router.use('/', userApp);    // → '/user', '/user/edit', ...
router.use('/', secretApp);  // → '/secret', '/secret/random, ...

module.exports = router;
