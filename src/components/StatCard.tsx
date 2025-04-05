
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  color?: 'default' | 'yellow' | 'blue' | 'green' | 'red' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  color = 'default'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'yellow': return 'bg-solar-yellow/10 border-solar-yellow/20';
      case 'blue': return 'bg-solar-blue/10 border-solar-blue/20';
      case 'green': return 'bg-solar-green/10 border-solar-green/20';
      case 'red': return 'bg-solar-red/10 border-solar-red/20';
      case 'purple': return 'bg-solar-purple/10 border-solar-purple/20';
      default: return '';
    }
  };
  
  const getIconColorClass = () => {
    switch (color) {
      case 'yellow': return 'text-solar-yellow';
      case 'blue': return 'text-solar-blue';
      case 'green': return 'text-solar-green';
      case 'red': return 'text-solar-red';
      case 'purple': return 'text-solar-purple';
      default: return 'text-foreground';
    }
  };
  
  const getTrendColor = () => {
    if (!trend) return '';
    
    if (trend.direction === 'up') return 'text-solar-green';
    if (trend.direction === 'down') return 'text-solar-red';
    return 'text-solar-gray';
  };
  
  return (
    <div className={cn(
      "stats-card flex flex-col",
      getColorClasses(),
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className={cn("p-2 rounded-full", getIconColorClass())}>{icon}</div>}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        
        {(description || trend) && (
          <div className="flex items-center gap-2">
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            
            {trend && (
              <div className={cn("flex items-center text-xs font-medium", getTrendColor())}>
                {trend.direction === 'up' && '↑'}
                {trend.direction === 'down' && '↓'}
                {trend.direction === 'neutral' && '→'}
                {trend.value}%
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
