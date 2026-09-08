// ============================================================
// AERIS — Reconstruction Feature Types
// ============================================================

export type VisualizationMode =
  | 'realistic'
  | 'pointcloud'
  | 'wireframe'
  | 'depth'
  | 'classified';

export type FrameInspectorMode = 'rgb' | 'depth' | 'confidence';

export interface ReconstructionMetrics {
  coveragePct: number;
  gsdCm: number;
  cameraPoses: number;
  registeredFrames: number;
  totalFrames: number;
  sparsePointsM: number;    // millions
  densePointsM: number;     // millions
  meshTrianglesM: number;   // millions
  reprojectionErrorPx: number;
}

export interface StageMetrics {
  gpuModel: string;
  gpuUtilizationPct: number;
  vramUsedGB: number;
  vramTotalGB: number;
  throughputFps: number;
  startedAt: string;
  estimatedRemainingMs: number;
  framesProcessed: number;
  framesTotal: number;
}

export interface ReconstructionState {
  // Viewport
  vizMode: VisualizationMode;
  showGrid: boolean;
  showTrajectory: boolean;
  showSurveyBoundary: boolean;
  showPointCloud: boolean;
  showCameraPoses: boolean;

  // Video panel
  isPlaying: boolean;
  currentFrame: number;
  totalFrames: number;
  fps: number;

  // Frame inspector
  frameInspectorMode: FrameInspectorMode;

  // Active stage (from pipeline)
  activeStageId: string | null;
}
