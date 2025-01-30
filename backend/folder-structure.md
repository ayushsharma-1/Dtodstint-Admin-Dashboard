admin-panel-api/
├── config/
│   ├── db.js             # MongoDB connection setup
├── controllers/
│   ├── dashboardController.js # Business logic for dashboard
│   ├── bookingController.js   # Business logic for bookings
│   ├── serviceController.js   # Business logic for services
├── models/
│   ├── Dashboard.js      # Dashboard schema
│   ├── Booking.js        # Booking schema
│   ├── Service.js        # Service schema
├── routes/
│   ├── dashboardRoutes.js # API routes for dashboard
│   ├── bookingRoutes.js   # API routes for bookings
│   ├── serviceRoutes.js   # API routes for services
├── middlewares/
│   ├── authMiddleware.js # Authentication and authorization logic
│   ├── errorHandler.js   # Centralized error handling
├── utils/
│   ├── logger.js         # Logger utility
│   ├── helpers.js        # Helper functions
├── tests/
│   ├── dashboard.test.js # Tests for dashboard APIs
│   ├── booking.test.js   # Tests for booking APIs
│   ├── service.test.js   # Tests for service APIs
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
├── server.js             # Entry point for the application
