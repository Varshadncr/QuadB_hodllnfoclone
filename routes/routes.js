const express = require('express');
const router = express.Router();

// Controller to handle the home page
const { home_page } = require('../controllers/mainController');

// Route for home page
router.get('/', home_page);

module.exports = router;
