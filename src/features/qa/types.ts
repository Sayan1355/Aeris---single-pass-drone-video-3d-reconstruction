// ============================================================
// AERIS — Phase 7 QA / Accuracy & Validation Data Types
// ============================================================

export type TestStatus = 'PASS' | 'WARN' | 'FAIL';

export interface QAScoreBreakdown {
  overallScore: number; // e.g. 92.6
  maxScore: number; // 100
  statusText: string; // 'WITHIN ACCEPTANCE THRESHOLD'
  categoryScores: {
    geometry: number; // 94
    georeference: number; // 91
    coverage: number; // 96
    texture: number; // 89
    confidence: number; // 93
  };
}

export interface GeoreferencingMetric {
  rmseMeters: number; // 0.42
  targetRmseMeters: number; // 0.50
  checkpointsCount: number; // 15
  status: TestStatus;
}

export interface StructuralAccuracyMetric {
  relativeErrorGsdMultiple: number; // 1.4
  targetGsdMultiple: number; // 2.0
  gsdCm: number; // 2.1
  status: TestStatus;
}

export interface GeometricFidelityMetric {
  chamferDistanceMeters: number; // 0.042
  targetChamferMeters: number; // 0.080
  fScore: number; // 0.87
  targetFScore: number; // 0.80
  status: TestStatus;
  distributionCurve: { distance: string; errorDensity: number }[];
}

export interface CoverageMetric {
  observableAreaHa: number; // 12.8
  reconstructedPercent: number; // 96.2
  unreconstructedPercent: number; // 3.8
  cellsTotal: number; // 1280
  cellsReconstructed: number; // 1231
  cellsGaps: number; // 49
}

export interface TextureMetric {
  psnrDb: number; // 23.8
  targetPsnrDb: number; // 20.0
  ssimIndex: number; // 0.89
  targetSsimIndex: number; // 0.82
  status: TestStatus;
}

export interface ArtifactMetric {
  maskedCategories: string[];
  artifactCountPerKm2: number; // 1.0
  targetMaxPerKm2: number; // 2.0
  status: TestStatus;
}

export interface SpatialConfidenceMetric {
  meanConfidencePercent: number; // 93.1
  lowConfidenceAreaPercent: number; // 2.7
  primaryCause: string; // 'OCCLUSION / LIMITED VIEW'
}

export interface ProcessingPerformanceMetric {
  keyframesCount: number; // 1842
  draftProcessingTime: string; // '14m 32s'
  finalProcessingTime: string; // '1h 48m'
  targetMaxFinalTime: string; // '2h 00m'
  gpuMode: string; // 'CUDA / TensorRT'
  status: TestStatus;
}

export interface SensorRobustnessMode {
  modeName: string;
  sensorsUsed: string;
  rmseMeters: number;
  status: TestStatus;
}

export interface AcceptanceTestRow {
  id: string;
  testName: string;
  code: string;
  measured: string;
  target: string;
  status: TestStatus;
  notes: string;
}
