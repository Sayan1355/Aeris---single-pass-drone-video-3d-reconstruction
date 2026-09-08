// ============================================================
// AERIS — Phase 10 Settings / System Configuration Types
// ============================================================

export type SettingsSectionId =
  | 'general'
  | 'reconstruction'
  | 'visualization'
  | 'telemetry'
  | 'storage'
  | 'interface'
  | 'system'
  | 'shortcuts'
  | 'about';

export type DistanceUnit = 'METRIC' | 'IMPERIAL';
export type ElevationUnit = 'METERS' | 'FEET';
export type TimeFormat = '24H' | '12H' | 'UTC';

export type QualityPreset = 'HIGH' | 'BALANCED' | 'FAST';
export type FrameSamplingMode = 'KEYFRAME_ADAPTIVE' | 'UNIFORM_1FPS' | 'FULL_30FPS';
export type VisualizationMode = 'POINT_CLOUD' | 'MESH' | 'DSM';
export type GeoreferencingMode = 'GCP_GPS' | 'DIRECT_GEO';

export type ViewportMode = 'CESIUM_3D' | 'THREE_MESH' | 'SPLIT';
export type AntialiasingMode = 'FXAA' | 'MSAA_4X' | 'OFF';
export type RenderingQuality = 'ULTRA' | 'HIGH' | 'MEDIUM';

export type TelemetryRefreshRate = '100MS' | '250MS' | '500MS' | '1000MS';
export type PointCloudExportFormat = '.LAS' | '.LAZ' | '.PLY';
export type RasterExportFormat = '.GeoTIFF' | '.PNG';
export type CompressionPreference = 'LZW' | 'DEFLATE' | 'NONE';

export type SystemStatusState = 'ONLINE' | 'READY' | 'DEGRADED';

export interface GeneralSettings {
  defaultMissionMode: string;
  crs: string;
  distanceUnit: DistanceUnit;
  elevationUnit: ElevationUnit;
  timeFormat: TimeFormat;
  autoSaveConfig: boolean;
  confirmDestructiveActions: boolean;
  operatorDisplayName: string;
}

export interface ReconstructionSettings {
  defaultQuality: QualityPreset;
  frameSamplingMode: FrameSamplingMode;
  defaultVizMode: VisualizationMode;
  dynamicObjectMasking: boolean;
  densePointCloudGeneration: boolean;
  textureGeneration: boolean;
  autoQaValidation: boolean;
  georeferencingMode: GeoreferencingMode;
  defaultGsdTargetCmPx: number;
}

export interface VisualizationSettings {
  viewportMode: ViewportMode;
  showFlightTrajectory: boolean;
  showCameraPoses: boolean;
  showSurveyBoundary: boolean;
  showPointCloud: boolean;
  showDsmGrid: boolean;
  showTerrainMesh: boolean;
  antialiasing: AntialiasingMode;
  animationQuality: RenderingQuality;
  renderingQuality: RenderingQuality;
}

export interface TelemetrySettings {
  refreshRate: TelemetryRefreshRate;
  positionUpdateFrequencyHz: number;
  chartHistoryDurationSec: number;
  showSimulatedTelemetry: boolean;
  autoCenterUav: boolean;
  showEventNotifications: boolean;
  gnssWarningThresholdSatellites: number;
  batteryWarningThresholdPercent: number;
}

export interface StorageSettings {
  objectStorageStatus: string;
  localCacheUsedGB: number;
  localCacheMaxGB: number;
  productRetentionDays: number;
  defaultExportCrs: string;
  defaultPointCloudFormat: PointCloudExportFormat;
  defaultRasterFormat: RasterExportFormat;
  compressionPreference: CompressionPreference;
  autoProductValidation: boolean;
}

export interface InterfaceSettings {
  densityMode: 'COMPACT' | 'COMFORTABLE';
  sidebarBehavior: 'COLLAPSIBLE' | 'ALWAYS_EXPANDED';
  showTechnicalLabels: boolean;
  animationPreference: boolean;
  reducedMotion: boolean;
  gridVisibility: boolean;
  tooltipsEnabled: boolean;
  confirmationDialogs: boolean;
}

export interface AerisSettings {
  general: GeneralSettings;
  reconstruction: ReconstructionSettings;
  visualization: VisualizationSettings;
  telemetry: TelemetrySettings;
  storage: StorageSettings;
  interface: InterfaceSettings;
}

export interface SystemHealthItem {
  id: string;
  name: string;
  subsystem: string;
  status: SystemStatusState;
  latencyMs?: number;
  details: string;
}

export interface KeyboardShortcutItem {
  key: string;
  label: string;
  description: string;
  category: string;
}
