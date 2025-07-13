const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get('/', jokeController.showForm);
router.post('/show', jokeController.showJoke);

module.exports = router;