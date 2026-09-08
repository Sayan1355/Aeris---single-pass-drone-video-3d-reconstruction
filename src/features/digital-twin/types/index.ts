// ============================================================
// AERIS — 3D Digital Twin Feature Types
// ============================================================

export type TwinViewMode =
  | 'realistic'
  | 'pointcloud'
  | 'wireframe'
  | 'elevation'
  | 'classified';

export type MeasurementType = 'none' | 'distance' | 'area' | 'elevation';

export interface TwinLayerState {
  mesh: boolean;
  pointCloud: boolean;
  trajectory: boolean;
  cameraPoses: boolean;
  surveyBoundary: boolean;
  terrain: boolean;
  dsm: boolean;
  orthomosaic: boolean;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface MeasurementPoint {
  id: string;
  position: Vector3D;
  label?: string;
}

export interface MeasurementResult {
  id: string;
  type: MeasurementType;
  points: Vector3D[];
  value: number;        // distance in meters, area in sq meters, height delta in meters
  formattedValue: string;
}

export interface FeatureMetadata {
  id: string;
  name: string;
  type: 'Building' | 'Infrastructure' | 'Terrain' | 'Vegetation' | 'Solar Array' | 'Road';
  latitude: number;
  longitude: number;
  elevationM: number;
  dimensions: { widthM: number; heightM: number; depthM: number };
  confidencePct: number;
  assetType: '3D Tiles' | 'glTF 2.0' | 'Gaussian Splat' | 'LAS Point Cloud' | 'GeoTIFF Ortho';
  reconstructionStatus: 'Completed' | 'Processing' | 'Pending';
  surfaceAreaM2?: number;
  volumeM3?: number;
  trianglesCount?: number;
  gsdCm?: number;
}

export interface DigitalTwinState {
  viewMode: TwinViewMode;
  layers: TwinLayerState;
  measurementMode: MeasurementType;
  measurementPoints: Vector3D[];
  completedMeasurements: MeasurementResult[];
  selectedFeature: FeatureMetadata | null;
  timelineProgress: number; // 0 to 100%
  isPlaying: boolean;
}
