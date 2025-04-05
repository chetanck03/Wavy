
import React from 'react';
import { EnvironmentalImpactData } from '@/services/solarDataService';
import StatCard from './StatCard';
import { Sun, Leaf, Home, Droplets } from 'lucide-react';

interface EnvironmentalImpactProps {
  data: EnvironmentalImpactData;
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Environmental Impact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard 
          title="CO₂ Emissions Avoided"
          value={`${data.co2Saved.toLocaleString()} kg`}
          description="Lifetime"
          icon={<Sun size={20} />}
          trend={{ value: 12, direction: 'up' }}
          color="yellow"
        />
        
        <StatCard 
          title="Tree Equivalent"
          value={data.treesEquivalent}
          description="Carbon sequestration"
          icon={<Leaf size={20} />}
          color="green"
        />
        
        <StatCard 
          title="Homes Powered"
          value={data.homesPowered}
          description="Average annual usage"
          icon={<Home size={20} />}
          color="blue"
        />
        
        <StatCard 
          title="Water Saved"
          value={`${(data.waterSaved / 1000).toLocaleString()} L`}
          description="Compared to fossil fuels"
          icon={<Droplets size={20} />}
          color="blue"
        />
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
