// ============================================================
// AERIS — Geospatial Intelligence Header Bar
// ============================================================

import { Globe, Target } from '@phosphor-icons/react';
import { useGeospatialStore } from '../hooks/useGeospatialStore';

export function GeospatialHeader() {
  const { vizMode, cursorCoordinate } = useGeospatialStore();

  return (
    <div
      style={{
        height: 38,
        background: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-base)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 16,
        fontSize: 11,
        flexShrink: 0,
        zIndex: 20,
      }}
      role="banner"
      aria-label="Geospatial intelligence header info"
    >
      {/* Title / Module Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid var(--border-base)' }}>
        <Globe size={16} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
          GEOSPATIAL INTELLIGENCE
        </span>
        <span
          className="badge badge-active"
          style={{ fontSize: 9, padding: '1px 5px', letterSpacing: '0.06em' }}
        >
          ZONE 4C
        </span>
      </div>

      {/* Mission Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
        <Target size={13} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>MISSION-0842</span>
        <span>·</span>
        <span>Rann of Kutch — Survey Zone 4C</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Coordinates & Technical Metrics */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
        {cursorCoordinate && (
          <span>
            CURSOR: <span style={{ color: 'var(--text-primary)' }}>{cursorCoordinate.lat.toFixed(4)}°N {cursorCoordinate.lon.toFixed(4)}°E</span>
          </span>
        )}
        <span>
          ALT: <span style={{ color: 'var(--accent-primary)' }}>124.6 m AGL</span>
        </span>
        <span>
          GSD: <span style={{ color: 'var(--text-secondary)' }}>3.2 cm/px</span>
        </span>
        <span>
          COVERAGE: <span style={{ color: 'var(--status-success)' }}>72.4%</span>
        </span>
        <span>
          CRS: <span style={{ color: 'var(--text-secondary)' }}>WGS 84 / UTM 43N</span>
        </span>
        <span>
          MODE: <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{vizMode.toUpperCase()}</span>
        </span>
      </div>
    </div>
  );
}
