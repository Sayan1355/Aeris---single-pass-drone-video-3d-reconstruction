// ============================================================
// AERIS — Digital Twin View Mode Selector
// 5 mode switcher overlay
// ============================================================

import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';
import type { TwinViewMode } from '../types';

interface ModeDef {
  mode: TwinViewMode;
  label: string;
  desc: string;
}

const MODES: ModeDef[] = [
  { mode: 'realistic',  label: 'Realistic',  desc: 'Textured PBR 3D digital twin' },
  { mode: 'pointcloud', label: 'Pt. Cloud',  desc: 'Dense point cloud representation' },
  { mode: 'wireframe',  label: 'Wireframe',  desc: 'Architectural structural mesh wireframe' },
  { mode: 'elevation',  label: 'Elevation',  desc: 'DEM false-color height spectrum' },
  { mode: 'classified', label: 'Classified', desc: 'Semantic classification colors' },
];

export function ViewModeSelector() {
  const { viewMode, setViewMode } = useDigitalTwinStore();

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        background: 'rgba(9, 17, 26, 0.75)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-sm)',
        padding: 3,
        backdropFilter: 'blur(10px)',
      }}
      role="navigation"
      aria-label="View mode selector"
    >
      {MODES.map((m) => {
        const active = viewMode === m.mode;
        return (
          <button
            key={m.mode}
            onClick={() => setViewMode(m.mode)}
            aria-pressed={active}
            title={m.desc}
            style={{
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: active ? 'rgba(14,165,233,0.22)' : 'transparent',
              color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
              border: `1px solid ${active ? 'rgba(14,165,233,0.45)' : 'transparent'}`,
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
