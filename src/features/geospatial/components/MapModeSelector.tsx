// ============================================================
// AERIS — Map Visualization Mode Selector
// Satellite / Imagery, Elevation, Coverage, Classified modes
// ============================================================

import { useGeospatialStore } from '../hooks/useGeospatialStore';
import type { MapVizMode } from '../types';

interface ModeDef {
  mode: MapVizMode;
  label: string;
  desc: string;
}

const MODES: ModeDef[] = [
  { mode: 'satellite',  label: 'Satellite',  desc: 'High-resolution aerial satellite imagery' },
  { mode: 'elevation',  label: 'Elevation',  desc: 'DEM elevation spectrum heat map' },
  { mode: 'coverage',   label: 'Coverage',   desc: 'Single-pass survey coverage density' },
  { mode: 'classified', label: 'Classified', desc: 'Land cover & feature classification' },
];

export function MapModeSelector() {
  const { vizMode, setVizMode } = useGeospatialStore();

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        background: 'rgba(9, 17, 26, 0.8)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-sm)',
        padding: 3,
        backdropFilter: 'blur(10px)',
      }}
      role="navigation"
      aria-label="Map visualization mode selector"
    >
      {MODES.map((m) => {
        const active = vizMode === m.mode;
        return (
          <button
            key={m.mode}
            onClick={() => setVizMode(m.mode)}
            aria-pressed={active}
            title={m.desc}
            style={{
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: active ? 'rgba(14,165,233,0.25)' : 'transparent',
              color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
              border: `1px solid ${active ? 'rgba(14,165,233,0.5)' : 'transparent'}`,
              borderRadius: 'var(--radius-xs)',
              cursor: 'pointer',
              transition: 'all 150ms ease-out',
            }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
