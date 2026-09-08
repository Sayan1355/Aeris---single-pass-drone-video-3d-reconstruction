// ============================================================
// AERIS — Digital Twin Layer Control Panel
// Toggle controls for 8 GIS / 3D twin layers
// ============================================================

import {
  Cube,
  GridFour,
  NavigationArrow,
  Camera,
  BoundingBox,
  Mountains,
  Stack,
  MapTrifold,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';
import type { TwinLayerState } from '../types';

interface LayerItemDef {
  key: keyof TwinLayerState;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

const LAYERS: LayerItemDef[] = [
  { key: 'mesh',           label: 'Digital Twin Mesh',    desc: 'Photorealistic 3D mesh model',         icon: <Cube size={14} /> },
  { key: 'pointCloud',     label: 'Dense Point Cloud',    desc: 'Surface-aligned 3D point cloud',       icon: <GridFour size={14} /> },
  { key: 'trajectory',     label: 'Flight Trajectory',    desc: 'UAV survey flight path',               icon: <NavigationArrow size={14} /> },
  { key: 'cameraPoses',    label: 'Camera Poses',         desc: 'Calibrated capture positions',         icon: <Camera size={14} /> },
  { key: 'surveyBoundary', label: 'Survey Boundary',      desc: 'Geospatial coverage polygon',          icon: <BoundingBox size={14} /> },
  { key: 'terrain',        label: 'DEM Terrain Mesh',     desc: 'Elevation terrain surface',            icon: <Mountains size={14} /> },
  { key: 'dsm',            label: 'DSM Grid Overlay',     desc: 'Digital Surface Model grid',           icon: <Stack size={14} /> },
  { key: 'orthomosaic',    label: 'Orthomosaic Map',      desc: 'True orthophoto basemap overlay',     icon: <MapTrifold size={14} /> },
];

export function LayerControlPanel() {
  const { layers, toggleLayer } = useDigitalTwinStore();

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
      aria-label="GIS and Digital Twin Layer Controls"
    >
      {/* Panel Header */}
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
          justifyContent: 'space-between',
        }}
      >
        <span>Twin Layers</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-primary)' }}>
          {Object.values(layers).filter(Boolean).length} Active
        </span>
      </div>

      {/* Layer Toggles List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {LAYERS.map((layer, idx) => {
          const active = layers[layer.key];
          return (
            <button
              key={layer.key}
              onClick={() => toggleLayer(layer.key)}
              aria-pressed={active}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 12px',
                background: active ? 'rgba(14,165,233,0.06)' : 'transparent',
                border: 'none',
                borderBottom: idx < LAYERS.length - 1 ? '1px solid var(--border-muted)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease-out',
              }}
            >
              <span style={{ color: active ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                {layer.icon}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.2 }}>
                  {layer.desc}
                </div>
              </div>

              <span style={{ color: active ? 'var(--accent-primary)' : 'var(--border-strong)' }}>
                {active ? <Eye size={14} /> : <EyeSlash size={14} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
