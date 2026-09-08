// ============================================================
// AERIS — Digital Twin Measurement Toolbar
// Controls for Distance, Area, and Elevation measurement modes
// ============================================================

import { Ruler, Polygon, ArrowUp, Trash } from '@phosphor-icons/react';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';
import type { MeasurementType } from '../types';

export function MeasurementToolbar() {
  const {
    measurementMode,
    setMeasurementMode,
    measurementPoints,
    completedMeasurements,
    clearMeasurements,
  } = useDigitalTwinStore();

  const tools: { mode: MeasurementType; label: string; icon: React.ReactNode; hint: string }[] = [
    { mode: 'distance',  label: 'Distance',  icon: <Ruler size={13} />,   hint: 'Click 2 points in 3D scene to measure 3D linear distance' },
    { mode: 'area',      label: 'Area',      icon: <Polygon size={13} />, hint: 'Click 3 points to measure 2D/3D surface area' },
    { mode: 'elevation', label: 'Elevation', icon: <ArrowUp size={13} />,  hint: 'Click 2 points to measure vertical height delta (Δ AGL)' },
  ];

  const activeTool = tools.find((t) => t.mode === measurementMode);

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
      aria-label="3D Measurement Tools"
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
        <span>3D Measurement</span>
        {(completedMeasurements.length > 0 || measurementMode !== 'none') && (
          <button
            onClick={clearMeasurements}
            title="Clear all measurements"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--status-error)',
              fontSize: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Trash size={12} /> Clear
          </button>
        )}
      </div>

      {/* Tool Selection Buttons */}
      <div style={{ display: 'flex', padding: '6px 8px', gap: 4, borderBottom: '1px solid var(--border-muted)' }}>
        {tools.map((t) => {
          const active = measurementMode === t.mode;
          return (
            <button
              key={t.mode}
              onClick={() => setMeasurementMode(active ? 'none' : t.mode)}
              aria-pressed={active}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                padding: '5px 8px',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                background: active ? 'rgba(14,165,233,0.2)' : 'var(--bg-card)',
                color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: `1px solid ${active ? 'rgba(14,165,233,0.45)' : 'var(--border-base)'}`,
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                transition: 'all 150ms ease-out',
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Mode Instructions / Point Counter */}
      {activeTool && (
        <div style={{ padding: '6px 12px', background: 'rgba(14,165,233,0.06)', borderBottom: '1px solid var(--border-muted)', fontSize: 10, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{activeTool.hint}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {measurementPoints.length} Pts
          </span>
        </div>
      )}

      {/* Completed Measurements List */}
      {completedMeasurements.length > 0 && (
        <div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {completedMeasurements.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                background: 'var(--bg-card)',
                padding: '4px 8px',
                borderRadius: 3,
                border: '1px solid var(--border-base)',
              }}
            >
              <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: 9 }}>{m.type}</span>
              <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{m.formattedValue}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
