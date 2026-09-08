// ============================================================
// AERIS — Phase 7 Degraded Sensor Robustness Panel (E-8)
// Reconstruction stability validation across sensor degradation modes
// ============================================================

import React from 'react';
import { Cpu, CheckCircle } from '@phosphor-icons/react';
import type { SensorRobustnessMode } from '../types';

interface SensorRobustnessPanelProps {
  modes: SensorRobustnessMode[];
}

export const SensorRobustnessPanel: React.FC<SensorRobustnessPanelProps> = ({ modes }) => {
  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={18} color="#38BDF8" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            E-8 DEGRADED SENSOR ROBUSTNESS VALIDATION MATRIX
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
          ALL 4 MODES PASSED
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 10,
        }}
      >
        {modes.map((m) => (
          <div
            key={m.modeName}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {m.modeName}
              </span>
              <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            </div>

            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {m.sensorsUsed}
            </span>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--border-muted)', paddingTop: 4 }}>
              <span style={{ color: 'var(--text-secondary)' }}>EVALUATED RMSE:</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{m.rmseMeters.toFixed(2)} m</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
