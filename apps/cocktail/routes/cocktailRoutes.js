const express = require('express');
const router = express.Router();
const controller = require('../controllers/cocktailController');

router.get('/', controller.showRandomCocktail);

module.exports = router;