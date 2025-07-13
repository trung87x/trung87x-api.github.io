const express = require('express');
const router = express.Router();

const jokeRoutes = require('./routes/jokeRoutes');
router.use('/jokes', jokeRoutes);

module.exports = router;