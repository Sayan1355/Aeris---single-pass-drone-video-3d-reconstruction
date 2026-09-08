// ============================================================
// AERIS — Coverage Analysis Panel
// Survey coverage statistics and quality indicator
// ============================================================

import { BoundingBox, CheckCircle, Warning } from '@phosphor-icons/react';
import { MOCK_COVERAGE_METRICS } from '../data';

export function CoverageAnalysisPanel() {
  const c = MOCK_COVERAGE_METRICS;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="region"
      aria-label="Survey Coverage Analysis"
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid var(--border-base)',
          fontSize: 10,
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <BoundingBox size={13} style={{ color: 'var(--accent-primary)' }} />
        <span>Survey Coverage Analysis</span>
      </div>

      {/* Main Stats Strip */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Coverage Quality</span>
          <span style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-success)' }}>
            {c.coveragePct.toFixed(1)}%
          </span>
        </div>

        {/* Coverage Quality Progress Bar */}
        <div style={{ height: 5, background: 'var(--border-base)', borderRadius: 3, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${c.coveragePct}%`,
              background: 'var(--status-success)',
              borderRadius: 3,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Covered vs Uncovered Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
          <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={10} style={{ color: 'var(--status-success)' }} /> COVERED AREA
            </div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
              {c.coveredAreaHa.toFixed(1)} ha
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Warning size={10} style={{ color: 'var(--status-warning)' }} /> UNCOVERED
            </div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--status-warning)', fontWeight: 700 }}>
              {c.uncoveredAreaHa.toFixed(1)} ha
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
