// ============================================================
// AERIS — Reconstruction Feature Mock Data
// ============================================================

import type { ReconstructionMetrics, StageMetrics } from '../types';

export const MOCK_RECON_METRICS: ReconstructionMetrics = {
  coveragePct: 72.4,
  gsdCm: 3.2,
  cameraPoses: 4821,
  registeredFrames: 12842,
  totalFrames: 18400,
  sparsePointsM: 2.8,
  densePointsM: 184.6,
  meshTrianglesM: 12.4,
  reprojectionErrorPx: 0.41,
};

export const MOCK_STAGE_METRICS: StageMetrics = {
  gpuModel: 'NVIDIA RTX A6000',
  gpuUtilizationPct: 87,
  vramUsedGB: 14.2,
  vramTotalGB: 24,
  throughputFps: 38.4,
  startedAt: '2024-11-15T11:22:15Z',
  estimatedRemainingMs: 272000, // ~4m 32s
  framesProcessed: 12842,
  framesTotal: 18400,
};

// Flight trajectory for the camera poses view
// Relative coords — actual Cesium integration later
export const CAMERA_POSES = Array.from({ length: 48 }, (_, i) => {
  const row = Math.floor(i / 8);
  const col = i % 8;
  const x = (col / 7) * 280 + 20;
  const y = (row / 5) * 140 + 20;
  return { x, y, id: `pose-${i}`, accepted: Math.random() > 0.12 };
});
