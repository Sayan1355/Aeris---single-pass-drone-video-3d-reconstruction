// ============================================================
// AERIS — Geospatial Layer Panel
// Toggles for 9 geospatial GIS layers
// ============================================================

import {
  NavigationArrow,
  Camera,
  BoundingBox,
  Square,
  MapTrifold,
  Stack,
  Mountains,
  Cube,
  GridFour,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react';
import { useGeospatialStore } from '../hooks/useGeospatialStore';
import type { GeospatialLayerState } from '../types';

interface LayerItemDef {
  key: keyof GeospatialLayerState;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

const LAYERS: LayerItemDef[] = [
  { key: 'trajectory',       label: 'Flight Trajectory',  desc: 'Calibrated CZML UAV flight path', icon: <NavigationArrow size={14} /> },
  { key: 'cameraPoses',      label: 'Camera Poses',       desc: 'Registered camera capture positions', icon: <Camera size={14} /> },
  { key: 'surveyBoundary',   label: 'Survey Boundary',    desc: 'Zone 4C geospatial boundary', icon: <BoundingBox size={14} /> },
  { key: 'coverage',         label: 'Survey Coverage',    desc: 'Heatmap of reconstruction density', icon: <Square size={14} /> },
  { key: 'orthomosaic',      label: 'Orthomosaic Map',    desc: 'Cloud-Optimized GeoTIFF raster', icon: <MapTrifold size={14} /> },
  { key: 'dsm',              label: 'DSM (Surface Model)',desc: 'Digital Surface Model elevation', icon: <Stack size={14} /> },
  { key: 'dtm',              label: 'DTM (Terrain Model)',desc: 'Digital Terrain Model bare earth', icon: <Mountains size={14} /> },
  { key: 'reconstruction3D', label: '3D Reconstruction', desc: 'Cesium 3D Tiles mesh representation', icon: <Cube size={14} /> },
  { key: 'pointCloud',       label: 'Classified Points',  desc: 'LAZ/LAS point cloud layer', icon: <GridFour size={14} /> },
];

export function LayerPanel() {
  const { layers, toggleLayer } = useGeospatialStore();

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
      aria-label="Geospatial Map Layers"
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
          justifyContent: 'space-between',
        }}
      >
        <span>GIS Map Layers</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-primary)' }}>
          {Object.values(layers).filter(Boolean).length} Active
        </span>
      </div>

      {/* Layer List */}
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
                padding: '7px 12px',
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
                <div style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.2 }}>
                  {layer.desc}
                </div>
              </div>

              <span style={{ color: active ? 'var(--accent-primary)' : 'var(--border-strong)' }}>
                {active ? <Eye size={13} /> : <EyeSlash size={13} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
