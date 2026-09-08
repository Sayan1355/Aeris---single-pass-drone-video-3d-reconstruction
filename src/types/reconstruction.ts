// ============================================================
// AERIS — Reconstruction Types
// ============================================================

export type PipelineStageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface PipelineStage {
  id: string;
  order: number;
  name: string;
  shortLabel: string;
  description: string;
  status: PipelineStageStatus;
  progress?: number;       // 0–100 (only while running)
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  outputSummary?: string;  // e.g. "4,821 frames accepted"
}

// Canonical ordered list — status is separate (mock / API)
export const PIPELINE_STAGE_DEFS: Omit<PipelineStage, 'status' | 'progress' | 'startedAt' | 'completedAt' | 'durationMs' | 'outputSummary'>[] = [
  {
    id: 'frame-curation',
    order: 1,
    name: 'Frame Curation',
    shortLabel: 'FRAMES',
    description: 'Select, sort, and quality-filter video frames for reconstruction.',
  },
  {
    id: 'pose-estimation',
    order: 2,
    name: 'Pose Estimation',
    shortLabel: 'POSE',
    description: 'Estimate camera positions using structure-from-motion (SfM).',
  },
  {
    id: 'dynamic-masking',
    order: 3,
    name: 'Dynamic Masking',
    shortLabel: 'MASK',
    description: 'Detect and mask dynamic objects that degrade reconstruction quality.',
  },
  {
    id: 'metric-depth',
    order: 4,
    name: 'Metric Depth',
    shortLabel: 'DEPTH',
    description: 'Compute per-frame metric depth maps from monocular video.',
  },
  {
    id: 'reconstruction',
    order: 5,
    name: '3DGS & Dense Reconstruction',
    shortLabel: '3DGS',
    description: '3D Gaussian Splatting and dense point cloud generation.',
  },
  {
    id: 'surface-meshing',
    order: 6,
    name: 'Surface Meshing',
    shortLabel: 'MESH',
    description: 'Convert point cloud to watertight triangle mesh.',
  },
  {
    id: 'georeferencing',
    order: 7,
    name: 'Georeferencing',
    shortLabel: 'GEO',
    description: 'Align model to real-world coordinate reference system using GCPs.',
  },
  {
    id: 'export',
    order: 8,
    name: 'Texturing & Export',
    shortLabel: 'EXPORT',
    description: 'Apply photorealistic textures and export OBJ, LAS, GeoTIFF products.',
  },
];
