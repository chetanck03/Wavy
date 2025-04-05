
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Maintenance Alert',
      message: 'Panel Group A requires cleaning',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'System Update',
      message: 'New firmware update available',
      time: '4 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Energy Production',
      message: 'Above average production today!',
      time: 'Yesterday',
      read: false
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const isMobile = useIsMobile();
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align={isMobile ? "center" : "end"}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer ${notification.read ? 'opacity-70' : 'bg-muted/20'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        
        <div className="p-3 border-t text-center">
          <Button variant="link" size="sm" className="text-xs">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
