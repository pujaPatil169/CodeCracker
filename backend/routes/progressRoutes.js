const express = require('express');
const { getProgressData } = require('../controllers/progressController');

const router = express.Router();

// Get user progress data
router.get('/progress', getProgressData);

module.exports = router;
