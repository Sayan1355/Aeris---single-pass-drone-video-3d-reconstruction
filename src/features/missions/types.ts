// ============================================================
// AERIS — Missions Module Data Types
// ============================================================

export type MissionStatus =
  | 'ACTIVE'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'QUEUED'
  | 'DRAFT';

export type MissionPlatform =
  | 'UAV-DJI-M30T-07'
  | 'UAV-DJI-M350-01'
  | 'UAV-DJI-M350-02'
  | 'UAV-DJI-M30T-03'
  | 'UAV-AUTEL-EVO2'
  | 'UAV-WINGTRA-ONE';

export interface MissionRecord {
  id: string;
  name: string;
  status: MissionStatus;
  location: string;
  coordinates: string;
  platform: string;
  captureDate: string;
  areaHa: number;
  gsdCmPx: number;
  progressPct: number;
  qualityScore: number | null;
  frameCount: number;
  totalFrames: number;
  currentStage: string;
  altitudeM: number;
  flightDurationMin: number;
  cameraModel: string;
  gnssMode: string;
  rtkStatus: 'FIXED' | 'FLOAT' | 'SINGLE' | 'N/A';
  createdAt: string;
  updatedAt: string;
}

export interface NewMissionFormData {
  id: string;
  name: string;
  location: string;
  areaHa: number;
  platform: string;
  videoSource: string;
  gpsSource: string;
  cameraModel: string;
  expectedGsd: number;
  hasImu: boolean;
  hasBaro: boolean;
  hasRtk: boolean;
  hasIntrinsics: boolean;
}
