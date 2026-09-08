// ============================================================
// AERIS — Phase 7 QA / Accuracy & Validation Mock Data
// Centralized scientific evaluation metrics (E-1 through E-8)
// ============================================================

import type {
  QAScoreBreakdown,
  GeoreferencingMetric,
  StructuralAccuracyMetric,
  GeometricFidelityMetric,
  CoverageMetric,
  TextureMetric,
  ArtifactMetric,
  SpatialConfidenceMetric,
  ProcessingPerformanceMetric,
  SensorRobustnessMode,
  AcceptanceTestRow,
} from '../types';

export const MOCK_QA_SCORE: QAScoreBreakdown = {
  overallScore: 92.6,
  maxScore: 100,
  statusText: 'WITHIN ACCEPTANCE THRESHOLD',
  categoryScores: {
    geometry: 94,
    georeference: 91,
    coverage: 96,
    texture: 89,
    confidence: 93,
  },
};

export const MOCK_GEOREFERENCING: GeoreferencingMetric = {
  rmseMeters: 0.42,
  targetRmseMeters: 0.50,
  checkpointsCount: 15,
  status: 'PASS',
};

export const MOCK_STRUCTURAL_ACCURACY: StructuralAccuracyMetric = {
  relativeErrorGsdMultiple: 1.4,
  targetGsdMultiple: 2.0,
  gsdCm: 2.1,
  status: 'PASS',
};

export const MOCK_GEOMETRIC_FIDELITY: GeometricFidelityMetric = {
  chamferDistanceMeters: 0.042,
  targetChamferMeters: 0.080,
  fScore: 0.87,
  targetFScore: 0.80,
  status: 'PASS',
  distributionCurve: [
    { distance: '0.00m', errorDensity: 12 },
    { distance: '0.02m', errorDensity: 48 },
    { distance: '0.04m', errorDensity: 86 },
    { distance: '0.06m', errorDensity: 52 },
    { distance: '0.08m', errorDensity: 18 },
    { distance: '0.10m', errorDensity: 6 },
    { distance: '>0.12m', errorDensity: 2 },
  ],
};

export const MOCK_COVERAGE: CoverageMetric = {
  observableAreaHa: 12.8,
  reconstructedPercent: 96.2,
  unreconstructedPercent: 3.8,
  cellsTotal: 1280,
  cellsReconstructed: 1231,
  cellsGaps: 49,
};

export const MOCK_TEXTURE: TextureMetric = {
  psnrDb: 23.8,
  targetPsnrDb: 20.0,
  ssimIndex: 0.89,
  targetSsimIndex: 0.82,
  status: 'PASS',
};

export const MOCK_ARTIFACTS: ArtifactMetric = {
  maskedCategories: ['Vehicles', 'Pedestrians', 'Moving Cranes', 'Sea Surface Splashes'],
  artifactCountPerKm2: 1.0,
  targetMaxPerKm2: 2.0,
  status: 'PASS',
};

export const MOCK_SPATIAL_CONFIDENCE: SpatialConfidenceMetric = {
  meanConfidencePercent: 93.1,
  lowConfidenceAreaPercent: 2.7,
  primaryCause: 'OCCLUSION / LIMITED MULTI-VIEW RAY INTERSECTION',
};

export const MOCK_PROCESSING_PERFORMANCE: ProcessingPerformanceMetric = {
  keyframesCount: 1842,
  draftProcessingTime: '14m 32s',
  finalProcessingTime: '1h 48m',
  targetMaxFinalTime: '2h 00m',
  gpuMode: 'CUDA / TensorRT Acceleration',
  status: 'PASS',
};

export const MOCK_SENSOR_ROBUSTNESS: SensorRobustnessMode[] = [
  {
    modeName: 'Full Sensor Mode',
    sensorsUsed: 'IMU + PPK GNSS + 4K Video',
    rmseMeters: 0.42,
    status: 'PASS',
  },
  {
    modeName: 'Degraded Sensor Mode',
    sensorsUsed: 'Standard GNSS + 1080p Video',
    rmseMeters: 0.68,
    status: 'PASS',
  },
  {
    modeName: 'No IMU Condition',
    sensorsUsed: 'PPK GNSS + Optical Flow Pose',
    rmseMeters: 0.54,
    status: 'PASS',
  },
  {
    modeName: 'No PPK Condition',
    sensorsUsed: 'Single-Frequency GNSS + Ground GCPs',
    rmseMeters: 0.72,
    status: 'PASS',
  },
];

export const MOCK_ACCEPTANCE_MATRIX: AcceptanceTestRow[] = [
  {
    id: 't-01',
    code: 'E-1',
    testName: 'Absolute Georeferencing RMSE',
    measured: '0.42 m',
    target: '≤ 0.50 m',
    status: 'PASS',
    notes: 'Verified via 15 independent RTK ground checkpoints',
  },
  {
    id: 't-02',
    code: 'E-2',
    testName: 'Relative Structural Accuracy',
    measured: '1.4 × GSD (2.9 cm)',
    target: '≤ 2.0 × GSD',
    status: 'PASS',
    notes: 'Local plane-fit residual error across structural facades',
  },
  {
    id: 't-03',
    code: 'E-3',
    testName: 'Geometric Fidelity (F-Score @ 0.5m)',
    measured: '0.87 (Chamfer: 0.042m)',
    target: 'F-Score ≥ 0.80',
    status: 'PASS',
    notes: 'Mesh geometry compared to high-density LiDAR benchmark',
  },
  {
    id: 't-04',
    code: 'E-4',
    testName: 'Surface Coverage Completeness',
    measured: '96.2%',
    target: '≥ 95.0%',
    status: 'PASS',
    notes: 'Reconstructed observable area across 12.8 ha survey bound',
  },
  {
    id: 't-05',
    code: 'E-5',
    testName: 'Texture Reconstruction Quality',
    measured: 'PSNR: 23.8 dB / SSIM: 0.89',
    target: 'PSNR ≥ 20dB / SSIM ≥ 0.82',
    status: 'PASS',
    notes: 'Radiometric fidelity vs original keyframe imagery',
  },
  {
    id: 't-06',
    code: 'E-6',
    testName: 'Dynamic Object Artifact Suppression',
    measured: '1.0 floaters / km²',
    target: '≤ 2.0 / km²',
    status: 'PASS',
    notes: 'Masking verified for moving vehicles & personnel',
  },
  {
    id: 't-07',
    code: 'E-7',
    testName: 'Pipeline Processing Latency',
    measured: '1h 48m',
    target: '≤ 2h 00m',
    status: 'PASS',
    notes: 'Wall-clock time for 1,842 keyframes on single workstation GPU',
  },
  {
    id: 't-08',
    code: 'E-8',
    testName: 'Degraded Sensor Robustness',
    measured: '4 Modes Verified',
    target: 'All Modes Pass',
    status: 'PASS',
    notes: 'Reconstruction stability confirmed without IMU / PPK feed',
  },
];
