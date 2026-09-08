// ============================================================
// AERIS — Phase 8 GNSS Quality Panel Component
// RTK Fix status, satellite count, HDOP, & 3D accuracy metrics
// ============================================================

import React from 'react';
import { Compass } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface GnssQualityPanelProps {
  telemetry: LiveTelemetryData;
}

export const GnssQualityPanel: React.FC<GnssQualityPanelProps> = ({ telemetry }) => {
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
          <Compass size={18} color="#38BDF8" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            GNSS / RTK POSITION QUALITY
          </span>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--status-success)',
            background: 'rgba(5,150,105,0.12)',
            border: '1px solid rgba(5,150,105,0.3)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          {telemetry.fixType.toUpperCase()} FIX
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>SATELLITES</span>
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{telemetry.satellites} SATS</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>HDOP</span>
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-success)' }}>{telemetry.hdop}</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>HORIZ. ACCURACY</span>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{telemetry.horizontalAccuracyM} m</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px 10px' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>VERT. ACCURACY</span>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{telemetry.verticalAccuracyM} m</span>
        </div>
      </div>
    </div>
  );
};
