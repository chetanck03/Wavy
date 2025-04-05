
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'critical';
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged';
}

// Mock data for emergency alerts
const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    message: 'Grid instability detected in Residential Zone B',
    timestamp: new Date(Date.now() - 15 * 60000).toLocaleTimeString(),
    status: 'active'
  },
  {
    id: 'alert-002',
    type: 'critical',
    message: 'Battery overheating in Industrial Zone',
    timestamp: new Date(Date.now() - 32 * 60000).toLocaleTimeString(),
    status: 'active'
  },
  {
    id: 'alert-003',
    type: 'warning',
    message: 'Unusual power consumption pattern detected',
    timestamp: new Date(Date.now() - 67 * 60000).toLocaleTimeString(),
    status: 'acknowledged'
  }
];

const EmergencyAlerts: React.FC = () => {
  return (
    <div className="stats-card border-solar-red/30 space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-solar-red animate-pulse-slow" />
        <h3 className="font-medium">Emergency Alerts</h3>
      </div>
      
      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={cn(
            "p-3 rounded-md border",
            alert.type === 'critical' 
              ? "bg-solar-red/10 border-solar-red/30" 
              : "bg-solar-yellow/10 border-solar-yellow/30",
            alert.status === 'acknowledged' && "opacity-60"
          )}>
            <div className="flex justify-between items-start mb-1">
              <Badge className={cn(
                alert.type === 'critical' 
                  ? "bg-solar-red hover:bg-solar-red/80" 
                  : "bg-solar-yellow hover:bg-solar-yellow/80"
              )}>
                {alert.type === 'critical' ? 'Critical' : 'Warning'}
              </Badge>
              <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
            </div>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
