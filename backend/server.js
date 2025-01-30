require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from Vite frontend
app.use(express.json()); // Middleware to parse JSON requests

// Use Booking routes
app.use('/api/bookings', bookingRoutes);
// Use Service routes
app.use('/api/services', serviceRoutes);

// Use Dashboard route
app.use('/api', dashboardRoutes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
