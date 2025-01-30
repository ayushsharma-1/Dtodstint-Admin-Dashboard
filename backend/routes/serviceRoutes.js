const express = require('express');
const { addService, deleteService, getAllServices } = require('../controllers/serviceController');
const router = express.Router();

// POST route to add a new service
router.post('/', addService);
router.delete('/:name', deleteService);
router.get('/',getAllServices);

module.exports = router;
