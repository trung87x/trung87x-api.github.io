const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.get('/', controller.showAllPosts);
router.get('/new', controller.showNewForm);
router.post('/new', controller.createPost);
router.get('/edit/:id', controller.showEditForm);
router.post('/edit/:id', controller.updatePost);
router.post('/delete/:id', controller.deletePost);

module.exports = router;
