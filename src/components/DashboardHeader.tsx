import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Download, Menu } from 'lucide-react';
import { toast } from 'sonner';
import NotificationsPopover from './NotificationsPopover';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from './ui/sidebar';
import { UserButton } from "@clerk/clerk-react";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const generateReport = () => {
    toast.loading('Generating comprehensive report...');
    
    // Simulate report generation delay
    setTimeout(() => {
      toast.dismiss();
      toast.success('Report generated successfully');
      
      // Create a fake CSV data
      const csvData = `Date,Energy Production (kWh),Energy Consumption (kWh),Efficiency (%),CO2 Saved (kg)
2025-03-01,156.2,132.5,85.2,78.5
2025-03-02,142.8,128.7,82.3,71.4
2025-03-03,168.5,135.2,87.6,84.3
2025-03-04,175.3,140.1,88.5,87.7
2025-03-05,132.1,125.8,79.8,66.1
2025-03-06,158.7,133.2,84.3,79.4
2025-03-07,163.9,136.7,86.2,82.0
2025-03-08,149.5,130.4,83.1,74.8
2025-03-09,170.2,138.9,87.9,85.1
2025-03-10,166.8,137.5,86.5,83.4`;
      
      // Create a Blob from the CSV string
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'solarwave_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center">
          {isMobile && (
            <div className="mr-2">
              <SidebarTrigger />
            </div>
          )}
          <Button 
            variant="ghost" 
            className="font-bold text-lg"
            onClick={() => navigate('/')}
          >
            आदित्य

          </Button>
        </div>
        
        <div className="flex items-center gap-1 md:gap-4">
          <Button 
            variant="outline" 
            size={isMobile ? "icon" : "sm"} 
            className={isMobile ? "rounded-full w-8 h-8 p-0" : "hidden md:flex gap-2"}
            onClick={generateReport}
          >
            <Download className="h-4 w-4" />
            {!isMobile && "Generate Report"}
          </Button>
          
          <div className="flex items-center space-x-2">
            <NotificationsPopover />
            <div className="ml-2">
              <UserButton 
                afterSignOutUrl="/sign-in"
                showName={false}
                appearance={{
                  baseTheme: undefined,
                  elements: {
                    rootBox: "!bg-transparent !min-h-0",
                    userButtonBox: "hover:bg-gray-100 rounded-full",
                    userButtonTrigger: "rounded-full",
                    userButtonAvatarBox: "rounded-full",
                    card: "!bg-background",
                    profileSection: "hidden",
                    profileSectionTriggerIcon: "hidden"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
