// ============================================================
// AERIS — Core TypeScript Types
// UAV Reconstruction System
// ============================================================

export type NavSection = 'primary' | 'secondary';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string; // Phosphor icon name
  section: NavSection;
  badge?: string | number;
}

// --- Mission ---

export type MissionStatus = 'idle' | 'planning' | 'active' | 'processing' | 'completed' | 'failed';

export interface Mission {
  id: string;
  name: string;
  site: string;
  status: MissionStatus;
  createdAt: string; // ISO 8601
  updatedAt: string;
  operator: string;
  droneId: string;
  progress?: number; // 0-100 for processing/pipeline
}

// --- Telemetry ---

export interface TelemetrySnapshot {
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;  // meters AGL
  speed: number;     // m/s
  heading: number;   // degrees
  pitch: number;     // degrees
  roll: number;      // degrees
  batteryPercent: number;
  gpsFixType: 'none' | 'fix2d' | 'fix3d' | 'rtk';
  satelliteCount: number;
  signalStrength: number; // 0-100
}

// --- Pipeline ---

export type PipelineStageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface PipelineStage {
  id: string;
  order: number;
  name: string;
  shortLabel: string;
  status: PipelineStageStatus;
  progress?: number; // 0-100
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  details?: string;
}

export const PIPELINE_STAGES: Omit<PipelineStage, 'status' | 'progress'>[] = [
  { id: 'frame-curation',   order: 1, name: 'Frame Curation',       shortLabel: 'FRAMES'  },
  { id: 'pose-estimation',  order: 2, name: 'Pose Estimation',       shortLabel: 'POSE'    },
  { id: 'dynamic-masking',  order: 3, name: 'Dynamic Masking',       shortLabel: 'MASK'    },
  { id: 'metric-depth',     order: 4, name: 'Metric Depth',          shortLabel: 'DEPTH'   },
  { id: 'reconstruction',   order: 5, name: '3DGS & Dense Recon.',   shortLabel: '3DGS'    },
  { id: 'surface-meshing',  order: 6, name: 'Surface Meshing',       shortLabel: 'MESH'    },
  { id: 'georeferencing',   order: 7, name: 'Georeferencing',        shortLabel: 'GEO'     },
  { id: 'export',           order: 8, name: 'Texturing & Export',    shortLabel: 'EXPORT'  },
];

// --- System Status ---

export type ConnectionState = 'connected' | 'connecting' | 'degraded' | 'disconnected';

export interface SystemStatus {
  api: ConnectionState;
  telemetry: ConnectionState;
  gps: ConnectionState;
  rtk: ConnectionState;
  processing: ConnectionState;
}

// --- Operator ---

export interface Operator {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
}
