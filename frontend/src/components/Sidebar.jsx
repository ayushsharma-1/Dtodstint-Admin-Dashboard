import React from 'react';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Settings,
  X
} from "lucide-react";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#dashboard' },
    { icon: CalendarDays, label: 'Bookings', href: '#bookings' },
    { icon: Scissors, label: 'Services', href: '#services' }
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-20 transition-opacity duration-200"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white z-30 
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-[280px] sm:w-64 border-r border-gray-200
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-bold text-indigo-600 truncate mr-2">
              AdminPanel
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  if (toggleSidebar && window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }
              }}
              className={`
                flex items-center w-full gap-3 mb-1 sm:mb-2 px-3 py-2.5 sm:py-2 rounded-lg
                text-gray-600 hover:bg-gray-50 transition-colors
                text-sm sm:text-base
                active:bg-gray-100
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              `}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Optional: Footer area */}
        {/* <div className="p-4 border-t border-gray-200 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sm sm:text-base"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            Settings
          </Button>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;