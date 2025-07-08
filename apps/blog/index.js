const express = require('express');
const router = express.Router();

const blogRoutes = require('./routes/blogRoutes');

router.use('/blog', blogRoutes); // => /blog

module.exports = router;