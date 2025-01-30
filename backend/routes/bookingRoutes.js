const express = require('express');
const { 
    acceptBooking,
    rejectBooking,
    createBooking,
    getAllBookings
    } = require('../controllers/bookingController');
const router = express.Router();

// POST route to create a booking
router.post('/', createBooking);

// PUT route to accept a booking
router.put('/:id/accept', acceptBooking);

// PUT route to reject a booking
router.put('/:id/reject', rejectBooking);

// GET Route to fetch all bookings
router.get('/', getAllBookings);

module.exports = router;
