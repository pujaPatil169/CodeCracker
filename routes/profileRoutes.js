const express = require('express');
const { getUserProfile } = require('../controllers/profileController');

const router = express.Router();

// Profile routes
router.get('/profile', getUserProfile);

module.exports = router;
