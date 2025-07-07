const express = require('express');
const router = express.Router();

const blogRoutes = require('./routes/blogRoutes');

router.use('/blogs', blogRoutes); // => /blog/blogs

module.exports = router;