
import React from 'react';
import EnergyChart from '@/components/EnergyChart';
import ForecastChart from '@/components/ForecastChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloudSun, ArrowUpDown, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/services/apiService';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Monitoring = () => {
  const { 
    data: todayData, 
    isLoading: isLoadingToday,
    isError: isTodayError,
    refetch: refetchToday
  } = useQuery({
    queryKey: ['todayConsumption'],
    queryFn: () => ApiService.getTodayConsumption(),
  });
  
  const { 
    data: forecastData, 
    isLoading: isLoadingForecast,
    isError: isForecastError,
    refetch: refetchForecast
  } = useQuery({
    queryKey: ['weekForecast'],
    queryFn: () => ApiService.getWeekForecast(),
  });

  const handleRefreshRealtime = () => {
    refetchToday();
  };

  const handleRefreshForecast = () => {
    refetchForecast();
  };
  
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Solar Energy Monitoring</h1>
            <p className="text-muted-foreground">Real-time data and forecasts</p>
          </div>
        </div>
        
        {/* Monitoring Content */}
        <Tabs defaultValue="realtime" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="realtime" className="flex-1 md:flex-initial">Real-time Energy</TabsTrigger>
            <TabsTrigger value="forecast" className="flex-1 md:flex-initial">Energy Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="realtime" className="space-y-6">
            <div className="stats-card space-y-4 mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-solar-blue" />
                  <h2 className="text-xl font-bold">Real-time Energy Monitoring</h2>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshRealtime}
                  disabled={isLoadingToday}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingToday ? 'animate-spin' : ''}`} />
                  Refresh Data
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">Today's production and consumption with AI-driven analysis</p>
              
              <div className="h-[300px] md:h-[500px]">
                {isLoadingToday ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="w-full h-[250px] md:h-[450px] rounded-xl" />
                  </div>
                ) : isTodayError ? (
                  <div className="flex items-center justify-center h-full text-red-500">
                    <p>Failed to load data. Please refresh.</p>
                  </div>
                ) : todayData ? (
                  <EnergyChart data={todayData} />
                ) : null}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-solar-green/10 rounded-md p-4 border border-solar-green/20">
                  <p className="text-sm font-medium text-muted-foreground">AI Insight</p>
                  <p className="text-sm mt-1">Peak production expected between 11:00 - 14:00. Consider scheduling high-consumption tasks during this window.</p>
                </div>
                
                <div className="bg-solar-blue/10 rounded-md p-4 border border-solar-blue/20">
                  <p className="text-sm font-medium text-muted-foreground">Optimization Tip</p>
                  <p className="text-sm mt-1">Battery storage is 78% efficient. Recommended to store excess energy during mid-day production peaks.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="space-y-6">
            <div className="stats-card space-y-4 mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-solar-yellow" />
                  <h2 className="text-xl font-bold">Energy Forecast</h2>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshForecast}
                  disabled={isLoadingForecast}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingForecast ? 'animate-spin' : ''}`} />
                  Update Forecast
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">7-day prediction based on weather patterns and historical data</p>
              
              <div className="h-[300px] md:h-[500px]">
                {isLoadingForecast ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="w-full h-[250px] md:h-[450px] rounded-xl" />
                  </div>
                ) : isForecastError ? (
                  <div className="flex items-center justify-center h-full text-red-500">
                    <p>Failed to load forecast. Please refresh.</p>
                  </div>
                ) : forecastData ? (
                  <ForecastChart data={forecastData} />
                ) : null}
              </div>
              
              <div className="bg-solar-purple/10 rounded-md p-4 border border-solar-purple/20 mt-4">
                <p className="text-sm font-medium text-muted-foreground">Weather Impact</p>
                <p className="text-sm mt-1">Cloudy conditions predicted for Thursday will reduce production by approximately 35%. Consider adjusting consumption or using stored energy.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Monitoring;
