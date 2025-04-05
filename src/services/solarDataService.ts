
export interface SolarData {
  hour: number;
  production: number;
  consumption: number;
}

export interface ConsumptionData {
  timestamp: string;
  production: number;
  consumption: number;
  battery: number;
  grid: number;
}

export interface ForecastData {
  day: string;
  production: number;
}

export interface PredictionData {
  day: string;
  predicted: number;
  actual: number;
  weather: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy';
}

export interface SolarPanel {
  id: string;
  location: string;
  angle: number;
  status: "optimal" | "warning" | "critical";
  production: number;
  efficiency: number;
  temperature: number;
  nextMaintenance: string;
  alerts: string[];
}

export interface EnvironmentalImpactData {
  co2Saved: number;
  treesEquivalent: number;
  homesPowered: number;
  waterSaved: number;
}

export interface MicrogridNode {
  id: string;
  type: "solar" | "battery" | "load";
  status: "online" | "offline";
  flow: number;
}

export interface MicrogridArea {
  id: string;
  name: string;
  consumption: number;
  production: number;
  battery: number;
  status: "balanced" | "excess" | "deficit";
}

export interface MicrogridData {
  id: string;
  currentLoad: number;
  optimalLoad: number;
  efficiency: number;
  batteryLevel: number;
  batteryCapacity: number;
  connectedDevices: number;
  priorityDevices: number;
  status: "balanced" | "excess" | "deficit";
  nodes: MicrogridNode[];
  totalLoad: number;
  totalGeneration: number;
  batteryStatus: number;
  areas: MicrogridArea[];
  gridConnection: number;
}

export class SolarDataService {
  static getTodayConsumption(): ConsumptionData[] {
    return [
      { timestamp: "00:00", production: 0.1, consumption: 0.5, battery: -0.2, grid: -0.2 },
      { timestamp: "01:00", production: 0.1, consumption: 0.4, battery: -0.2, grid: -0.1 },
      { timestamp: "02:00", production: 0.1, consumption: 0.3, battery: -0.1, grid: -0.1 },
      { timestamp: "03:00", production: 0.1, consumption: 0.3, battery: -0.1, grid: -0.1 },
      { timestamp: "04:00", production: 0.2, consumption: 0.4, battery: -0.1, grid: -0.1 },
      { timestamp: "05:00", production: 0.5, consumption: 0.6, battery: -0.1, grid: 0 },
      { timestamp: "06:00", production: 1.2, consumption: 0.8, battery: 0.2, grid: 0.2 },
      { timestamp: "07:00", production: 2.5, consumption: 1.0, battery: 0.8, grid: 0.7 },
      { timestamp: "08:00", production: 3.8, consumption: 1.2, battery: 1.5, grid: 1.1 },
      { timestamp: "09:00", production: 4.5, consumption: 1.5, battery: 1.8, grid: 1.2 },
      { timestamp: "10:00", production: 5.2, consumption: 1.8, battery: 2.0, grid: 1.4 },
      { timestamp: "11:00", production: 5.8, consumption: 2.0, battery: 2.2, grid: 1.6 },
      { timestamp: "12:00", production: 6.0, consumption: 2.2, battery: 2.3, grid: 1.5 },
      { timestamp: "13:00", production: 5.9, consumption: 2.1, battery: 2.2, grid: 1.6 },
      { timestamp: "14:00", production: 5.5, consumption: 2.0, battery: 2.0, grid: 1.5 },
      { timestamp: "15:00", production: 4.8, consumption: 1.8, battery: 1.7, grid: 1.3 },
      { timestamp: "16:00", production: 3.5, consumption: 1.5, battery: 1.2, grid: 0.8 },
      { timestamp: "17:00", production: 2.0, consumption: 1.2, battery: 0.5, grid: 0.3 },
      { timestamp: "18:00", production: 0.8, consumption: 1.0, battery: -0.1, grid: -0.1 },
      { timestamp: "19:00", production: 0.3, consumption: 0.7, battery: -0.2, grid: -0.2 },
      { timestamp: "20:00", production: 0.1, consumption: 0.5, battery: -0.2, grid: -0.2 },
      { timestamp: "21:00", production: 0.1, consumption: 0.4, battery: -0.2, grid: -0.1 },
      { timestamp: "22:00", production: 0.1, consumption: 0.3, battery: -0.1, grid: -0.1 },
      { timestamp: "23:00", production: 0.1, consumption: 0.3, battery: -0.1, grid: -0.1 },
    ];
  }

