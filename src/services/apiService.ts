
import { 
  SolarPanel, 
  ConsumptionData, 
  PredictionData, 
  MicrogridData, 
  EnvironmentalImpactData 
} from './solarDataService';
import { toast } from 'sonner';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API fetch with loading time and occasional errors
async function fetchWithSimulation<T>(data: T, errorChance = 0.1): Promise<T> {
  // Simulate network delay (300-1500ms)
  await delay(300 + Math.random() * 1200);
  
  // Simulate occasional errors
  if (Math.random() < errorChance) {
    throw new Error('Network error: Failed to fetch data');
  }
  
  return data;
}

// Solar data API service with simulated backend requests
export class ApiService {
  static async getSolarPanels(): Promise<SolarPanel[]> {
    try {
      const cachedData = localStorage.getItem('solarPanels');
      
      // If we have cached data, use it immediately
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      
      // Import the static data
      const { SolarDataService } = await import('./solarDataService');
      
      // Simulate API call
      toast.loading('Loading solar panel data...');
      const data = await fetchWithSimulation(SolarDataService.getSolarPanels());
      
      // Cache the data
      localStorage.setItem('solarPanels', JSON.stringify(data));
      toast.dismiss();
      toast.success('Solar panel data loaded');
      
      return data;
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load solar panel data');
      console.error('Error fetching solar panels:', error);
      throw error;
    }
  }
  
  static async getTodayConsumption(): Promise<ConsumptionData[]> {
    try {
      toast.loading('Analyzing energy consumption...');
      
      // Import the static data
      const { SolarDataService } = await import('./solarDataService');
      
      // Simulate API call
      const data = await fetchWithSimulation(SolarDataService.getTodayConsumption());
      
      toast.dismiss();
      toast.success('Energy consumption data updated');
      
      return data;
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load consumption data');
      console.error('Error fetching consumption data:', error);
      throw error;
    }
  }
  
  static async getWeekForecast(): Promise<PredictionData[]> {
    try {
      toast.loading('Generating energy forecasts...');
      
      // Import the static data
      const { SolarDataService } = await import('./solarDataService');
      
      // Simulate API call
      const data = await fetchWithSimulation(SolarDataService.getWeekForecast());
      
      toast.dismiss();
      toast.success('Energy forecast calculated');
      
      return data;
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load forecast data');
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  }
  
  static async getMicrogridData(): Promise<MicrogridData> {
    try {
      toast.loading('Connecting to microgrid...');
      
      // Import the static data
      const { SolarDataService } = await import('./solarDataService');
      
      // Simulate API call
      const data = await fetchWithSimulation(SolarDataService.getMicrogridData());
      
      toast.dismiss();
      toast.success('Microgrid connection established');
      
      return data;
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to connect to microgrid');
      console.error('Error fetching microgrid data:', error);
      throw error;
    }
  }
  
  static async getEnvironmentalImpact(): Promise<EnvironmentalImpactData> {
    try {
      toast.loading('Calculating environmental impact...');
      
      // Import the static data
      const { SolarDataService } = await import('./solarDataService');
      
      // Simulate API call
      const data = await fetchWithSimulation(SolarDataService.getEnvironmentalImpact());
      
      toast.dismiss();
      toast.success('Environmental impact calculated');
      
      return data;
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to calculate environmental impact');
      console.error('Error fetching environmental impact:', error);
      throw error;
    }
  }

  static async updatePanelMaintenance(panelId: string, date: string): Promise<void> {
    try {
      toast.loading(`Scheduling maintenance for panel ${panelId}...`);
      
      // Simulate API call
      await delay(1500);
      
      // Update local storage if present
      const cachedData = localStorage.getItem('solarPanels');
      if (cachedData) {
        const panels = JSON.parse(cachedData) as SolarPanel[];
        const updatedPanels = panels.map(panel => 
          panel.id === panelId ? { ...panel, nextMaintenance: date } : panel
        );
        localStorage.setItem('solarPanels', JSON.stringify(updatedPanels));
      }
      
      toast.dismiss();
      toast.success(`Maintenance scheduled for ${date}`);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to schedule maintenance');
      console.error('Error updating panel maintenance:', error);
      throw error;
    }
  }

  static async optimizeMicrogrid(): Promise<void> {
    try {
      toast.loading('Running microgrid optimization algorithms...');
      
      // Simulate intensive computation
      await delay(3500);
      
      toast.dismiss();
      toast.success('Microgrid optimized. Efficiency improved by 8%');
    } catch (error) {
      toast.dismiss();
      toast.error('Optimization failed');
      console.error('Error optimizing microgrid:', error);
      throw error;
    }
  }
}
