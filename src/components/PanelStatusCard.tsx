
import React from 'react';
import { SolarPanel } from '@/services/solarDataService';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PanelStatusCardProps {
  panel: SolarPanel;
}

const PanelStatusCard: React.FC<PanelStatusCardProps> = ({ panel }) => {
  const getStatusColor = () => {
    switch (panel.status) {
      case 'optimal': return 'bg-solar-green/10 border-solar-green/30';
      case 'warning': return 'bg-solar-yellow/10 border-solar-yellow/30';
      case 'critical': return 'bg-solar-red/10 border-solar-red/30';
      default: return '';
    }
  };
  
  const getStatusBadge = () => {
    switch (panel.status) {
      case 'optimal': 
        return <Badge className="bg-solar-green hover:bg-solar-green/80">Optimal</Badge>;
      case 'warning': 
        return <Badge className="bg-solar-yellow hover:bg-solar-yellow/80">Warning</Badge>;
      case 'critical': 
        return <Badge className="bg-solar-red hover:bg-solar-red/80">Critical</Badge>;
      default: return null;
    }
  };
  
  const getEfficiencyColor = () => {
    if (panel.efficiency >= 85) return 'text-solar-green';
    if (panel.efficiency >= 70) return 'text-solar-yellow';
    return 'text-solar-red';
  };
  
  const getProgressColor = () => {
    if (panel.efficiency >= 85) return 'bg-solar-green';
    if (panel.efficiency >= 70) return 'bg-solar-yellow';
    return 'bg-solar-red';
  };
  
  return (
    <div className={cn(
      "stats-card space-y-4",
      getStatusColor()
    )}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{panel.id}</h3>
          <p className="text-xs text-muted-foreground">{panel.location}</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Efficiency</span>
          <span className={cn("font-medium", getEfficiencyColor())}>{panel.efficiency}%</span>
        </div>
        <Progress value={panel.efficiency} className={cn("h-2", getProgressColor())} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Temperature</p>
          <p>{panel.temperature}°C</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Next Maintenance</p>
          <p>{panel.nextMaintenance}</p>
        </div>
      </div>
      
      {panel.alerts && panel.alerts.length > 0 && (
        <div className="space-y-1 pt-2">
          <p className="text-xs font-medium text-muted-foreground">Alerts</p>
          <ul className="text-xs space-y-1">
            {panel.alerts.map((alert, index) => (
              <li key={index} className="text-solar-red">{alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PanelStatusCard;
