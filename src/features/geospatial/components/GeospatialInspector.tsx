// ============================================================
// AERIS — Geospatial Feature Inspector (Right Panel)
// Display details for selected map features
// ============================================================

import { Target, Info, Calendar, Stack } from '@phosphor-icons/react';
import { useGeospatialStore } from '../hooks/useGeospatialStore';

export function GeospatialInspector() {
  const { selectedFeature } = useGeospatialStore();

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
      aria-label="Geospatial Feature Inspector"
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
        <span>Geospatial Inspector</span>
      </div>

      {selectedFeature ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Header Feature Card */}
          <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-base)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Target size={14} style={{ color: 'var(--accent-primary)' }} />
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

          {/* Coordinates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Center Coordinates
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
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Elevation:</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {selectedFeature.elevationM.toFixed(1)} m AGL
              </span>
            </div>
          </div>

          {/* Asset & Capture Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Asset Provenance
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Stack size={13} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Asset Type:</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {selectedFeature.assetType}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, background: 'var(--bg-card)', padding: '6px 8px', borderRadius: 3, border: '1px solid var(--border-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Capture Time:</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: 10 }}>
                {new Date(selectedFeature.captureTime).toUTCString().slice(17, 25)} UTC
              </span>
            </div>
          </div>

          {/* Additional Feature Details */}
          {selectedFeature.details && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Spatial Parameters
              </div>

              {Object.entries(selectedFeature.details).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0', borderBottom: '1px solid var(--border-muted)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{key}:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>{String(val)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 11 }}>
          Select a feature on the map to inspect
        </div>
      )}
    </div>
  );
}
