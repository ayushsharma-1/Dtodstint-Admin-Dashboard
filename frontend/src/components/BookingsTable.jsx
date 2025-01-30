import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loadingActions, setLoadingActions] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const uri=import.meta.env.VITE_API_BASE_URL
        const response = await axios.get(`${uri}/api/bookings`); // Adjust API endpoint as needed
        setBookings(response.data);
      } catch (error) {
        setError('Failed to load bookings');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = 
        statusFilter === 'All' || booking.status === statusFilter;
        
      return matchesSearch && matchesStatus;
    });
  }, [bookings,searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // To Accept or reject request
  const handleActionClick = async (bookingId, action) => {
    setLoadingActions(prev => ({ ...prev, [bookingId]: true }));
    try {
      const uri=import.meta.env.VITE_API_BASE_URL
      const endpoint = `${uri}/api/bookings/${bookingId}/${action}`;
      await axios.put(endpoint);

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: action === 'accept' ? 'Accepted' : 'Rejected' } : booking
        )
      );
      } catch (error) {
          console.error(`Failed to ${action} booking`, error);
      } finally {
          setLoadingActions(prev => ({ ...prev, [bookingId]: false }));
      }
  };
  return (
    <div className="p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">All Bookings</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-10 w-full sm:w-64" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select 
            className="h-10 border rounded-md px-4 py-2 bg-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 md:mx-0">
        <div className="min-w-[800px] px-2 md:px-0">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-4">Booking ID</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Customer Details</th>
                <th className="pb-4">Date & Time</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-gray-600">{booking.id}</td>
                  <td className="py-4">{booking.service}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 " />
                      <div className="min-w-0">
                        <div className="truncate">{booking.customer.name}</div>
                        <div className="text-sm text-gray-500 truncate">{booking.customer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="py-4">
                    <Badge
                      className={`
                        inline-flex items-center justify-center px-3 py-1 transition-colors
                        ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''}
                        ${booking.status === 'Accepted' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                        ${booking.status === 'Rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                      `}
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {booking.status === 'Pending' ? (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-500 text-white hover:bg-green-600 shadow-sm transition-colors"
                            onClick={() => handleActionClick(booking.id, 'accept')}
                            disabled={loadingActions[booking.id]}
                          >
                            {loadingActions[booking.id] ? 'Processing...' : 'Accept'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors border-red-200"
                            onClick={() => handleActionClick(booking.id, 'reject')}
                            disabled={loadingActions[booking.id]}
                          >
                            {loadingActions[booking.id] ? 'Processing...' : 'Reject'}
                          </Button>
                        </>
                      ) : (
                        <Badge 
                          className={`
                            inline-flex items-center justify-center px-3 py-1 transition-colors
                            ${booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
                            ${booking.status === 'Rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                          `}
                        >
                          {booking.status}
                        </Badge>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="text-sm text-gray-500 order-2 sm:order-1">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length} entries
        </div>
        <div className="flex gap-2 order-1 sm:order-2">
          <Button 
            variant="outline" 
            className="text-gray-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="hidden sm:flex gap-2">
            {pageNumbers.map((page) => (
              <Button 
                key={page}
                className={currentPage === page ? 
                  'bg-blue-600 text-white hover:bg-blue-700' : 
                  'text-gray-600'
                }
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <div className="sm:hidden">
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <Button 
            variant="outline" 
            className="text-gray-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;