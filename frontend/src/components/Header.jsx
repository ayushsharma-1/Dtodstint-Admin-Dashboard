import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Menu } from "lucide-react";

export const Header = ({ toggleSidebar }) => (
  <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
    <div className="flex items-center gap-2 sm:gap-4">
      <Button 
        variant="ghost" 
        size="icon"
        className="lg:hidden -ml-2"
        onClick={toggleSidebar}
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <h1 className="text-xl sm:text-2xl font-bold truncate">Dashboard</h1>
    </div>
    {/* <div className="flex items-center gap-2 sm:gap-4">
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 sm:h-10 sm:w-10"
      >
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-200" />
    </div> */}
  </div>
);

export default Header;