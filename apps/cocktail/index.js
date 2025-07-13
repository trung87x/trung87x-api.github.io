const express = require('express');
const router = express.Router();

const cocktailRoutes = require('./routes/cocktailRoutes');
router.use('/cocktail', cocktailRoutes);

module.exports = router;