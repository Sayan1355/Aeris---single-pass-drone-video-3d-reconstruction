// ============================================================
// AERIS — Phase 8 UAV Status Panel Component
// Airframe state, battery level, power meters, & communication link
// ============================================================

import React from 'react';
import { Cpu, BatteryCharging, CellSignalHigh } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface UavStatusPanelProps {
  telemetry: LiveTelemetryData;
}

export const UavStatusPanel: React.FC<UavStatusPanelProps> = ({ telemetry }) => {
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
          <Cpu size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            AIRFRAME &amp; POWER SYSTEM (AERIS-X1)
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
          {telemetry.armStatus}
        </span>
      </div>

      {/* Battery Section */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BatteryCharging size={14} color="var(--status-success)" />
            BATTERY CAPACITY
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-success)' }}>
            {telemetry.batteryPercent}% ({telemetry.batteryRemainingMin} min remaining)
          </span>
        </div>

        <div style={{ height: 6, background: 'var(--border-base)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${telemetry.batteryPercent}%`, background: 'var(--status-success)', borderRadius: 3 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <span>VOLTAGE: {telemetry.batteryVoltageV} V</span>
          <span>CURRENT: {telemetry.batteryCurrentA} A</span>
        </div>
      </div>

      {/* Communication Link */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>TELEMETRY LINK QUALITY</span>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {telemetry.linkQualityPercent}% ({telemetry.latencyMs} ms latency)
          </span>
        </div>

        <CellSignalHigh size={20} color="var(--accent-primary)" />
      </div>
    </div>
  );
};
