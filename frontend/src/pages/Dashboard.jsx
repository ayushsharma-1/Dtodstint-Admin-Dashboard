import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors,HandMetal } from "lucide-react";
import { DashboardCard } from '../components/DashboardCard';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import BookingsTable from '../components/BookingsTable';
import ServicesManagement from '../components/ServicesManagement';
import axios from 'axios';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    servicesOffered: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const uri = import.meta.env.VITE_API_BASE_URL; // Replace with your API base URL
        const response = await axios.get(`${uri}/api/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const metrics = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: Calendar,
    },
    {
      title: "Pending Bookings",
      value: dashboardData.pendingBookings,
      icon: Clock,
    },
    {
      title: "Total Services",
      value: dashboardData.servicesOffered,
      icon: Scissors,
    },
  ];

  const bookings = [
    {
      service: "Hair Cut",
      customer: "John Doe",
      date: "2024-02-20",
      time: "10:00 AM",
      status: "Pending",
      icon: Scissors
    },
    {
      service: "Massage",
      customer: "Jane Smith",
      date: "2024-02-20",
      time: "2:30 PM",
      status: "Accepted",
      icon: HandMetal
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main 
        className={`
          flex-1 transition-all duration-300 ease-in-out
          lg:ml-64
          relative
          w-full
        `}
      >
        <div className="space-y-4 sm:space-y-6">
          <Header toggleSidebar={() => setSidebarOpen(true)} />

          {/* Dashboard Section */}
          <section 
            id="dashboard" 
            className="scroll-mt-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
              {metrics.map((metric, index) => (
                <DashboardCard key={index} {...metric} />
              ))}
            </div>
          </section>

          {/* Bookings Section */}
          <section 
            id="bookings" 
            className="bg-white rounded-lg shadow-sm scroll-mt-16"
          >
            <BookingsTable bookings={bookings} />
          </section>

          {/* Services Section */}
          <section 
            id="services" 
            className="bg-white rounded-lg shadow-sm scroll-mt-16"
          >
            <ServicesManagement />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
