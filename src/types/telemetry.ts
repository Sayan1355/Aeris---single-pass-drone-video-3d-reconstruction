// ============================================================
// AERIS — Telemetry Types
// ============================================================

export type GpsFixType = 'none' | 'fix2d' | 'fix3d' | 'rtk';
export type CameraState = 'idle' | 'recording' | 'error' | 'paused';
export type ConnectionState = 'connected' | 'connecting' | 'degraded' | 'disconnected';

export interface TelemetrySnapshot {
  timestamp: string;
  // Position
  latitude: number;
  longitude: number;
  altitude: number;      // meters AGL
  altitudeMSL: number;   // meters above mean sea level
  // Motion
  speed: number;         // m/s ground speed
  verticalSpeed: number; // m/s (+ = ascend)
  heading: number;       // degrees 0–359
  // Attitude
  pitch: number;         // degrees (- = nose down)
  roll: number;          // degrees
  yaw: number;           // degrees
  // GPS
  gpsFixType: GpsFixType;
  satelliteCount: number;
  hdop: number;          // Horizontal dilution of precision
  // Power
  batteryPercent: number;
  batteryVoltage: number; // V
  batteryCurrentA: number; // Amps
  // Link
  signalStrength: number; // 0–100
  latencyMs: number;
  // Camera
  cameraState: CameraState;
  frameCount: number;
  // Waypoint
  waypointIndex: number;
  waypointTotal: number;
  distanceToHomeM: number;
}

export interface SystemHealth {
  gps: ConnectionState;
  rtk: ConnectionState;
  telemetry: ConnectionState;
  videoStream: ConnectionState;
  processing: ConnectionState;
  storage: ConnectionState;
  api: ConnectionState;
  // optional values
  storageUsedGB?: number;
  storageTotalGB?: number;
  apiLatencyMs?: number;
  videoLatencyMs?: number;
  processingCpuPct?: number;
}

// Trajectory waypoint for flight path visualisation
export interface TrajectoryPoint {
  lat: number;
  lon: number;
  alt: number;
  seq: number;
}
