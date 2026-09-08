// ============================================================
// AERIS — Phase 8 System Event Log Feed Component
// Real-time timestamped event log stream with severity badges
// ============================================================

import React from 'react';
import { ListBullets } from '@phosphor-icons/react';
import type { TelemetryEvent } from '../types';

interface SystemEventFeedProps {
  events: TelemetryEvent[];
}

export const SystemEventFeed: React.FC<SystemEventFeedProps> = ({ events }) => {
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
        maxHeight: '280px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ListBullets size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            REAL-TIME TELEMETRY SYSTEM EVENT FEED
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {events.length} EVENTS LOGGED
        </span>
      </div>

      {/* Events Stream Box */}
      <div
        style={{
          background: 'var(--bg-app)',
          border: '1px solid var(--border-muted)',
          borderRadius: 'var(--radius-xs)',
          padding: '8px 10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
        }}
      >
        {events.map((evt) => (
          <div
            key={evt.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>[{evt.timestamp}]</span>
              <span
                style={{
                  fontWeight: 700,
                  color: evt.severity === 'CRITICAL' ? 'var(--status-error)' : evt.severity === 'WARNING' ? 'var(--status-warning)' : 'var(--accent-primary)',
                  background: evt.severity === 'CRITICAL' ? 'rgba(220,38,38,0.12)' : evt.severity === 'WARNING' ? 'rgba(217,119,6,0.12)' : 'rgba(14,165,233,0.12)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 9,
                }}
              >
                {evt.severity}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{evt.category}:</span>
              <span style={{ color: 'var(--text-primary)' }}>{evt.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
