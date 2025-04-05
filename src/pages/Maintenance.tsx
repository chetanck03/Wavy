
import React, { useState } from 'react';
import PanelStatusCard from '@/components/PanelStatusCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThermometerSun, AlertTriangle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/services/apiService';
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Maintenance = () => {
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { 
    data: panelsData, 
    isLoading, 
    isError,
    refetch
  } = useQuery({
    queryKey: ['solarPanels'],
    queryFn: () => ApiService.getSolarPanels(),
  });
  
  // Calculate panel status counts
  const optimalPanels = panelsData?.filter(p => p.status === 'optimal').length || 0;
  const warningPanels = panelsData?.filter(p => p.status === 'warning').length || 0;
  const criticalPanels = panelsData?.filter(p => p.status === 'critical').length || 0;
  
  const openMaintenanceDialog = (panelId: string) => {
    setSelectedPanelId(panelId);
    
    // Set default maintenance date to 7 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    setMaintenanceDate(defaultDate.toISOString().substring(0, 10));
    
    setDialogOpen(true);
  };
  
  const handleScheduleMaintenance = async () => {
    if (!selectedPanelId || !maintenanceDate) return;
    
    try {
      await ApiService.updatePanelMaintenance(selectedPanelId, maintenanceDate);
      setDialogOpen(false);
      refetch(); // Refresh data after update
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
    }
  };
  
  if (isLoading) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </main>
    );
  }
  
  if (isError) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground mb-4">Unable to connect to the solar panel monitoring system.</p>
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
            <h1 className="text-2xl md:text-3xl font-bold">Predictive Maintenance</h1>
            <p className="text-muted-foreground">Monitor and maintain your solar panels</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium">System Health</p>
              <p className={`text-sm ${criticalPanels > 0 ? 'text-red-500' : warningPanels > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {criticalPanels > 0 ? 'Critical Issues' : warningPanels > 0 ? 'Warnings' : 'All Systems Optimal'}
              </p>
            </div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${criticalPanels > 0 ? 'bg-red-100' : warningPanels > 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
              {criticalPanels > 0 ? (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              ) : warningPanels > 0 ? (
                <ThermometerSun className="h-6 w-6 text-yellow-500" />
              ) : (
                <ThermometerSun className="h-6 w-6 text-green-500" />
              )}
            </div>
          </div>
        </div>
        
        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-md p-4 border border-green-100">
            <p className="text-sm font-medium">Optimal</p>
            <p className="text-2xl font-bold text-green-600">{optimalPanels}</p>
            <p className="text-sm text-muted-foreground">panels performing well</p>
          </div>
          
          <div className="bg-yellow-50 rounded-md p-4 border border-yellow-100">
            <p className="text-sm font-medium">Warning</p>
            <p className="text-2xl font-bold text-yellow-600">{warningPanels}</p>
            <p className="text-sm text-muted-foreground">panels need attention</p>
          </div>
          
          <div className="bg-red-50 rounded-md p-4 border border-red-100">
            <p className="text-sm font-medium">Critical</p>
            <p className="text-2xl font-bold text-red-600">{criticalPanels}</p>
            <p className="text-sm text-muted-foreground">panels require immediate service</p>
          </div>
        </div>
        
        {/* Panel Status */}
        <div className="space-y-4">
          <Tabs defaultValue="issues">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="issues" className="flex-1 md:flex-initial">Issues Detected</TabsTrigger>
              <TabsTrigger value="all" className="flex-1 md:flex-initial">All Panels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {panelsData
                  .filter(panel => panel.status !== 'optimal')
                  .map(panel => (
                    <div key={panel.id} className="relative">
                      <PanelStatusCard panel={panel} />
                      <Button 
                        size="sm" 
                        className="absolute bottom-4 right-4"
                        onClick={() => openMaintenanceDialog(panel.id)}
                      >
                        Schedule Service
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {panelsData.map(panel => (
                  <div key={panel.id} className="relative">
                    <PanelStatusCard panel={panel} />
                    {panel.status !== 'optimal' && (
                      <Button 
                        size="sm" 
                        className="absolute bottom-4 right-4"
                        onClick={() => openMaintenanceDialog(panel.id)}
                      >
                        Schedule Service
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>
              Select a date to schedule maintenance for panel {selectedPanelId}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleScheduleMaintenance} className="w-full sm:w-auto">Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Maintenance;
