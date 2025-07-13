const express = require('express');
const router = express.Router();

const weatherRoutes = require('./routes/weatherRoutes');
router.use('/weather', weatherRoutes);

module.exports = router;