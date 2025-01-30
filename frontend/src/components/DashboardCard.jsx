import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const DashboardCard = ({ title, value, icon: Icon }) => (
  <Card className="bg-white">
    <CardContent className="p-4 sm:p-6">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-500 truncate">{title}</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 truncate">{value}</h3>
        </div>
        <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DashboardCard;
