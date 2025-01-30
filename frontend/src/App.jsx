import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from "@/components/ui/toaster";

// Layout component to wrap all admin pages
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="mx-auto max-w-[1920px] p-2 sm:p-4 lg:p-6">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

// Main App component - Simplified routing
const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          {/* Single dashboard route with section navigation */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Redirects */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;
