
import React from 'react';
import MicrogridManagement from '@/components/MicrogridManagement';
import { Button } from '@/components/ui/button';
import { Lightbulb, Zap, Cpu, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/services/apiService';
import { Skeleton } from '@/components/ui/skeleton';

const Microgrid = () => {
  const { toast } = useToast();
  
  const { 
    data: microgridData, 
    isLoading, 
    isError,
    refetch
  } = useQuery({
    queryKey: ['microgrid'],
    queryFn: () => ApiService.getMicrogridData(),
  });
  
  const handleOptimizeGrid = async () => {
    try {
      await ApiService.optimizeMicrogrid();
      refetch(); // Reload data after optimization
    } catch (error) {
      console.error("Error optimizing grid:", error);
    }
  };
  
  if (isLoading) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </main>
    );
  }
  
  if (isError) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="text-muted-foreground mb-4">Unable to connect to the microgrid management system.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Microgrid Management</h1>
            <p className="text-muted-foreground">Intelligent load balancing and optimization</p>
          </div>
          
          <Button onClick={handleOptimizeGrid} className="gap-2">
            <Cpu className="h-4 w-4" />
            Optimize Grid
          </Button>
        </div>
        
        {/* Microgrid Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <p className="text-sm font-medium">Current Load</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">{microgridData?.currentLoad} kW</p>
            <p className="text-sm text-muted-foreground">
              {microgridData?.currentLoad && microgridData?.optimalLoad && 
                microgridData.currentLoad > microgridData.optimalLoad ? 'Above optimal range' : 'Within optimal range'}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-md p-4 border border-green-100">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium">Grid Efficiency</p>
            </div>
            <p className="text-2xl font-bold text-green-600">{microgridData?.efficiency}%</p>
            <p className="text-sm text-muted-foreground">
              {microgridData?.efficiency && microgridData.efficiency > 90 ? 'Excellent' : 
               microgridData?.efficiency && microgridData.efficiency > 80 ? 'Good' : 'Needs improvement'}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-md p-4 border border-purple-100">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-500" />
              <p className="text-sm font-medium">AI Recommendation</p>
            </div>
            <p className="text-lg font-medium text-purple-600">
              {microgridData?.status === "balanced" ? "Maintain current settings" : 
               microgridData?.status === "excess" ? "Store excess energy" : "Reduce non-essential systems"}
            </p>
          </div>
        </div>
        
        {/* Microgrid Management Component */}
        {microgridData && <MicrogridManagement data={microgridData} />}
      </div>
    </main>
  );
};

export default Microgrid;
