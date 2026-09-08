// ============================================================
// AERIS — Telemetry Mock Data
// Replace with real WebSocket subscription in missionService
// ============================================================

import type { TelemetrySnapshot, TrajectoryPoint } from '../types/telemetry';

export const MOCK_TELEMETRY: TelemetrySnapshot = {
  timestamp: '2024-11-15T11:47:00Z',
  // Position
  latitude: 23.8765,
  longitude: 70.4321,
  altitude: 142.5,
  altitudeMSL: 261.3,
  // Motion
  speed: 8.3,
  verticalSpeed: 0.0,
  heading: 274,
  // Attitude
  pitch: -2.1,
  roll: 0.8,
  yaw: 274.3,
  // GPS
  gpsFixType: 'rtk',
  satelliteCount: 22,
  hdop: 0.6,
  // Power
  batteryPercent: 58,
  batteryVoltage: 22.4,
  batteryCurrentA: 14.2,
  // Link
  signalStrength: 94,
  latencyMs: 42,
  // Camera
  cameraState: 'recording',
  frameCount: 4821,
  // Waypoint
  waypointIndex: 74,
  waypointTotal: 118,
  distanceToHomeM: 1842,
};

// Flight trajectory — simplified lawnmower survey pattern
// Approx 1 km grid centred on the Rann of Kutch coordinates
// This drives the SVG trajectory visualisation; Cesium will replace it later
const BASE_LAT = 23.8765;
const BASE_LON = 70.4321;

function wp(seq: number, dlat: number, dlon: number, alt = 142.5): TrajectoryPoint {
  return { seq, lat: BASE_LAT + dlat, lon: BASE_LON + dlon, alt };
}

export const MOCK_TRAJECTORY: TrajectoryPoint[] = [
  wp(0,   0.000,  0.000, 0),      // takeoff
  wp(1,   0.000,  0.000, 142.5),  // climb
  wp(2,   0.005, -0.030),
  wp(3,   0.005,  0.030),
  wp(4,   0.002,  0.030),
  wp(5,   0.002, -0.030),
  wp(6,  -0.002, -0.030),
  wp(7,  -0.002,  0.030),
  wp(8,  -0.005,  0.030),
  wp(9,  -0.005, -0.030),
  wp(10, -0.008, -0.030),
  wp(11, -0.008,  0.030),
  wp(12,  0.000,  0.000, 142.5),  // return
  wp(13,  0.000,  0.000, 30),     // descend
  wp(14,  0.000,  0.000, 0),      // land
];

// Current UAV position (index 74 of 118 — mid-survey)
export const MOCK_CURRENT_POSITION: TrajectoryPoint = wp(74, -0.002, 0.012);
