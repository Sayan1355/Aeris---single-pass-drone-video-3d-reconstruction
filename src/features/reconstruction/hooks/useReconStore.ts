// ============================================================
// AERIS — Reconstruction Feature Zustand Store
// Local state for the reconstruction workstation UI
// ============================================================

import { create } from 'zustand';
import type { ReconstructionState, VisualizationMode, FrameInspectorMode } from '../types';

interface ReconstructionStore extends ReconstructionState {
  setVizMode: (mode: VisualizationMode) => void;
  toggleGrid: () => void;
  toggleTrajectory: () => void;
  toggleSurveyBoundary: () => void;
  togglePointCloud: () => void;
  toggleCameraPoses: () => void;
  setPlaying: (v: boolean) => void;
  togglePlaying: () => void;
  setCurrentFrame: (f: number) => void;
  stepFrame: (delta: number) => void;
  setFrameInspectorMode: (m: FrameInspectorMode) => void;
  setActiveStageId: (id: string | null) => void;
}

export const useReconStore = create<ReconstructionStore>((set) => ({
  // Viewport defaults
  vizMode: 'realistic',
  showGrid: true,
  showTrajectory: true,
  showSurveyBoundary: true,
  showPointCloud: false,
  showCameraPoses: false,

  // Video panel defaults
  isPlaying: false,
  currentFrame: 12842,
  totalFrames: 18400,
  fps: 30,

  // Frame inspector
  frameInspectorMode: 'rgb',

  // Active stage
  activeStageId: 'reconstruction',

  // Actions
  setVizMode: (mode) => set({ vizMode: mode }),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleTrajectory: () => set((s) => ({ showTrajectory: !s.showTrajectory })),
  toggleSurveyBoundary: () => set((s) => ({ showSurveyBoundary: !s.showSurveyBoundary })),
  togglePointCloud: () => set((s) => ({ showPointCloud: !s.showPointCloud })),
  toggleCameraPoses: () => set((s) => ({ showCameraPoses: !s.showCameraPoses })),
  setPlaying: (v) => set({ isPlaying: v }),
  togglePlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setCurrentFrame: (f) => set((s) => ({ currentFrame: Math.max(0, Math.min(s.totalFrames, f)) })),
  stepFrame: (delta) => set((s) => ({
    currentFrame: Math.max(0, Math.min(s.totalFrames, s.currentFrame + delta)),
  })),
  setFrameInspectorMode: (m) => set({ frameInspectorMode: m }),
  setActiveStageId: (id) => set({ activeStageId: id }),
}));
