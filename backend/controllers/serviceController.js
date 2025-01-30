const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique ids
const Service = require('../models/Service');
const Dashboard = require('../models/Dashboard'); // Import the Dashboard model

const getAllServices = async (req, res) => {
    try {
        // Retrieve all services from the database
        const services = await Service.find();

        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }

        res.status(200).json({
            message: 'Services retrieved successfully',
            services,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Add a new service
const addService = async (req, res) => {
    try {
        const { name, description, duration, price, status } = req.body;

        // Check if the service with the same name already exists
        const existingService = await Service.findOne({ name });

        if (existingService) {
            return res.status(400).json({ message: 'Service with this name already exists' });
        }

        // Generate a unique ID for the service
        const serviceId = uuidv4(); // Generate a unique ID

        // Create a new service instance
        const newService = new Service({
            id: serviceId, // Assign the generated ID
            name,
            description,
            duration,
            price,
            status,
        });

        // Save the new service to the database
        await newService.save();

        // Check if the Dashboard exists, if not, create a new one
        let dashboard = await Dashboard.findOne();
        if (!dashboard) {
            dashboard = new Dashboard(); // Create a new dashboard document
            await dashboard.save();
        }

        // Increment the servicesOffered count in the Dashboard only after the service is successfully added
        await Dashboard.updateOne({}, { $inc: { servicesOffered: 1 } });

        res.status(201).json({
            message: 'Service added successfully',
            service: newService,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a service by its name
const deleteService = async (req, res) => {
    try {
        const { name } = req.params; // Get the service name from the URL parameters

        // Find and delete the service by its name
        const deletedService = await Service.findOneAndDelete({ name });

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if the Dashboard exists, if not, create a new one
        let dashboard = await Dashboard.findOne();
        if (!dashboard) {
            dashboard = new Dashboard(); // Create a new dashboard document
            await dashboard.save();
        }

        // Decrement the servicesOffered count in the Dashboard only after the service is successfully deleted
        await Dashboard.updateOne({}, { $inc: { servicesOffered: -1 } });

        res.status(200).json({
            message: 'Service deleted successfully',
            service: deletedService,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addService,
    deleteService,
    getAllServices,
};
