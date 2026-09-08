// ============================================================
// AERIS — Phase 7 QA / Accuracy & Scientific Validation Workspace
// Scientific and technical validation center for reconstructed missions
// ============================================================

import { useState } from 'react';
import { QAHeader } from './components/QAHeader';
import { OverallQualityCard } from './components/OverallQualityCard';
import { PrimaryAccuracyPanel } from './components/PrimaryAccuracyPanel';
import { GeometricFidelityPanel } from './components/GeometricFidelityPanel';
import { CoverageAnalysisPanel } from './components/CoverageAnalysisPanel';
import { TextureQualityPanel } from './components/TextureQualityPanel';
import { DynamicArtifactsPanel } from './components/DynamicArtifactsPanel';
import { SpatialConfidenceMap } from './components/SpatialConfidenceMap';
import { ProcessingPerformancePanel } from './components/ProcessingPerformancePanel';
import { SensorRobustnessPanel } from './components/SensorRobustnessPanel';
import { AcceptanceMatrixTable } from './components/AcceptanceMatrixTable';
import { QATimeline } from './components/QATimeline';
import { FinalCertificationPanel } from './components/FinalCertificationPanel';
import { ExportQAModal } from './components/ExportQAModal';

import {
  MOCK_QA_SCORE,
  MOCK_GEOREFERENCING,
  MOCK_STRUCTURAL_ACCURACY,
  MOCK_GEOMETRIC_FIDELITY,
  MOCK_COVERAGE,
  MOCK_TEXTURE,
  MOCK_ARTIFACTS,
  MOCK_SPATIAL_CONFIDENCE,
  MOCK_PROCESSING_PERFORMANCE,
  MOCK_SENSOR_ROBUSTNESS,
  MOCK_ACCEPTANCE_MATRIX,
} from './data/mockQA';

export function QAAccuracyPage() {
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  return (
    <div
      role="main"
      id="qa-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
      }}
    >
      {/* 1. Header */}
      <QAHeader />

      {/* Main Content Workspace */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* 2. Validation Audit Timeline */}
        <QATimeline />

        {/* 3. Overall Reconstruction Quality Score */}
        <OverallQualityCard score={MOCK_QA_SCORE} />

        {/* 4. Primary Accuracy Panel (E-1 Georeferencing & E-2 Structural Error) */}
        <PrimaryAccuracyPanel
          georeferencing={MOCK_GEOREFERENCING}
          structural={MOCK_STRUCTURAL_ACCURACY}
        />

        {/* 5. Geometric Fidelity (E-3 Chamfer & F-Score with Error Curve) */}
        <GeometricFidelityPanel fidelity={MOCK_GEOMETRIC_FIDELITY} />

        {/* 6. Coverage Analysis & Grid Cell Matrix (E-4) */}
        <CoverageAnalysisPanel coverage={MOCK_COVERAGE} />

        {/* 7. Two-Column Grid: Texture Quality (E-5) & Dynamic Artifact Suppression (E-6) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          <TextureQualityPanel texture={MOCK_TEXTURE} />
          <DynamicArtifactsPanel artifacts={MOCK_ARTIFACTS} />
        </div>

        {/* 8. Spatial Confidence & Reconstruction Uncertainty Heatmap */}
        <SpatialConfidenceMap confidence={MOCK_SPATIAL_CONFIDENCE} />

        {/* 9. Two-Column Grid: Processing Performance (E-7) & Degraded Sensor Robustness (E-8) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          <ProcessingPerformancePanel performance={MOCK_PROCESSING_PERFORMANCE} />
          <SensorRobustnessPanel modes={MOCK_SENSOR_ROBUSTNESS} />
        </div>

        {/* 10. Specification Acceptance Test Matrix Table (E-1 through E-8) */}
        <AcceptanceMatrixTable rows={MOCK_ACCEPTANCE_MATRIX} />

        {/* 11. Final Mission Validation Certificate */}
        <FinalCertificationPanel
          score={MOCK_QA_SCORE}
          onExportReport={() => setShowExportModal(true)}
        />
      </div>

      {/* 12. Export PDF Modal Simulation */}
      {showExportModal && (
        <ExportQAModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
