// ============================================================
// AERIS — Reconstruction Command Center (Phase 3)
// The full spatial workstation for single-pass 3D reconstruction
// ============================================================

import { useCallback } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useReconStore } from './hooks/useReconStore';
import { MOCK_RECON_METRICS, MOCK_STAGE_METRICS } from './data';

import { ReconstructionViewport } from './components/ReconstructionViewport';
import { SourceVideoPanel }       from './components/SourceVideoPanel';
import { PipelineTimeline }       from './components/PipelineTimeline';
import { StageInspector }         from './components/StageInspector';
import { ReconstructionMetrics }  from './components/ReconstructionMetrics';
import { FrameInspector }         from './components/FrameInspector';
import { TrajectoryView }         from './components/TrajectoryView';

// ---- Mission context strip ----------------------------------

function MissionContextStrip() {
  const mission = useAppStore((s) => s.activeMission);
  const telemetry = useAppStore((s) => s.telemetry);

  const fields = [
    { label: 'Mission',   value: mission?.name ?? '—' },
    { label: 'Site',      value: mission?.site ?? '—' },
    { label: 'Platform',  value: mission?.droneId ?? '—' },
    { label: 'Duration',  value: '00:08:34', mono: true },
    { label: 'Altitude',  value: `${telemetry.altitude.toFixed(1)} m`, mono: true },
    { label: 'Speed',     value: `${telemetry.speed.toFixed(1)} m/s`, mono: true },
    { label: 'Heading',   value: `${telemetry.heading}°`, mono: true },
    { label: 'GPS',       value: telemetry.gpsFixType.toUpperCase(), mono: true },
  ];


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '0 16px',
        borderBottom: '1px solid var(--border-base)',
        background: 'var(--bg-card)',
        flexShrink: 0,
        height: 36,
      }}
      role="banner"
      aria-label="Mission context"
    >
      {/* Active indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingRight: 16, marginRight: 12, borderRight: '1px solid var(--border-base)' }}>
        <span className="status-dot dot-active status-blink" style={{ width: 6, height: 6 }} aria-hidden="true" />
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>
          RECONSTRUCTION ACTIVE
        </span>
      </div>

      {/* Mission fields */}
      {fields.map((f, i) => (
        <div
          key={f.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 12px',
            borderRight: i < fields.length - 1 ? '1px solid var(--border-muted)' : 'none',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {f.label}
          </span>
          <span style={{
            fontSize: 11,
            color: 'var(--text-secondary)',
            fontFamily: f.mono ? 'var(--font-mono)' : 'var(--font-ui)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {f.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---- Full Reconstruction Page --------------------------------

export function ReconstructionPage() {
  const { pipelineStages } = useAppStore();
  const {
    vizMode, setVizMode,
    showGrid, toggleGrid,
    showTrajectory, toggleTrajectory,
    showSurveyBoundary, toggleSurveyBoundary,
    showPointCloud, togglePointCloud,
    activeStageId,
  } = useReconStore();

  const activeStage = pipelineStages.find((s) => s.id === activeStageId) ?? pipelineStages.find(s => s.status === 'running') ?? null;

  const handleSetVizMode = useCallback(setVizMode, [setVizMode]);

  return (
    <div
      role="main"
      id="recon-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Mission context strip */}
      <MissionContextStrip />

      {/* Main workspace — fills remaining height */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          // LEFT(source+traj) | CENTER(viewport) | RIGHT(inspector)
          gridTemplateColumns: '260px 1fr 224px',
          gridTemplateRows: '1fr',
          gap: 0,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '10px 8px 10px 10px',
            overflow: 'hidden',
            borderRight: '1px solid var(--border-base)',
          }}
        >
          {/* Source video */}
          <div style={{ flex: '0 0 auto', minHeight: 0 }}>
            <SourceVideoPanel />
          </div>

          {/* Camera trajectory */}
          <div style={{ flex: '0 0 auto' }}>
            <TrajectoryView />
          </div>

          {/* Frame inspector */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <FrameInspector />
          </div>
        </div>

        {/* ── CENTER — 3D VIEWPORT ──────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          {/* Reconstruction metrics strip below viewport */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <ReconstructionViewport
              vizMode={vizMode}
              setVizMode={handleSetVizMode}
              showGrid={showGrid}
              toggleGrid={toggleGrid}
              showTrajectory={showTrajectory}
              toggleTrajectory={toggleTrajectory}
              showSurveyBoundary={showSurveyBoundary}
              toggleSurveyBoundary={toggleSurveyBoundary}
              showPointCloud={showPointCloud}
              togglePointCloud={togglePointCloud}
            />
          </div>

          {/* Metrics bar under viewport */}
          <div style={{ flexShrink: 0 }}>
            <ReconstructionMetrics metrics={MOCK_RECON_METRICS} />
          </div>
        </div>

        {/* ── RIGHT COLUMN — INSPECTOR ─────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 10px 10px 8px',
            overflow: 'hidden',
            borderLeft: '1px solid var(--border-base)',
          }}
        >
          <StageInspector
            stage={activeStage}
            metrics={MOCK_STAGE_METRICS}
            allStages={pipelineStages}
          />
        </div>
      </div>

      {/* ── BOTTOM — PIPELINE TIMELINE ──────────────────── */}
      <div style={{ flexShrink: 0 }}>
        <PipelineTimeline stages={pipelineStages} />
      </div>
    </div>
  );
}
