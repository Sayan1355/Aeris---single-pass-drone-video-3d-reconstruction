// ============================================================
// AERIS — Geospatial Intelligence Mock Data
// Georeferenced Rann of Kutch Mission (Zone 4C) data
// ============================================================

import type {
  GeoFeatureMetadata,
  FlightAnalysisMetrics,
  CoverageMetrics,
  TerrainElevationMetrics,
  CrsInformation,
  ElevationProfilePoint,
  GeoPoint,
} from '../types';

export const MOCK_MISSION_CENTER: GeoPoint = {
  latitude: 23.8765,
  longitude: 70.4321,
  elevationM: 18.2,
};

export const MOCK_FLIGHT_METRICS: FlightAnalysisMetrics = {
  totalDistanceKm: 14.2,
  durationMs: 514000, // 8m 34s
  avgAltitudeM: 124.6,
  maxAltitudeM: 142.0,
  avgSpeedMs: 12.4,
  maxSpeedMs: 18.5,
  cameraPosesCount: 4821,
  registeredFramesCount: 12842,
};

export const MOCK_COVERAGE_METRICS: CoverageMetrics = {
  coveragePct: 72.4,
  coveredAreaHa: 312.4,
  uncoveredAreaHa: 118.6,
};

export const MOCK_TERRAIN_METRICS: TerrainElevationMetrics = {
  minElevationM: 4.2,
  maxElevationM: 32.8,
  meanElevationM: 18.5,
  reliefM: 28.6,
};

export const MOCK_CRS_INFO: CrsInformation = {
  crsName: 'WGS 84 / UTM Zone 43N',
  datum: 'WGS 1984',
  projection: 'Transverse Mercator',
  utmZone: 'UTM Zone 43N',
  units: 'Meters',
};

export const MOCK_ELEVATION_PROFILE: ElevationProfilePoint[] = Array.from({ length: 15 }, (_, i) => {
  const distKm = Number((i * 1.0).toFixed(1));
  const elevationM = Number((12 + Math.sin(i * 0.5) * 8 + Math.cos(i * 0.8) * 4).toFixed(1));
  const uavAltM = Number((elevationM + 120 + Math.sin(i * 0.3) * 3).toFixed(1));
  return { distKm, elevationM, uavAltM };
});

export const MOCK_GEO_FEATURES: GeoFeatureMetadata[] = [
  {
    id: 'geo-bnd-01',
    name: 'Survey Zone 4C Primary Boundary Polygon',
    type: 'Survey Boundary',
    latitude: 23.8765,
    longitude: 70.4321,
    elevationM: 18.2,
    confidencePct: 99.4,
    assetType: 'Shapefile Boundary',
    captureTime: '2024-11-15T08:30:00Z',
    details: {
      'Perimeter': '8.4 km',
      'Area': '431.0 ha',
      'GCP Anchors': 5,
    },
  },
  {
    id: 'geo-pose-142',
    name: 'Calibrated Camera Pose #1284',
    type: 'Camera Pose',
    latitude: 23.8778,
    longitude: 70.4335,
    elevationM: 124.6,
    confidencePct: 98.7,
    assetType: 'CZML Trajectory',
    captureTime: '2024-11-15T08:34:12Z',
    details: {
      'Pitch': '-89.2°',
      'Roll': '0.4°',
      'Focal Length': '24 mm',
      'Reprojection Error': '0.38 px',
    },
  },
  {
    id: 'geo-gcp-01',
    name: 'Northwest Ground Control Point GCP-01',
    type: 'GCP Anchor',
    latitude: 23.8795,
    longitude: 70.4285,
    elevationM: 14.8,
    confidencePct: 99.8,
    assetType: 'Shapefile Boundary',
    captureTime: '2024-11-15T08:00:00Z',
    details: {
      'Receiver': 'Trimble R12 RTK',
      'Horiz. Accuracy': '0.8 cm',
      'Vert. Accuracy': '1.2 cm',
    },
  },
  {
    id: 'geo-ortho-01',
    name: 'Central Sector Orthomosaic Tile set',
    type: 'Orthomosaic Sector',
    latitude: 23.8762,
    longitude: 70.4318,
    elevationM: 16.5,
    confidencePct: 97.2,
    assetType: 'GeoTIFF',
    captureTime: '2024-11-15T11:00:00Z',
    details: {
      'Format': 'Cloud-Optimized GeoTIFF',
      'Resolution': '3.2 cm/px',
      'Bands': 'RGB + NIR',
    },
  },
];
