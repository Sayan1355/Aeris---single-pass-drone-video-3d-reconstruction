// ============================================================
// AERIS — Coordinate Reference System (CRS) & Cursor Panel
// ============================================================

import { Compass } from '@phosphor-icons/react';
import { MOCK_CRS_INFO } from '../data';
import { useGeospatialStore } from '../hooks/useGeospatialStore';

export function CrsCoordinatePanel() {
  const c = MOCK_CRS_INFO;
  const { cursorCoordinate } = useGeospatialStore();

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
      aria-label="Coordinate Reference System & Cursor"
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
        <Compass size={13} style={{ color: 'var(--accent-primary)' }} />
        <span>Spatial Reference (CRS)</span>
      </div>

      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
          <span style={{ color: 'var(--text-muted)' }}>CRS Name:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700 }}>{c.crsName}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
          <span style={{ color: 'var(--text-muted)' }}>Datum / Projection:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{c.datum} ({c.utmZone})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
          <span style={{ color: 'var(--text-muted)' }}>Units:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{c.units}</span>
        </div>

        {/* Live Cursor Coordinate Readout */}
        {cursorCoordinate && (
          <div style={{ marginTop: 4, padding: '6px 8px', background: 'var(--bg-card)', borderRadius: 3, border: '1px solid var(--border-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>CURSOR:</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>
              {cursorCoordinate.lat.toFixed(4)}°N {cursorCoordinate.lon.toFixed(4)}°E ({cursorCoordinate.elev.toFixed(1)}m)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
