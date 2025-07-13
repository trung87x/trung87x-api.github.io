const express = require('express');
const router = express.Router();
const controller = require('../controllers/uvController');

router.get('/', controller.showForm);
router.post('/check', controller.checkUv);

module.exports = router;