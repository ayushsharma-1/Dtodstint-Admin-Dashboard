const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: { // Correct field name
        type: String,
        required: [true, "Booking ID is required"],
        unique: true,
    },
    service: {
        type: String,
        required: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
