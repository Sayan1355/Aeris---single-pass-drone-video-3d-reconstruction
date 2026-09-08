// ============================================================
// AERIS — Phase 8 Mission Progress Card Component
// Integrated operational progress metrics for flight, coverage, & reconstruction
// ============================================================

import React from 'react';
import { ChartPie } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface MissionProgressCardProps {
  telemetry: LiveTelemetryData;
}

export const MissionProgressCard: React.FC<MissionProgressCardProps> = ({ telemetry }) => {
  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChartPie size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            MISSION OPERATIONAL PROGRESS SYSTEM
          </span>
        </div>

        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          ELAPSED: <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{telemetry.elapsedTimeString}</span> • EST. REMAINING: <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{telemetry.estRemainingTimeString}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {/* Flight Trajectory Progress */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>FLIGHT TRAJECTORY</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{telemetry.flightProgressPercent}%</span>
          </div>
          <div style={{ height: 5, background: 'var(--border-base)', borderRadius: 2.5, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${telemetry.flightProgressPercent}%`, background: 'var(--accent-primary)', borderRadius: 2.5 }} />
          </div>
        </div>

        {/* Survey Coverage Progress */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>SURVEY COVERAGE</span>
            <span style={{ color: '#34D399', fontWeight: 700 }}>{telemetry.surveyCoveragePercent}%</span>
          </div>
          <div style={{ height: 5, background: 'var(--border-base)', borderRadius: 2.5, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${telemetry.surveyCoveragePercent}%`, background: '#34D399', borderRadius: 2.5 }} />
          </div>
        </div>

        {/* Live Reconstruction Sync Progress */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>ONLINE RECONSTRUCTION</span>
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>{telemetry.reconstructionProgressPercent}%</span>
          </div>
          <div style={{ height: 5, background: 'var(--border-base)', borderRadius: 2.5, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${telemetry.reconstructionProgressPercent}%`, background: '#FBBF24', borderRadius: 2.5 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
