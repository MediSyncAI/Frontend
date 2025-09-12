
// A generic metric shape (single metric)
interface BaseMetric {
  status: Status;
  trend: Trend;
}

// Specialized metric types
interface HeartRateMetric extends BaseMetric {
  value: number;
}

interface BloodPressureMetric extends BaseMetric {
  systolic: number;
  diastolic: number;
}

interface WeightMetric extends BaseMetric {
  value: number;
  unit: string;
}

interface TemperatureMetric extends BaseMetric {
  value: number;
  unit: string;
}

// The full HealthMetrics object (all metrics grouped)
export interface HealthMetrics {
  heartRate: HeartRateMetric;
  bloodPressure: BloodPressureMetric;
  weight: WeightMetric;
  temperature: TemperatureMetric;
}


export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: Status;
}

export interface Prescription {
  id: number;
  medication: string;   // instead of `name`
  dosage: string;
  prescribed: string;   // doctor’s name
  startDate: string;
  endDate: string;
  status: Status;
}


export interface RecentTest {
  id: number;
  test: string;   // match your state
  date: string;
  result: string;
  status: Status;
  doctor: string; // also in your state
}


// Possible statuses
export type Status = "normal" | "active" | "confirmed" | "pending" | "expiring" | "completed";

// Possible trends
export type Trend = "improved" | "stable" | "declined";

// Health metrics object
export interface HealthMetrics {
  heartRate: { value: number; status: Status; trend: Trend };
  bloodPressure: { systolic: number; diastolic: number; status: Status; trend: Trend };
  weight: { value: number; unit: string; status: Status; trend: Trend };
  temperature: { value: number; unit: string; status: Status; trend: Trend };
}

// Appointment structure
export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: Status;
}

// Prescription structure
export interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  prescribed: string;
  startDate: string;
  endDate: string;
  status: Status;
}

// Recent test structure
export interface RecentTest {
  id: number;
  test: string;
  date: string;
  status: Status;
  result: string;
  doctor: string;
}
