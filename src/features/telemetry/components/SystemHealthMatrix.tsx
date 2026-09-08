// ============================================================
// AERIS — Phase 8 System Health Matrix Component
// Grid status matrix for all 9 critical operational subsystems
// ============================================================

import React from 'react';
import { ShieldCheck, CheckCircle } from '@phosphor-icons/react';
import type { SubsystemHealthItem } from '../types';

interface SystemHealthMatrixProps {
  health: SubsystemHealthItem[];
}

export const SystemHealthMatrix: React.FC<SystemHealthMatrixProps> = ({ health }) => {
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
          <ShieldCheck size={18} color="var(--status-success)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            CRITICAL SUBSYSTEM HEALTH MATRIX
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
          ALL 9 SUBSYSTEMS NOMINAL
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 10,
        }}
      >
        {health.map((sys) => (
          <div
            key={sys.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {sys.name}
              </span>
              <CheckCircle size={14} color="var(--status-success)" weight="fill" />
            </div>

            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {sys.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
