
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ConsumptionData } from '@/services/solarDataService';

interface EnergyChartProps {
  data: ConsumptionData[];
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              borderRadius: '8px',
              border: 'none',
              color: 'white',
              padding: '10px'
            }} 
            labelStyle={{ fontWeight: 'bold', color: 'white' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="production" 
            name="Solar Production"
            stackId="1" 
            stroke="#FFB100" 
            fill="#FFB100" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="consumption" 
            name="Consumption"
            stackId="2" 
            stroke="#0EA5E9" 
            fill="#0EA5E9" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="battery" 
            name="Battery"
            stackId="3" 
            stroke="#10B981" 
            fill="#10B981" 
            fillOpacity={0.5}
          />
          <Area 
            type="monotone" 
            dataKey="grid" 
            name="Grid"
            stackId="4" 
            stroke="#64748B" 
            fill="#64748B" 
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;
