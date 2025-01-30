const Booking = require('../models/Booking'); // Assuming the Booking model is correctly set up
const crypto = require('crypto'); // Import crypto module
const Dashboard = require('../models/Dashboard');

// Function to generate a 6-character alphanumeric ID
const generateBookingId = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-character hex string
};
// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { service, customer, date, time } = req.body;

        const id = generateBookingId(); // Generate ID once

        const newBooking = new Booking({
            id, // Assign the generated ID
            service,
            customer,
            date,
            time,
        });

        await newBooking.save();
         // Update Dashboard: Increment totalBookings and pendingBookings
         await Dashboard.findOneAndUpdate(
            {},
            { $inc: { totalBookings: 1, pendingBookings: 1 } },
            { upsert: true, new: true } // Creates a document if it doesn't exist
        );

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking,
        });
    } catch (error) {
        if (error.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: 'Duplicate Booking ID, please try again.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// fetch all Bookings 
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Accept a booking
const acceptBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ id });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status !== 'Pending') {
            return res.status(400).json({ message: 'Booking status cannot be changed once updated' });
        }

        booking.status = 'Accepted';
        await booking.save();

        // Update Dashboard: Decrease pendingBookings
        await Dashboard.findOneAndUpdate(
            { pendingBookings: { $gt: 0 } }, // Ensure pendingBookings is not negative
            { $inc: { pendingBookings: -1 } },
            { new: true }
        );
        res.status(200).json({
            message: 'Booking accepted successfully',
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject a booking
const rejectBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ id });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status !== 'Pending') {
            return res.status(400).json({ message: 'Booking status cannot be changed once updated' });
        }

        booking.status = 'Rejected';
        await booking.save();

         // Update Dashboard: Decrease pendingBookings
         await Dashboard.findOneAndUpdate(
            { pendingBookings: { $gt: 0 } }, // Ensure pendingBookings is not negative
            { $inc: { pendingBookings: -1 } },
            { new: true }
        );

        res.status(200).json({
            message: 'Booking rejected successfully',
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBooking,
    acceptBooking,
    rejectBooking,
    getAllBookings,
};
