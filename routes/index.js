const express = require('express');
const router = express.Router();

const pageRoutes = require('./pageRoutes');     // Trang chính
const blogApp = require('../apps/blog/index');        // App blog
const userApp = require('../apps/user/index');        // App user
const secretApp = require('../apps/secret/index');    // App secret
const jokeApp = require('../apps/joke/index');
const weatherApp = require('../apps/weather/index');
const cryptoApp = require('../apps/crypto/index');
const cocktailApp = require('../apps/cocktail/index'); // App cocktail
const uvApp = require('../apps/uv/index');



router.use('/', pageRoutes);     // → '/', '/about', '/contact'
router.use('/', blogApp);    // → '/blog', '/blog/new', ...
router.use('/', userApp);    // → '/user', '/user/edit', ...
router.use('/', secretApp);  // → '/secret', '/secret/random, ...
router.use('/', jokeApp);
router.use('/', weatherApp );
router.use('/', cryptoApp );
router.use('/', cocktailApp); // → '/cocktail', '/cocktail/random', ...
router.use('/', uvApp);

module.exports = router;
