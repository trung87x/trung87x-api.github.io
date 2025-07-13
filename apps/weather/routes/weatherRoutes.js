const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.showForm);
router.post('/check', weatherController.checkWeather);

module.exports = router;