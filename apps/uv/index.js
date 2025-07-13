const express = require('express');
const router = express.Router();

const uvRoutes = require('./routes/uvRoutes');
router.use('/uv', uvRoutes);

module.exports = router;