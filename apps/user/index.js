const express = require('express');
const router = express.Router();

const userApiRoutes = require('./routes/userApiRoutes');

router.use('/api/users', userApiRoutes); // => /user/api/users

module.exports = router;