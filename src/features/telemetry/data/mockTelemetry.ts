// ============================================================
// AERIS — Phase 8 Live Telemetry & Flight Operations Mock Data
// Centralized mock state snapshot and trajectory definition
// ============================================================

import type {
  LiveTelemetryData,
  TelemetryEvent,
  SubsystemHealthItem,
  TelemetryHistoryPoint,
  MapWaypoint,
} from '../types';

export const INITIAL_TELEMETRY_DATA: LiveTelemetryData = {
  timestamp: '2026-09-08 21:42:00 UTC',
  uptimeSeconds: 2262, // 37m 42s
  
  // Position & Motion
  latitude: 22.5726,
  longitude: 88.3639,
  altitudeAgl: 124.6,
  altitudeMsl: 243.1,
  groundSpeed: 11.8,
  verticalSpeed: 0.3,
  heading: 84,
  pitch: -1.8,
  roll: 0.6,
  yaw: 84.2,
  
  // Distances
  distanceFlownKm: 4.82,
  distanceRemainingKm: 2.31,
  
  // GNSS Quality
  fixType: 'rtk',
  satellites: 19,
  hdop: 0.72,
  horizontalAccuracyM: 0.08,
  verticalAccuracyM: 0.12,
  
  // Power & Airframe
  airframe: 'AERIS-X1',
  flightMode: 'SURVEY',
  armStatus: 'ARMED',
  batteryPercent: 78,
  batteryVoltageV: 22.8,
  batteryCurrentA: 15.4,
  batteryRemainingMin: 31,
  linkQualityPercent: 98,
  latencyMs: 42,
  
  // Camera Sensor
  cameraName: '4K SURVEY SENSOR',
  resolution: '3840 × 2160',
  frameRateFps: 30,
  currentFrame: 1842,
  keyframesCount: 1127,
  exposure: '1/500',
  iso: 200,
  focusState: 'LOCKED',
  storagePercent: 62,
  cameraState: 'recording',
  
  // Reconstruction Pipeline Integration
  currentStageNumber: 4,
  currentStageName: 'STAGE 4 — METRIC DEPTH',
  reconstructionProgressPercent: 72,
  
  // Mission Progress
  elapsedTimeString: '00:37:42',
  estRemainingTimeString: '00:18:15',
  flightProgressPercent: 67,
  surveyCoveragePercent: 71,
};

// Lawnmower Survey Trajectory
const BASE_LAT = 22.5726;
const BASE_LON = 88.3639;

export const SURVEY_WAYPOINTS: MapWaypoint[] = [
  { seq: 0, lat: BASE_LAT - 0.004, lon: BASE_LON - 0.008, alt: 124.6, isCompleted: true },
  { seq: 1, lat: BASE_LAT - 0.004, lon: BASE_LON + 0.008, alt: 124.6, isCompleted: true },
  { seq: 2, lat: BASE_LAT - 0.002, lon: BASE_LON + 0.008, alt: 124.6, isCompleted: true },
  { seq: 3, lat: BASE_LAT - 0.002, lon: BASE_LON - 0.008, alt: 124.6, isCompleted: true },
  { seq: 4, lat: BASE_LAT,         lon: BASE_LON - 0.008, alt: 124.6, isCompleted: true },
  { seq: 5, lat: BASE_LAT,         lon: BASE_LON + 0.008, alt: 124.6, isCompleted: false }, // current
  { seq: 6, lat: BASE_LAT + 0.002, lon: BASE_LON + 0.008, alt: 124.6, isCompleted: false },
  { seq: 7, lat: BASE_LAT + 0.002, lon: BASE_LON - 0.008, alt: 124.6, isCompleted: false },
  { seq: 8, lat: BASE_LAT + 0.004, lon: BASE_LON - 0.008, alt: 124.6, isCompleted: false },
  { seq: 9, lat: BASE_LAT + 0.004, lon: BASE_LON + 0.008, alt: 124.6, isCompleted: false },
];

export const INITIAL_EVENTS_FEED: TelemetryEvent[] = [
  {
    id: 'evt-006',
    timestamp: '20:37:42',
    severity: 'INFO',
    category: 'GNSS',
    message: 'GNSS RTK FIX RE-ACQUIRED (19 SATELLITES, HDOP 0.72)',
  },
  {
    id: 'evt-005',
    timestamp: '20:37:18',
    severity: 'INFO',
    category: 'CAMERA',
    message: 'KEYFRAME QUALITY CHECK PASSED — SHARPNESS INDEX 98.4',
  },
  {
    id: 'evt-004',
    timestamp: '20:36:51',
    severity: 'INFO',
    category: 'PIPELINE',
    message: 'DYNAMIC OBJECT MASK GENERATED FOR PORT VEHICLE TRAFFIC',
  },
  {
    id: 'evt-003',
    timestamp: '20:36:24',
    severity: 'INFO',
    category: 'CAMERA',
    message: 'KEYFRAME 1842 CAPTURED & STREAMED TO PIPELINE',
  },
  {
    id: 'evt-002',
    timestamp: '20:35:58',
    severity: 'INFO',
    category: 'NAVIGATION',
    message: 'TRAJECTORY CROSS-TRACK DRIFT WITHIN ACCEPTABLE 0.12m LIMIT',
  },
  {
    id: 'evt-001',
    timestamp: '20:34:41',
    severity: 'INFO',
    category: 'AIRFRAME',
    message: 'CAMERA RECORDING CONFIRMED — 4K 30FPS H.265 STREAM',
  },
];

export const INITIAL_SUBSYSTEM_HEALTH: SubsystemHealthItem[] = [
  { id: 'sys-1', name: 'FLIGHT CONTROLLER', status: 'NOMINAL', detail: 'PX4 Autopilot / Cortex M7' },
  { id: 'sys-2', name: 'GNSS / RTK FIX', status: 'NOMINAL', detail: 'Dual-antenna RTK / 19 Sats' },
  { id: 'sys-3', name: 'IMU / ATTITUDE', status: 'NOMINAL', detail: 'Triple-redundant MEMS Gyro' },
  { id: 'sys-4', name: 'BAROMETER', status: 'NOMINAL', detail: 'Calibrated AGL Pressure Sensor' },
  { id: 'sys-5', name: 'CAMERA SENSOR', status: 'NOMINAL', detail: '4K Recording @ 30 FPS' },
  { id: 'sys-6', name: 'ONBOARD STORAGE', status: 'NOMINAL', detail: '62% Used (158 GB / 256 GB)' },
  { id: 'sys-7', name: 'COMMUNICATION LINK', status: 'NOMINAL', detail: '98% Signal Strength / 42ms' },
  { id: 'sys-8', name: 'RECONSTRUCTION PIPELINE', status: 'NOMINAL', detail: 'Stage 4 Metric Depth Active' },
  { id: 'sys-9', name: 'OBJECT STORAGE', status: 'NOMINAL', detail: 'S3/GCS Telemetry Sink Connected' },
];

export const INITIAL_HISTORY_TREND: TelemetryHistoryPoint[] = Array.from({ length: 12 }).map((_, i) => ({
  timeLabel: `-${(11 - i) * 5}s`,
  altitude: 122 + Math.sin(i * 0.5) * 3,
  speed: 11.5 + Math.cos(i * 0.4) * 0.8,
  battery: 80 - i * 0.15,
  satellites: 18 + (i % 2),
}));
