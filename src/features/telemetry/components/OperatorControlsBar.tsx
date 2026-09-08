// ============================================================
// AERIS — Phase 8 Operator Controls Bar Component
// Simulated UI interaction triggers for in-flight operational workstation
// ============================================================

import React from 'react';
import { Pause, Play, MapPin, Target, Sliders } from '@phosphor-icons/react';

interface OperatorControlsBarProps {
  isPaused: boolean;
  onTogglePause: () => void;
}

export const OperatorControlsBar: React.FC<OperatorControlsBarProps> = ({
  isPaused,
  onTogglePause,
}) => {
  const handleMarkLocation = () => {
    alert('Simulated operator action: Target Waypoint Marker added at current UAV position.');
  };

  const handleCenterUav = () => {
    alert('Simulated operator action: Viewport centered on UAV coordinates (22.5726° N, 88.3639° E).');
  };

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sliders size={18} color="var(--accent-primary)" />
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
          OPERATOR WORKSTATION CONTROLS
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          (FRONTEND UI SIMULATION MODE)
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={onTogglePause}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: isPaused ? 'var(--status-success)' : 'rgba(217,119,6,0.15)',
            border: isPaused ? '1px solid var(--status-success)' : '1px solid rgba(217,119,6,0.4)',
            color: isPaused ? '#FFFFFF' : 'var(--status-warning)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-xs)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isPaused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
          <span>{isPaused ? 'RESUME STREAM' : 'PAUSE CAPTURE'}</span>
        </button>

        <button
          onClick={handleMarkLocation}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(14,165,233,0.12)',
            border: '1px solid rgba(14,165,233,0.3)',
            color: 'var(--accent-primary)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-xs)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <MapPin size={14} />
          <span>MARK LOCATION</span>
        </button>

        <button
          onClick={handleCenterUav}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-base)',
            color: 'var(--text-primary)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-xs)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Target size={14} />
          <span>CENTER UAV</span>
        </button>
      </div>
    </div>
  );
};
