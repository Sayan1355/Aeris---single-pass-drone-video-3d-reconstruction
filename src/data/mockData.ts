// ============================================================
// AERIS — Mock Data Layer
// All data is replaceable by real API service calls
// ============================================================

import type { Mission, TelemetrySnapshot, PipelineStage, SystemStatus, Operator } from '../types';

// ---- Active Operator ----------------------------------------

export const MOCK_OPERATOR: Operator = {
  id: 'op-001',
  name: 'A. Mehta',
  role: 'Mission Operator',
  avatarInitials: 'AM',
};

// ---- Active Mission ----------------------------------------

export const MOCK_ACTIVE_MISSION: Mission = {
  id: 'msn-2024-0842',
  name: 'MISSION-0842',
  site: 'Rann of Kutch — Survey Zone 4C',
  status: 'processing',
  createdAt: '2024-11-15T08:30:00Z',
  updatedAt: '2024-11-15T11:47:00Z',
  operator: 'op-001',
  droneId: 'UAV-DJI-M30T-07',
  progress: 67,
};

// ---- Mission List ----------------------------------------

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'msn-2024-0842',
    name: 'MISSION-0842',
    site: 'Rann of Kutch — Zone 4C',
    status: 'processing',
    createdAt: '2024-11-15T08:30:00Z',
    updatedAt: '2024-11-15T11:47:00Z',
    operator: 'op-001',
    droneId: 'UAV-DJI-M30T-07',
    progress: 67,
  },
  {
    id: 'msn-2024-0841',
    name: 'MISSION-0841',
    site: 'Amaravati Urban Development Corridor',
    status: 'completed',
    createdAt: '2024-11-14T06:00:00Z',
    updatedAt: '2024-11-14T14:22:00Z',
    operator: 'op-001',
    droneId: 'UAV-DJI-M30T-05',
  },
  {
    id: 'msn-2024-0840',
    name: 'MISSION-0840',
    site: 'Kedarnath Post-Flood Survey',
    status: 'completed',
    createdAt: '2024-11-13T07:15:00Z',
    updatedAt: '2024-11-13T18:45:00Z',
    operator: 'op-002',
    droneId: 'UAV-DJI-M30T-03',
  },
  {
    id: 'msn-2024-0839',
    name: 'MISSION-0839',
    site: 'NHPC Teesta Dam Inspection',
    status: 'failed',
    createdAt: '2024-11-12T09:00:00Z',
    updatedAt: '2024-11-12T10:32:00Z',
    operator: 'op-003',
    droneId: 'UAV-DJI-M30T-01',
  },
  {
    id: 'msn-2024-0838',
    name: 'MISSION-0838',
    site: 'Bhubaneswar Industrial Zone B',
    status: 'completed',
    createdAt: '2024-11-11T05:30:00Z',
    updatedAt: '2024-11-11T16:10:00Z',
    operator: 'op-001',
    droneId: 'UAV-DJI-M30T-07',
  },
];

// ---- Live Telemetry ----------------------------------------

export const MOCK_TELEMETRY: TelemetrySnapshot = {
  timestamp: new Date().toISOString(),
  latitude: 23.8765,
  longitude: 70.4321,
  altitude: 142.5,
  speed: 8.3,
  heading: 274,
  pitch: -2.1,
  roll: 0.8,
  batteryPercent: 58,
  gpsFixType: 'rtk',
  satelliteCount: 22,
  signalStrength: 94,
};

// ---- Pipeline Stages ----------------------------------------

export const MOCK_PIPELINE_STAGES: PipelineStage[] = [
  { id: 'frame-curation',  order: 1, name: 'Frame Curation',      shortLabel: 'FRAMES', status: 'completed', progress: 100, durationMs: 124000 },
  { id: 'pose-estimation', order: 2, name: 'Pose Estimation',      shortLabel: 'POSE',   status: 'completed', progress: 100, durationMs: 298000 },
  { id: 'dynamic-masking', order: 3, name: 'Dynamic Masking',      shortLabel: 'MASK',   status: 'completed', progress: 100, durationMs: 87000  },
  { id: 'metric-depth',    order: 4, name: 'Metric Depth',         shortLabel: 'DEPTH',  status: 'completed', progress: 100, durationMs: 356000 },
  { id: 'reconstruction',  order: 5, name: '3DGS & Dense Recon.',  shortLabel: '3DGS',   status: 'running',   progress: 67  },
  { id: 'surface-meshing', order: 6, name: 'Surface Meshing',      shortLabel: 'MESH',   status: 'pending'  },
  { id: 'georeferencing',  order: 7, name: 'Georeferencing',       shortLabel: 'GEO',    status: 'pending'  },
  { id: 'export',          order: 8, name: 'Texturing & Export',   shortLabel: 'EXPORT', status: 'pending'  },
];

// ---- System Status ----------------------------------------

export const MOCK_SYSTEM_STATUS: SystemStatus = {
  api:        'connected',
  telemetry:  'connected',
  gps:        'connected',
  rtk:        'connected',
  processing: 'connected',
};
