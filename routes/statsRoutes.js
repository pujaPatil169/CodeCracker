const express = require('express');
const { getPlatformStats } = require('../controllers/statsController');

const router = express.Router();

// Platform statistics routes
router.get('/stats/:platform', (req, res, next) => {
  console.log('Received request for platform:', req.params.platform);
  next();
}, getPlatformStats);

module.exports = router;
