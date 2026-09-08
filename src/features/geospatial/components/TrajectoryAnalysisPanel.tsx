// ============================================================
// AERIS — Trajectory Analysis Panel
// Flight analysis metrics for the geospatial workspace
// ============================================================

import { NavigationArrow } from '@phosphor-icons/react';
import { MOCK_FLIGHT_METRICS } from '../data';
import { formatDuration } from '../../../lib/utils';

export function TrajectoryAnalysisPanel() {
  const m = MOCK_FLIGHT_METRICS;

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
      aria-label="Flight Trajectory Analysis"
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
        <NavigationArrow size={13} style={{ color: 'var(--accent-primary)' }} />
        <span>Flight Trajectory Analysis</span>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '10px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>TOTAL DISTANCE</div>
          <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700 }}>
            {m.totalDistanceKm.toFixed(1)} km
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>FLIGHT DURATION</div>
          <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
            {formatDuration(m.durationMs)}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>AVG / MAX ALT</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {m.avgAltitudeM.toFixed(0)}m / {m.maxAltitudeM.toFixed(0)}m
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>AVG / MAX SPEED</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {m.avgSpeedMs.toFixed(1)}m/s / {m.maxSpeedMs.toFixed(1)}m/s
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>CAMERA POSES</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700 }}>
            {m.cameraPosesCount.toLocaleString()}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>REG. FRAMES</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
            {m.registeredFramesCount.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
