// ============================================================
// AERIS — Phase 8 Live Telemetry & Flight Operations Types
// ============================================================

export type GpsFixType = 'none' | 'fix2d' | 'fix3d' | 'rtk';
export type CameraRecordingState = 'recording' | 'paused' | 'idle';
export type EventSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type SubsystemStatus = 'NOMINAL' | 'DEGRADED' | 'WARNING' | 'OFFLINE';

export interface LiveTelemetryData {
  timestamp: string;
  uptimeSeconds: number;
  
  // Position & Motion
  latitude: number;
  longitude: number;
  altitudeAgl: number;
  altitudeMsl: number;
  groundSpeed: number;
  verticalSpeed: number;
  heading: number;
  pitch: number;
  roll: number;
  yaw: number;
  
  // Distances
  distanceFlownKm: number;
  distanceRemainingKm: number;
  
  // GNSS Quality
  fixType: GpsFixType;
  satellites: number;
  hdop: number;
  horizontalAccuracyM: number;
  verticalAccuracyM: number;
  
  // Power & Airframe
  airframe: string;
  flightMode: string;
  armStatus: 'ARMED' | 'DISARMED';
  batteryPercent: number;
  batteryVoltageV: number;
  batteryCurrentA: number;
  batteryRemainingMin: number;
  linkQualityPercent: number;
  latencyMs: number;
  
  // Camera Sensor
  cameraName: string;
  resolution: string;
  frameRateFps: number;
  currentFrame: number;
  keyframesCount: number;
  exposure: string;
  iso: number;
  focusState: string;
  storagePercent: number;
  cameraState: CameraRecordingState;
  
  // Reconstruction Pipeline Integration
  currentStageNumber: number; // e.g. 4
  currentStageName: string; // 'STAGE 4 — METRIC DEPTH'
  reconstructionProgressPercent: number;
  
  // Overall Mission Progress
  elapsedTimeString: string;
  estRemainingTimeString: string;
  flightProgressPercent: number;
  surveyCoveragePercent: number;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  severity: EventSeverity;
  category: string;
  message: string;
}

export interface SubsystemHealthItem {
  id: string;
  name: string;
  status: SubsystemStatus;
  detail: string;
}

export interface TelemetryHistoryPoint {
  timeLabel: string;
  altitude: number;
  speed: number;
  battery: number;
  satellites: number;
}

export interface MapWaypoint {
  seq: number;
  lat: number;
  lon: number;
  alt: number;
  isCompleted: boolean;
}
