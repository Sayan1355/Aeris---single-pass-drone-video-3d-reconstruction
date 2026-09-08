// ============================================================
// AERIS — Mission Types
// ============================================================

export type MissionStatus =
  | 'idle'
  | 'planning'
  | 'queued'
  | 'active'
  | 'processing'
  | 'completed'
  | 'failed';

export interface Mission {
  id: string;
  name: string;
  site: string;
  status: MissionStatus;
  operator: string;
  droneId: string;
  createdAt: string;   // ISO 8601
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  progress?: number;      // 0–100 for processing/pipeline
  // Spatial
  coverageHa?: number;    // hectares
  altitudeM?: number;     // meters AGL
  overlapPct?: number;    // sidelap %
  // Output quality
  gsdCm?: number;         // ground sample distance cm/px
  framesTotal?: number;
  framesProcessed?: number;
  // Notes
  description?: string;
}

export interface MissionSummaryStats {
  activeMissions: number;
  completedToday: number;
  totalMissions: number;
  dataIngestedGB: number;
  modelsGenerated: number;
  avgGsdCm: number;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  missionId?: string;
}
