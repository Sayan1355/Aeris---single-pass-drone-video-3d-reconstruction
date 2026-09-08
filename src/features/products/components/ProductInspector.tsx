// ============================================================
// AERIS — Phase 6 Asset Inspector Panel Component
// Technical metadata, classification breakdowns, and quality validation
// ============================================================

import React from 'react';
import {
  X,
  CheckCircle,
  DownloadSimple,
  Hash,
  Scales,
} from '@phosphor-icons/react';
import type { ProductAsset } from '../types';

interface ProductInspectorProps {
  asset: ProductAsset | null;
  onClose: () => void;
  onExport: (asset: ProductAsset) => void;
}

export const ProductInspector: React.FC<ProductInspectorProps> = ({
  asset,
  onClose,
  onExport,
}) => {
  if (!asset) {
    return (
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '100%',
          color: 'var(--text-muted)',
          gap: 12,
        }}
      >
        <Scales size={36} color="var(--text-muted)" opacity={0.6} />
        <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>SELECT AN ASSET TO INSPECT METADATA</span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflowY: 'auto',
        maxHeight: '100%',
        boxShadow: 'var(--shadow-panel)',
      }}
    >
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-base)', paddingBottom: 12 }}>
        <div>
          <span style={{ fontSize: 9, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 700 }}>
            ASSET INSPECTOR
          </span>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0 0', fontFamily: 'var(--font-ui)' }}>
            {asset.name}
          </h3>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {asset.shortCode} • {asset.version}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: 4,
            borderRadius: 'var(--radius-xs)',
          }}
          title="Close Inspector"
        >
          <X size={16} />
        </button>
      </div>

      {/* Primary Technical Specs Block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>
          ENGINEERING METADATA
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>FORMAT</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.format}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>STATUS</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{asset.status}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>FILE SIZE</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.size}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>CRS</span>
            <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>{asset.crs}</span>
          </div>

          {asset.gsd && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>GSD / RESOLUTION</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.gsd}</span>
            </div>
          )}

          {asset.pointCount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>POINT COUNT</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.pointCount}</span>
            </div>
          )}

          {asset.polygonCount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>POLYGON COUNT</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.polygonCount}</span>
            </div>
          )}

          {asset.density && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>DENSITY</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.density}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>GENERATED AT</span>
            <span style={{ color: 'var(--text-secondary)' }}>{asset.generatedAt}</span>
          </div>
        </div>
      </div>

      {/* Classifications (if applicable) */}
      {asset.classificationClasses && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            ASPRS CLASSIFICATIONS
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {asset.classificationClasses.map((cls, i) => (
              <div key={i} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                • {cls}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bounding Box Coordinates */}
      {asset.boundingBox && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            SPATIAL BOUNDING BOX
          </div>
          <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>LAT MIN: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.minLat}°</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>LAT MAX: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.maxLat}°</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>LNG MIN: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.minLng}°</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>LNG MAX: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.maxLng}°</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>ALT MIN: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.minAlt}m</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>ALT MAX: </span>
              <span style={{ color: 'var(--text-primary)' }}>{asset.boundingBox.maxAlt}m</span>
            </div>
          </div>
        </div>
      )}

      {/* Quality Validation Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          PRODUCT QUALITY INDICATORS
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            <span style={{ color: 'var(--text-secondary)' }}>GEOMETRY: </span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{asset.quality.geometry}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            <span style={{ color: 'var(--text-secondary)' }}>TEXTURE: </span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{asset.quality.texture}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            <span style={{ color: 'var(--text-secondary)' }}>GEOREF: </span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{asset.quality.georeference}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            <span style={{ color: 'var(--text-secondary)' }}>METADATA: </span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{asset.quality.metadata}</span>
          </div>
        </div>
      </div>

      {/* Checksum & Export Trigger */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {asset.checksum && (
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
            <Hash size={10} style={{ display: 'inline', marginRight: 4 }} />
            CHECKSUM: {asset.checksum}
          </div>
        )}

        <button
          onClick={() => onExport(asset)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '10px',
            background: 'var(--accent-primary)',
            color: '#07090E',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <DownloadSimple size={16} weight="bold" />
          <span>EXPORT {asset.shortCode}</span>
        </button>
      </div>
    </div>
  );
};
