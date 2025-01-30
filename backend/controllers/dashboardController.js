const Dashboard = require('../models/Dashboard'); // Import the Dashboard model

// Controller to get Dashboard data
const getDashBoardData = async (req, res) => {
  try {
    // Fetch the dashboard data from the database
    let dashboard = await Dashboard.findOne();

    // If no dashboard data exists, create a new one with default values
    if (!dashboard) {
      dashboard = new Dashboard({
        totalBookings: 0,
        pendingBookings: 0,
        servicesOffered: 0,
      });
      await dashboard.save();
    }

    // Send the dashboard data as response
    res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashBoardData };