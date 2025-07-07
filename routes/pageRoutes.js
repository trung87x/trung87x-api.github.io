const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.showHome);
router.get('/about', pageController.showAbout);
router.get('/contact', pageController.showContact);

module.exports = router;
