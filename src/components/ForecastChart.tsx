
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { PredictionData } from '@/services/solarDataService';
import { CloudSun, Sun, Cloud } from 'lucide-react';

interface ForecastChartProps {
  data: PredictionData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, weather } = props;
    
    let Icon;
    switch (weather) {
      case 'sunny': Icon = Sun; break;
      case 'partly-cloudy': Icon = CloudSun; break;
      case 'cloudy': Icon = Cloud; break;
      case 'rainy': Icon = Cloud; break;
      default: Icon = Sun;
    }
    
    return (
      <g>
        <Icon x={x + width / 2 - 10} y={y - 20} className="h-5 w-5" />
      </g>
    );
  };

  // Add custom bars for weather
  const CustomBar = (props: any) => {
    const { x, y, width, height, weather } = props;
    
    let fillColor;
    switch (weather) {
      case 'sunny': fillColor = '#FFB100'; break;
      case 'partly-cloudy': fillColor = '#FF8A00'; break;
      case 'cloudy': fillColor = '#64748B'; break;
      case 'rainy': fillColor = '#0EA5E9'; break;
      default: fillColor = '#FFB100';
    }
    
    return (
      <rect x={x} y={y} width={width} height={height} fill={fillColor} rx={4} />
    );
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
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
          <Bar 
            dataKey="predicted" 
            name="Predicted Output" 
            shape={<CustomBar />}
            label={renderCustomizedLabel}
          />
          <Bar 
            dataKey="actual" 
            name="Actual Output" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]} 
          />
          <ReferenceLine y={50} stroke="#64748B" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
