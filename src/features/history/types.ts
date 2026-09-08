// ============================================================
// AERIS — Phase 9 Mission History / Archive Data Types
// ============================================================

export type MissionArchiveStatus = 'COMPLETED' | 'PROCESSING' | 'FAILED' | 'ARCHIVED';
export type MissionTypeOption = 'Survey' | 'Inspection' | 'Mapping' | 'Reconnaissance';
export type QaStatusOption = 'PASSED' | 'FAILED' | 'IN REVIEW';

export interface MissionTimelineStep {
  stageName: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
}

export interface MissionArchiveRecord {
  id: string; // e.g. 'AERIS-MSN-0247'
  date: string; // '08 SEP 2026'
  rawDate: string; // '2026-09-08'
  siteName: string; // 'Industrial Harbor Facility'
  locationCoordinates: string; // '22.5726° N, 88.3639° E'
  lat: number;
  lon: number;
  missionType: MissionTypeOption;
  status: MissionArchiveStatus;
  durationString: string; // '00:55:17'
  areaHa: number; // 12.8
  flightDistanceKm: number; // 7.13
  altitudeAglM: number; // 124.6
  videoResolution: string; // '4K / 30 FPS'
  keyframesCount: number; // 1842
  qualityScore: number; // 92.6
  reconstructionStatus: 'COMPLETE' | 'IN PROGRESS' | 'FAILED';
  productCount: number; // 8
  qaStatus: QaStatusOption;
  crs: string; // 'EPSG:32643'
  isFeatured?: boolean;
  description: string;
  timeline: MissionTimelineStep[];
}

export interface MissionHistorySummary {
  totalMissions: number; // 24
  completedCount: number; // 21
  processingCount: number; // 1
  failedCount: number; // 2
  archivedCount: number; // 18
  totalDistanceKm: number; // 148.6
  totalAreaHa: number; // 426.8
  totalKeyframes: number; // 31482
  avgQualityScore: number; // 89.7
  successRatePercent: number; // 87.5
  totalProductsGenerated: number; // 192
  lastMissionId: string; // 'AERIS-MSN-0247'
}

export interface HistoryFilterState {
  searchQuery: string;
  statusFilter: 'ALL' | MissionArchiveStatus;
  typeFilter: 'ALL' | MissionTypeOption;
  dateFilter: 'ALL' | 'today' | '7days' | '30days';
  qualityFilter: 'ALL' | '90+' | '80+' | '70+';
}

export interface QualityTrendPoint {
  missionId: string;
  qualityScore: number;
  dateLabel: string;
}
