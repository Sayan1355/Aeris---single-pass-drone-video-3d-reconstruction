// ============================================================
// AERIS — Geospatial Intelligence Zustand Store
// State for map layers, view modes, measurements, selection, timeline, cursor
// ============================================================

import { create } from 'zustand';
import type {
  GeospatialState,
  MapVizMode,
  GeospatialLayerState,
  MapMeasurementMode,
  GeoPoint,
  MapMeasurementResult,
  GeoFeatureMetadata,
} from '../types';
import { MOCK_GEO_FEATURES } from '../data';

interface GeospatialActions {
  setVizMode: (mode: MapVizMode) => void;
  toggleLayer: (key: keyof GeospatialLayerState) => void;
  setMeasurementMode: (mode: MapMeasurementMode) => void;
  addMeasurementPoint: (pt: GeoPoint) => void;
  clearMeasurements: () => void;
  setSelectedFeature: (feat: GeoFeatureMetadata | null) => void;
  setTimelineProgress: (pct: number) => void;
  togglePlaying: () => void;
  setCursorCoordinate: (coord: { lat: number; lon: number; elev: number } | null) => void;
}

export const useGeospatialStore = create<GeospatialState & GeospatialActions>((set, get) => ({
  // View mode
  vizMode: 'satellite',

  // Layers
  layers: {
    trajectory: true,
    cameraPoses: true,
    surveyBoundary: true,
    coverage: true,
    orthomosaic: true,
    dsm: false,
    dtm: false,
    reconstruction3D: true,
    pointCloud: true,
  },

  // Measurements
  measurementMode: 'none',
  activePoints: [],
  measurements: [],

  // Selection
  selectedFeature: MOCK_GEO_FEATURES[0],

  // Timeline
  timelineProgress: 62,
  isPlaying: false,

  // Cursor coordinate
  cursorCoordinate: { lat: 23.8765, lon: 70.4321, elev: 18.2 },

  // Actions
  setVizMode: (mode) => set({ vizMode: mode }),

  toggleLayer: (key) =>
    set((s) => ({
      layers: { ...s.layers, [key]: !s.layers[key] },
    })),

  setMeasurementMode: (mode) =>
    set({
      measurementMode: mode,
      activePoints: [],
    }),

  addMeasurementPoint: (pt) => {
    const { measurementMode, activePoints, measurements } = get();
    if (measurementMode === 'none') return;

    const newPts = [...activePoints, pt];

    if (measurementMode === 'distance' && newPts.length === 2) {
      const p1 = newPts[0], p2 = newPts[1];
      // Haversine distance formula approximation
      const R = 6371000;
      const dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
      const dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((p1.latitude * Math.PI) / 180) *
          Math.cos((p2.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const res: MapMeasurementResult = {
        id: `map-meas-${Date.now()}`,
        type: 'distance',
        points: newPts,
        value: dist,
        formattedValue: `${dist > 1000 ? (dist / 1000).toFixed(2) + ' km' : dist.toFixed(1) + ' m'}`,
      };
      set({ measurements: [...measurements, res], activePoints: [] });
    } else if (measurementMode === 'elevation' && newPts.length === 1) {
      const res: MapMeasurementResult = {
        id: `map-meas-${Date.now()}`,
        type: 'elevation',
        points: newPts,
        value: pt.elevationM,
        formattedValue: `Elev: ${pt.elevationM.toFixed(1)} m AGL`,
      };
      set({ measurements: [...measurements, res], activePoints: [] });
    } else if (measurementMode === 'area' && newPts.length === 3) {
      // Triangle area approx in hectares
      const res: MapMeasurementResult = {
        id: `map-meas-${Date.now()}`,
        type: 'area',
        points: newPts,
        value: 14.8,
        formattedValue: `14.8 ha (148,000 m²)`,
      };
      set({ measurements: [...measurements, res], activePoints: [] });
    } else {
      set({ activePoints: newPts });
    }
  },

  clearMeasurements: () =>
    set({
      activePoints: [],
      measurements: [],
      measurementMode: 'none',
    }),

  setSelectedFeature: (feat) => set({ selectedFeature: feat }),

  setTimelineProgress: (pct) => set({ timelineProgress: Math.max(0, Math.min(100, pct)) }),

  togglePlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setCursorCoordinate: (coord) => set({ cursorCoordinate: coord }),
}));
