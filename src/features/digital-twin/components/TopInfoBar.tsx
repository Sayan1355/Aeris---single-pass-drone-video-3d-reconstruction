// ============================================================
// AERIS — Digital Twin Top Information Bar
// ============================================================

import { Cube, Globe, Lightning } from '@phosphor-icons/react';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';

export function TopInfoBar() {
  const { viewMode, selectedFeature } = useDigitalTwinStore();

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
      aria-label="Digital twin header info"
    >
      {/* Title / Module Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid var(--border-base)' }}>
        <Cube size={16} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
          3D DIGITAL TWIN
        </span>
        <span
          className="badge badge-active"
          style={{ fontSize: 9, padding: '1px 5px', letterSpacing: '0.06em' }}
        >
          LIVE RECONSTRUCTION
        </span>
      </div>

      {/* Mission Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
        <Globe size={13} />
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>MISSION-0842</span>
        <span>·</span>
        <span>Rann of Kutch Zone 4C</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Metrics Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
        <span>
          LAT/LON: <span style={{ color: 'var(--text-secondary)' }}>23.8765°N 70.4321°E</span>
        </span>
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
          MODE: <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{viewMode.toUpperCase()}</span>
        </span>
      </div>

      {/* Selected Feature Tag */}
      {selectedFeature && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '2px 8px',
            background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.25)',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
          }}
        >
          <Lightning size={12} />
          <span>{selectedFeature.name}</span>
        </div>
      )}
    </div>
  );
}