  static getWeekForecast(): PredictionData[] {
    return [
      { day: "Mon", predicted: 4.2, actual: 3.8, weather: "sunny" },
      { day: "Tue", predicted: 4.5, actual: 4.2, weather: "partly-cloudy" },
      { day: "Wed", predicted: 5.2, actual: 5.0, weather: "sunny" },
      { day: "Thu", predicted: 3.2, actual: 2.8, weather: "cloudy" },
      { day: "Fri", predicted: 4.8, actual: 4.5, weather: "partly-cloudy" },
      { day: "Sat", predicted: 5.7, actual: 5.5, weather: "sunny" },
      { day: "Sun", predicted: 3.5, actual: 3.0, weather: "rainy" },
    ];
  }

  static getSolarPanels(): SolarPanel[] {
    return [
      { id: "panel-1", location: "Roof", angle: 30, status: "optimal", production: 1.2, efficiency: 95, temperature: 42, nextMaintenance: "2025-08-15", alerts: [] },
      { id: "panel-2", location: "Roof", angle: 30, status: "optimal", production: 1.1, efficiency: 92, temperature: 44, nextMaintenance: "2025-09-03", alerts: [] },
      { id: "panel-3", location: "Roof", angle: 30, status: "warning", production: 0.9, efficiency: 76, temperature: 48, nextMaintenance: "2025-07-28", alerts: ["Dust accumulation", "Performance degradation"] },
      { id: "panel-4", location: "Ground", angle: 45, status: "optimal", production: 1.3, efficiency: 94, temperature: 40, nextMaintenance: "2025-10-05", alerts: [] },
      { id: "panel-5", location: "Ground", angle: 45, status: "critical", production: 0.1, efficiency: 12, temperature: 65, nextMaintenance: "2025-07-15", alerts: ["Electrical fault", "Immediate service needed", "High temperature"] },
      { id: "panel-6", location: "Roof", angle: 30, status: "optimal", production: 1.2, efficiency: 93, temperature: 43, nextMaintenance: "2025-11-22", alerts: [] },
      { id: "panel-7", location: "Roof", angle: 30, status: "optimal", production: 1.1, efficiency: 91, temperature: 45, nextMaintenance: "2025-09-25", alerts: [] },
      { id: "panel-8", location: "Roof", angle: 30, status: "warning", production: 0.9, efficiency: 78, temperature: 47, nextMaintenance: "2025-08-12", alerts: ["Performance degradation"] },
      { id: "panel-9", location: "Ground", angle: 45, status: "optimal", production: 1.3, efficiency: 96, temperature: 41, nextMaintenance: "2025-10-18", alerts: [] },
      { id: "panel-10", location: "Ground", angle: 45, status: "critical", production: 0.1, efficiency: 15, temperature: 63, nextMaintenance: "2025-07-10", alerts: ["Connection issue", "Hardware fault"] },
    ];
  }

  static getEnvironmentalImpact(): EnvironmentalImpactData {
    return {
      co2Saved: 15000,
      treesEquivalent: 500,
      homesPowered: 60,
      waterSaved: 800000,
    };
  }

  static getMicrogridData(): MicrogridData {
    return {
      id: "microgrid-1",
      currentLoad: 150,
      optimalLoad: 120,
      efficiency: 85,
      batteryLevel: 75,
      batteryCapacity: 100,
      connectedDevices: 45,
      priorityDevices: 15,
      status: "balanced",
      nodes: [
        { id: "solar-1", type: "solar", status: "online", flow: 50 },
        { id: "battery-1", type: "battery", status: "online", flow: 25 },
        { id: "load-1", type: "load", status: "online", flow: 75 },
      ],
      totalLoad: 180,
      totalGeneration: 195,
      batteryStatus: 78,
      gridConnection: 15,
      areas: [
        {
          id: "area-1",
          name: "Residential Area",
          consumption: 65,
          production: 80,
          battery: 90,
          status: "excess"
        },
        {
          id: "area-2",
          name: "Commercial Zone",
          consumption: 85,
          production: 70,
          battery: 60,
          status: "deficit"
        },
        {
          id: "area-3",
          name: "Industrial Park",
          consumption: 30,
          production: 45,
          battery: 85,
          status: "balanced"
        }
      ]
    };
  }
}
