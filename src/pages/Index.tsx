import React, { useState } from 'react';
import StatCard from '@/components/StatCard';
import EnergyChart from '@/components/EnergyChart';
import ForecastChart from '@/components/ForecastChart';
import PanelStatusCard from '@/components/PanelStatusCard';
import EnvironmentalImpact from '@/components/EnvironmentalImpact';
import MicrogridManagement from '@/components/MicrogridManagement';
import EmergencyAlerts from '@/components/EmergencyAlerts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SolarDataService } from '@/services/solarDataService';
import { Sun, Gauge, ThermometerSun, ArrowDown, ArrowUp, CloudSun, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [todayData] = useState(SolarDataService.getTodayConsumption());
  const [forecastData] = useState(SolarDataService.getWeekForecast());
  const [panelsData] = useState(SolarDataService.getSolarPanels());
  const [environmentalData] = useState(SolarDataService.getEnvironmentalImpact());
  const [microgridData] = useState(SolarDataService.getMicrogridData());
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();
  
  // Calculate total production and consumption for today
  const totalProduction = todayData.reduce((sum, hour) => sum + hour.production, 0);
  const totalConsumption = todayData.reduce((sum, hour) => sum + hour.consumption, 0);
  const netEnergy = totalProduction - totalConsumption;
  
  // Calculate panel status counts
  const optimalPanels = panelsData.filter(p => p.status === 'optimal').length;
  const warningPanels = panelsData.filter(p => p.status === 'warning').length;
  const criticalPanels = panelsData.filter(p => p.status === 'critical').length;
  
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      
      toast({
        title: "Report Generated",
        description: "Your solar system performance report has been generated and is ready for download.",
        action: (
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>
            Download
          </Button>
        ),
      });
    }, 2000);
  };
  
  const handleDownloadReport = () => {
    // Create a sample report data with current date
    const reportDate = new Date().toLocaleDateString();
    
    // Create report content
    const reportContent = `
    आदित्य OPTIMIZER - SYSTEM REPORT
    Generated on: ${reportDate}
    
    SYSTEM OVERVIEW
    ---------------
    Total Production Today: ${totalProduction.toFixed(1)} kWh
    Total Consumption Today: ${totalConsumption.toFixed(1)} kWh
    Net Energy: ${Math.abs(netEnergy).toFixed(1)} kWh (${netEnergy >= 0 ? "Surplus" : "Deficit"})
    
    PANEL STATUS
    ------------
    Total Panels: ${panelsData.length}
    Optimal: ${optimalPanels}
    Warning: ${warningPanels}
    Critical: ${criticalPanels}
    
    ENVIRONMENTAL IMPACT
    -------------------
    CO₂ Emissions Avoided: ${environmentalData.co2Saved.toLocaleString()} kg
    Tree Equivalent: ${environmentalData.treesEquivalent}
    Homes Powered: ${environmentalData.homesPowered}
    Water Saved: ${(environmentalData.waterSaved / 1000).toLocaleString()} L
    
    MICROGRID STATUS
    ---------------
    Current Load: ${microgridData.currentLoad} kW
    Grid Efficiency: ${microgridData.efficiency}%
    
    RECOMMENDATIONS
    --------------
    1. ${warningPanels > 0 || criticalPanels > 0 ? 'Schedule maintenance for panels with warnings or critical issues.' : 'Continue regular maintenance schedule.'}
    2. ${netEnergy < 0 ? 'Consider reducing energy consumption during peak hours.' : 'Consider storing excess energy for future use.'}
    3. Monitor weather conditions for optimal energy production planning.
    `;
    
    // Create a blob from the content
    const blob = new Blob([reportContent], { type: 'text/plain' });
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Aditya_Report_${reportDate.replace(/\//g, '-')}.txt`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Solar Energy Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring and analytics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="gap-2">
              <FileText className="h-4 w-4" />
              {isGeneratingReport ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Production"
            value={`${totalProduction.toFixed(1)} kWh`}
            description="Today"
            icon={<Sun size={20} />}
            trend={{ value: 12, direction: 'up' }}
            color="yellow"
          />
          
          <StatCard 
            title="Total Consumption"
            value={`${totalConsumption.toFixed(1)} kWh`}
            description="Today"
            icon={<Gauge size={20} />}
            trend={{ value: 5, direction: 'down' }}
            color="blue"
          />
          
          <StatCard 
            title="Net Energy"
            value={`${Math.abs(netEnergy).toFixed(1)} kWh`}
            description={netEnergy >= 0 ? "Surplus" : "Deficit"}
            icon={netEnergy >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            color={netEnergy >= 0 ? "green" : "red"}
          />
          
          <StatCard 
            title="Panel Health"
            value={`${optimalPanels}/${panelsData.length}`}
            description={`${warningPanels} warnings, ${criticalPanels} critical`}
            icon={<ThermometerSun size={20} />}
            color={criticalPanels > 0 ? "red" : warningPanels > 0 ? "yellow" : "green"}
          />
        </div>
        
        {/* Energy Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 stats-card space-y-4">
            <h2 className="text-xl font-bold">Real-time Energy Monitoring</h2>
            <p className="text-sm text-muted-foreground">Today's production and consumption with AI-driven analysis</p>
            
            <div className="h-[350px]">
              <EnergyChart data={todayData} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
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
          
          <div className="stats-card space-y-4">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-solar-yellow" />
              <h2 className="text-xl font-bold">Energy Forecast</h2>
            </div>
            
            <p className="text-sm text-muted-foreground">7-day prediction based on weather patterns and historical data</p>
            
            <div className="h-[350px]">
              <ForecastChart data={forecastData} />
            </div>
            
            <div className="bg-solar-purple/10 rounded-md p-4 border border-solar-purple/20 mt-4">
              <p className="text-sm font-medium text-muted-foreground">Weather Impact</p>
              <p className="text-sm mt-1">Cloudy conditions predicted for Thursday will reduce production by approximately 35%. Consider adjusting consumption or using stored energy.</p>
            </div>
          </div>
        </div>
        
        {/* Predictive Maintenance */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Predictive Maintenance</h2>
          
          <Tabs defaultValue="issues">
            <TabsList>
              <TabsTrigger value="issues">Issues Detected</TabsTrigger>
              <TabsTrigger value="all">All Panels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {panelsData
                  .filter(panel => panel.status !== 'optimal')
                  .map(panel => (
                    <PanelStatusCard key={panel.id} panel={panel} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {panelsData.map(panel => (
                  <PanelStatusCard key={panel.id} panel={panel} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Environmental Impact */}
        <EnvironmentalImpact data={environmentalData} />
        
        {/* Microgrid Management */}
        <MicrogridManagement data={microgridData} />
        
        {/* Emergency Alerts */}
        <EmergencyAlerts />
      </div>
    </div>
  );
};

export default Index;
