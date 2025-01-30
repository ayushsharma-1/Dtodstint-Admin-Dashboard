const express = require('express');
const { getDashBoardData} = require('../controllers/dashboardController.js');
const router = express.Router();

// GET route to get Dashboard data
router.get('/dashboard',getDashBoardData);

module.exports = router;


