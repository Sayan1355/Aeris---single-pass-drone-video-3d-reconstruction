// ============================================================
// AERIS — Digital Twin Right Metadata Inspector
// Shows detailed attributes for selected 3D features
// ============================================================

import { Cube, Info, Stack, CheckCircle } from '@phosphor-icons/react';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';

export function MetadataInspector() {
  const { selectedFeature } = useDigitalTwinStore();

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      role="region"
      aria-label="3D Feature Metadata Inspector"
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
        <Info size={13} style={{ color: 'var(--accent-primary)' }} />
        <span>Feature Inspector</span>
      </div>

      {selectedFeature ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Feature Header Card */}
          <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-base)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Cube size={14} style={{ color: 'var(--accent-primary)' }} />
              <span className="badge badge-active" style={{ fontSize: 9 }}>
                {selectedFeature.type.toUpperCase()}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)' }}>
                {selectedFeature.confidencePct}% Conf
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {selectedFeature.name}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
              ID: {selectedFeature.id}
            </div>
          </div>

          {/* Coordinates & Position */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Geospatial Location
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>LATITUDE</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedFeature.latitude.toFixed(4)}° N
                </div>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>LONGITUDE</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedFeature.longitude.toFixed(4)}° E
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Base Elevation:</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {selectedFeature.elevationM.toFixed(1)} m AGL
              </span>
            </div>
          </div>

          {/* Dimensions & Geometry */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Physical Dimensions
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
              <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 3, textAlign: 'center', border: '1px solid var(--border-muted)' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>WIDTH</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedFeature.dimensions.widthM.toFixed(1)}m
                </div>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 3, textAlign: 'center', border: '1px solid var(--border-muted)' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>HEIGHT</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {selectedFeature.dimensions.heightM.toFixed(1)}m
                </div>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 3, textAlign: 'center', border: '1px solid var(--border-muted)' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>DEPTH</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedFeature.dimensions.depthM.toFixed(1)}m
                </div>
              </div>
            </div>

            {selectedFeature.surfaceAreaM2 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0', borderBottom: '1px solid var(--border-muted)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Surface Area:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{selectedFeature.surfaceAreaM2.toLocaleString()} m²</span>
              </div>
            )}
            {selectedFeature.volumeM3 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0', borderBottom: '1px solid var(--border-muted)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Volume:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{selectedFeature.volumeM3.toLocaleString()} m³</span>
              </div>
            )}
          </div>

          {/* Reconstruction Asset Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Asset & Reconstruction Quality
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Stack size={13} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Asset Format:</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {selectedFeature.assetType}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={13} style={{ color: 'var(--status-success)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 600 }}>
                {selectedFeature.reconstructionStatus}
              </span>
            </div>

            {selectedFeature.trianglesCount && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Polygon Count:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{selectedFeature.trianglesCount.toLocaleString()} tris</span>
              </div>
            )}
            {selectedFeature.gsdCm && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Local GSD Resolution:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{selectedFeature.gsdCm.toFixed(1)} cm/px</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 11 }}>
          Click an object in the 3D viewport to inspect
        </div>
      )}
    </div>
  );
}
