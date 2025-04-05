
import React from 'react';
import { MicrogridData } from '@/services/solarDataService';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicrogridManagementProps {
  data: MicrogridData;
}

const MicrogridManagement: React.FC<MicrogridManagementProps> = ({ data }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'balanced': 
        return <Badge className="bg-solar-green hover:bg-solar-green/80">Balanced</Badge>;
      case 'excess': 
        return <Badge className="bg-solar-blue hover:bg-solar-blue/80">Excess</Badge>;
      case 'deficit': 
        return <Badge className="bg-solar-yellow hover:bg-solar-yellow/80">Deficit</Badge>;
      default: return null;
    }
  };
  
  const getArrow = (status: string) => {
    switch (status) {
      case 'balanced': return null;
      case 'excess': return <ArrowUp className="h-4 w-4 text-solar-blue" />;
      case 'deficit': return <ArrowDown className="h-4 w-4 text-solar-yellow" />;
      default: return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Smart Microgrid Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBlock 
          title="Total Load" 
          value={`${data.totalLoad} kW`} 
          icon={<ArrowDown className="h-5 w-5 text-solar-red" />}
        />
        <StatBlock 
          title="Total Generation" 
          value={`${data.totalGeneration} kW`} 
          icon={<ArrowUp className="h-5 w-5 text-solar-green" />}
        />
        <StatBlock 
          title="Battery Status" 
          value={`${data.batteryStatus}%`} 
          progressValue={data.batteryStatus}
        />
      </div>
      
      <div className="stats-card">
        <h3 className="font-medium mb-4">Grid Areas</h3>
        
        <div className="space-y-4">
          {data.areas.map((area) => (
            <div key={area.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{area.name}</span>
                  {getStatusBadge(area.status)}
                </div>
                <div className="flex items-center gap-2">
                  {getArrow(area.status)}
                  <span className="text-sm">{(area.production - area.consumption).toFixed(1)} kW</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Consumption</p>
                  <p>{area.consumption.toFixed(1)} kW</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Production</p>
                  <p>{area.production.toFixed(1)} kW</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Battery</p>
                  <p>{area.battery}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="stats-card">
        <h3 className="font-medium mb-4">Grid Connection</h3>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            data.gridConnection > 0 ? "bg-solar-green/20" : "bg-solar-red/20"
          )}>
            {data.gridConnection > 0 ? (
              <ArrowUp className="h-6 w-6 text-solar-green" />
            ) : (
              <ArrowDown className="h-6 w-6 text-solar-red" />
            )}
          </div>
          
          <div>
            <p className="text-2xl font-bold">{Math.abs(data.gridConnection).toFixed(1)} kW</p>
            <p className="text-sm text-muted-foreground">
              {data.gridConnection > 0 ? "Exporting to grid" : "Importing from grid"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBlock = ({ 
  title, 
  value, 
  icon, 
  progressValue 
}: { 
  title: string; 
  value: string; 
  icon?: React.ReactNode;
  progressValue?: number;
}) => {
  return (
    <div className="stats-card">
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">{value}</span>
        {icon}
      </div>
      {progressValue !== undefined && (
        <Progress value={progressValue} className="h-2 mt-2" />
      )}
    </div>
  );
};

export default MicrogridManagement;
