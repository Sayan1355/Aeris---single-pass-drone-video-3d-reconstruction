// ============================================================
// AERIS — Geospatial Intelligence Feature Types
// ============================================================

export type MapVizMode = 'satellite' | 'elevation' | 'coverage' | 'classified';

export type MapMeasurementMode = 'none' | 'distance' | 'area' | 'elevation';

export interface GeospatialLayerState {
  trajectory: boolean;
  cameraPoses: boolean;
  surveyBoundary: boolean;
  coverage: boolean;
  orthomosaic: boolean;
  dsm: boolean;
  dtm: boolean;
  reconstruction3D: boolean;
  pointCloud: boolean;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
  elevationM: number;
}

export interface MapMeasurementResult {
  id: string;
  type: MapMeasurementMode;
  points: GeoPoint[];
  value: number;
  formattedValue: string;
}

export interface GeoFeatureMetadata {
  id: string;
  name: string;
  type: 'Survey Boundary' | 'Camera Pose' | 'GCP Anchor' | 'Orthomosaic Sector' | 'Coverage Zone';
  latitude: number;
  longitude: number;
  elevationM: number;
  confidencePct: number;
  assetType: 'GeoTIFF' | 'Cesium 3D Tiles' | 'CZML Trajectory' | 'Shapefile Boundary';
  captureTime: string;
  details?: Record<string, string | number>;
}

export interface FlightAnalysisMetrics {
  totalDistanceKm: number;
  durationMs: number;
  avgAltitudeM: number;
  maxAltitudeM: number;
  avgSpeedMs: number;
  maxSpeedMs: number;
  cameraPosesCount: number;
  registeredFramesCount: number;
}

export interface CoverageMetrics {
  coveragePct: number;
  coveredAreaHa: number;
  uncoveredAreaHa: number;
}

export interface TerrainElevationMetrics {
  minElevationM: number;
  maxElevationM: number;
  meanElevationM: number;
  reliefM: number;
}

export interface CrsInformation {
  crsName: string;
  datum: string;
  projection: string;
  utmZone: string;
  units: string;
}

export interface ElevationProfilePoint {
  distKm: number;
  elevationM: number;
  uavAltM: number;
}

export interface GeospatialState {
  vizMode: MapVizMode;
  layers: GeospatialLayerState;
  measurementMode: MapMeasurementMode;
  activePoints: GeoPoint[];
  measurements: MapMeasurementResult[];
  selectedFeature: GeoFeatureMetadata | null;
  timelineProgress: number; // 0–100%
  isPlaying: boolean;
  cursorCoordinate: { lat: number; lon: number; elev: number } | null;
}
