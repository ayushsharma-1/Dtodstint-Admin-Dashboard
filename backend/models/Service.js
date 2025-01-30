const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Ensures each service ID is unique
    },
    name: {
        type: String,
        required: true, // Name of the service
    },
    description: {
        type: String,
        required: true, // Description of the service
    },
    duration: {
        type: String, // Duration as a formatted string (e.g., "60 minutes")
        required: true,
    },
    price: {
        type: String, // Price as a formatted string (e.g., "$75.00")
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], // Restricts status to "Active" or "Inactive"
        default: 'Active',
    },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
