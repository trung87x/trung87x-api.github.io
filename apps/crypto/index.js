const express = require('express');
const router = express.Router();

const cryptoRoutes = require('./routes/cryptoRoutes');
router.use('/crypto', cryptoRoutes);

module.exports = router;