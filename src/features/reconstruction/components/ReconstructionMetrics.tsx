// ============================================================
// AERIS — Reconstruction Metrics Panel
// Technical quality metrics — not decorative statistics
// ============================================================

import type { ReconstructionMetrics } from '../types';

interface Props {
  metrics: ReconstructionMetrics;
}

interface MetricDefn {
  label: string;
  value: string;
  unit?: string;
  good?: boolean;
  warn?: boolean;
  accent?: boolean;
}

function MetricCell({ label, value, unit, good, warn, accent }: MetricDefn) {
  const valueColor = accent
    ? 'var(--accent-primary)'
    : good
    ? 'var(--status-success)'
    : warn
    ? 'var(--status-warning)'
    : 'var(--text-primary)';

  return (
    <div
      style={{
        padding: '7px 10px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: valueColor, letterSpacing: '0.02em', lineHeight: 1 }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function ReconstructionMetrics({ metrics }: Props) {
  const defs: MetricDefn[] = [
    {
      label: 'Coverage',
      value: `${metrics.coveragePct.toFixed(1)}`,
      unit: '%',
      good: metrics.coveragePct >= 85,
      warn: metrics.coveragePct < 70,
    },
    {
      label: 'GSD',
      value: metrics.gsdCm.toFixed(1),
      unit: 'cm/px',
      good: metrics.gsdCm <= 3,
      warn: metrics.gsdCm > 5,
    },
    {
      label: 'Camera Poses',
      value: metrics.cameraPoses.toLocaleString(),
      accent: true,
    },
    {
      label: 'Reg. Frames',
      value: metrics.registeredFrames.toLocaleString(),
      accent: true,
    },
    {
      label: 'Sparse Pts',
      value: `${metrics.sparsePointsM.toFixed(1)}M`,
      accent: true,
    },
    {
      label: 'Dense Pts',
      value: `${metrics.densePointsM.toFixed(1)}M`,
      accent: true,
    },
    {
      label: 'Mesh Tris',
      value: `${metrics.meshTrianglesM.toFixed(1)}M`,
      accent: true,
    },
    {
      label: 'Reproj. Error',
      value: metrics.reprojectionErrorPx.toFixed(2),
      unit: 'px',
      good: metrics.reprojectionErrorPx < 0.5,
      warn: metrics.reprojectionErrorPx > 1.0,
    },
  ];

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Reconstruction quality metrics"
    >
      {/* Header */}
      <div style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-base)' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Reconstruction Metrics
        </span>
      </div>

      {/* 4×2 metric grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          padding: '8px',
        }}
      >
        {defs.map((d) => (
          <MetricCell key={d.label} {...d} />
        ))}
      </div>
    </div>
  );
}
