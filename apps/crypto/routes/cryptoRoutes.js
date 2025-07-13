const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/', cryptoController.showForm);
router.post('/check', cryptoController.checkPrice);

module.exports = router;