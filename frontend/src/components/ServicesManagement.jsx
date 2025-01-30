import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

const ServicesManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const uri = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${uri}/api/services`);
        if (response.data && Array.isArray(response.data.services)) {
          setServices(response.data.services);
        } else {
          console.error('Expected an array of services, but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Handle adding a new service
  const handleAddService = async (newServiceData) => {
    try {
      const uri = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${uri}/api/services`, newServiceData);
      setServices([...services, response.data]);
      setIsOpen(false); // Close the modal after adding
      setNewService({
        name: '',
        description: '',
        duration: '',
        price: '',
      }); // Reset the form
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Handle deleting a service using the name
  const handleDeleteService = async (name) => {
    try {
      const uri = import.meta.env.VITE_API_BASE_URL;
      await axios.delete(`${uri}/api/services/${name}`);
      setServices(services.filter(service => service.name !== name));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const ServiceForm = ({ handleAddService }) => {
    // Refs for form fields
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const durationRef = useRef(null);
    const priceRef = useRef(null);

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedService = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        duration: durationRef.current.value,
        price: priceRef.current.value,
      };
      handleAddService(updatedService);
    };
    // Validate input fields to only allow positive values
    const handleDurationChange = (e) => {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    };

    const handlePriceChange = (e) => {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm">Service Name</Label>
            <Input
              ref={nameRef}
              id="name"
              defaultValue={newService.name}
              placeholder="Enter service name"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm">Description</Label>
            <Textarea
              ref={descriptionRef}
              id="description"
              defaultValue={newService.description}
              placeholder="Enter service description"
              className="mt-1.5 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration" className="text-sm">Duration (minutes)</Label>
              <Input
                ref={durationRef}
                id="duration"
                type="number"
                defaultValue={newService.duration}
                placeholder="Enter duration"
                className="mt-1.5"
                onChange={handleDurationChange}
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-sm">Price (₹)</Label>
              <Input
                ref={priceRef}
                id="price"
                type="number"
                step=".1"
                defaultValue={newService.price}
                placeholder="Enter price"
                className="mt-1.5"
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 sm:flex-none">Add Service</Button>
        </div>
      </form>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Services Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full sm:w-auto">Add New Service</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm handleAddService={handleAddService} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop table view */}
      <div className="hidden sm:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length > 0 ? services.map((service) => (
              <TableRow key={service._id}>
                <TableCell>{service.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">{service.description}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteService(service.name)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">No services available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card view */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {services.length > 0 ? services.map((service) => (
          <Card key={service._id} className="border p-4">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Duration:</strong> {service.duration} mins</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <Button variant="outline" onClick={() => handleDeleteService(service.name)} className="mt-2">
              Delete
            </Button>
          </Card>
        )) : (
          <div>No services available</div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;
