// ============================================================
// AERIS — 3D Digital Twin Zustand Store
// State for view modes, layers, 3D measurements, selection, and timeline
// ============================================================

import { create } from 'zustand';
import type {
  DigitalTwinState,
  TwinViewMode,
  TwinLayerState,
  MeasurementType,
  Vector3D,
  MeasurementResult,
  FeatureMetadata,
} from '../types';
import { MOCK_TWIN_FEATURES } from '../data';

interface DigitalTwinActions {
  setViewMode: (mode: TwinViewMode) => void;
  toggleLayer: (layerKey: keyof TwinLayerState) => void;
  setMeasurementMode: (mode: MeasurementType) => void;
  addMeasurementPoint: (pt: Vector3D) => void;
  clearMeasurements: () => void;
  setSelectedFeature: (feature: FeatureMetadata | null) => void;
  setTimelineProgress: (pct: number) => void;
  togglePlaying: () => void;
  setPlaying: (v: boolean) => void;
}

export const useDigitalTwinStore = create<DigitalTwinState & DigitalTwinActions>((set, get) => ({
  // View mode
  viewMode: 'realistic',

  // Layer toggles
  layers: {
    mesh: true,
    pointCloud: true,
    trajectory: true,
    cameraPoses: true,
    surveyBoundary: true,
    terrain: true,
    dsm: false,
    orthomosaic: false,
  },

  // Measurement
  measurementMode: 'none',
  measurementPoints: [],
  completedMeasurements: [],

  // Selection
  selectedFeature: MOCK_TWIN_FEATURES[0], // default select high-rise tower

  // Timeline
  timelineProgress: 65, // 65% through mission
  isPlaying: false,

  // Actions
  setViewMode: (mode) => set({ viewMode: mode }),

  toggleLayer: (key) =>
    set((s) => ({
      layers: { ...s.layers, [key]: !s.layers[key] },
    })),

  setMeasurementMode: (mode) =>
    set({
      measurementMode: mode,
      measurementPoints: [],
    }),

  addMeasurementPoint: (pt) => {
    const { measurementMode, measurementPoints, completedMeasurements } = get();
    if (measurementMode === 'none') return;

    const newPts = [...measurementPoints, pt];

    // Check if measurement is complete based on mode
    if (measurementMode === 'distance' && newPts.length === 2) {
      const p1 = newPts[0], p2 = newPts[1];
      const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2);
      const res: MeasurementResult = {
        id: `meas-${Date.now()}`,
        type: 'distance',
        points: newPts,
        value: dist,
        formattedValue: `${dist.toFixed(2)} m`,
      };
      set({
        completedMeasurements: [...completedMeasurements, res],
        measurementPoints: [],
      });
    } else if (measurementMode === 'elevation' && newPts.length === 2) {
      const p1 = newPts[0], p2 = newPts[1];
      const hDelta = Math.abs(p2.y - p1.y);
      const res: MeasurementResult = {
        id: `meas-${Date.now()}`,
        type: 'elevation',
        points: newPts,
        value: hDelta,
        formattedValue: `Δ ${hDelta.toFixed(2)} m AGL`,
      };
      set({
        completedMeasurements: [...completedMeasurements, res],
        measurementPoints: [],
      });
    } else if (measurementMode === 'area' && newPts.length === 3) {
      // Triangle area approx
      const a = newPts[0], b = newPts[1], c = newPts[2];
      const ab = { x: b.x - a.x, z: b.z - a.z };
      const ac = { x: c.x - a.x, z: c.z - a.z };
      const area = Math.abs((ab.x * ac.z - ab.z * ac.x) / 2);
      const res: MeasurementResult = {
        id: `meas-${Date.now()}`,
        type: 'area',
        points: newPts,
        value: area,
        formattedValue: `${area.toFixed(1)} m²`,
      };
      set({
        completedMeasurements: [...completedMeasurements, res],
        measurementPoints: [],
      });
    } else {
      set({ measurementPoints: newPts });
    }
  },

  clearMeasurements: () =>
    set({
      measurementPoints: [],
      completedMeasurements: [],
      measurementMode: 'none',
    }),

  setSelectedFeature: (feature) => set({ selectedFeature: feature }),

  setTimelineProgress: (pct) => set({ timelineProgress: Math.max(0, Math.min(100, pct)) }),

  togglePlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setPlaying: (v) => set({ isPlaying: v }),
}));
