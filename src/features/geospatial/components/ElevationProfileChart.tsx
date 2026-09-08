// ============================================================
// AERIS — Elevation / Terrain Profile Chart Panel
// Recharts-based elevation profile corresponding to mission flight trajectory
// ============================================================

import { Mountains } from '@phosphor-icons/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_TERRAIN_METRICS, MOCK_ELEVATION_PROFILE } from '../data';

export function ElevationProfileChart() {
  const t = MOCK_TERRAIN_METRICS;

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
      aria-label="Terrain Elevation Profile Analysis"
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
        <Mountains size={13} style={{ color: 'var(--accent-primary)' }} />
        <span>Terrain Elevation Profile</span>
      </div>

      {/* Terrain Metrics Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, padding: '8px 10px', borderBottom: '1px solid var(--border-muted)' }}>
        <div style={{ background: 'var(--bg-card)', padding: '4px 6px', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>MIN</div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>{t.minElevationM.toFixed(1)}m</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '4px 6px', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>MAX</div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>{t.maxElevationM.toFixed(1)}m</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '4px 6px', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>MEAN</div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>{t.meanElevationM.toFixed(1)}m</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '4px 6px', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>RELIEF</div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 600 }}>{t.reliefM.toFixed(1)}m</div>
        </div>
      </div>

      {/* Recharts Elevation Profile Chart */}
      <div style={{ height: 110, padding: '6px 8px 4px 0' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_ELEVATION_PROFILE} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="terrainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="distKm" tick={{ fontSize: 8, fill: '#4A6180' }} unit="km" />
            <YAxis tick={{ fontSize: 8, fill: '#4A6180' }} domain={[0, 40]} />
            <Tooltip
              contentStyle={{ background: '#0C1018', border: '1px solid #1A2535', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
              labelFormatter={(label) => `Distance: ${label} km`}
            />
            <Area type="monotone" dataKey="elevationM" stroke="#0EA5E9" fillOpacity={1} fill="url(#terrainGrad)" name="Terrain Elev (m)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
