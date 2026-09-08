// ============================================================
// AERIS — Phase 8 Telemetry Header Component
// Mission context, live stream indicator & active mission selector
// ============================================================

import React from 'react';
import { Waves, CaretDown, Broadcast } from '@phosphor-icons/react';
import { useAppStore } from '../../../stores/useAppStore';

interface TelemetryHeaderProps {
  uptimeSeconds: number;
}

function formatUptime(sec: number): string {
  const h = Math.floor(sec / 3600).toString().padStart(2, '0');
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export const TelemetryHeader: React.FC<TelemetryHeaderProps> = ({ uptimeSeconds }) => {
  const { activeMission, missions, setActiveMission } = useAppStore();

  const currentMission = activeMission || {
    id: 'AERIS-MSN-0247',
    name: 'Industrial Harbor Facility Survey',
  };

  return (
    <header
      style={{
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-base)',
        padding: '14px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Title & Subtitle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(14,165,233,0.12)',
            border: '1px solid rgba(14,165,233,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(14,165,233,0.15)',
          }}
        >
          <Waves size={24} weight="duotone" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              LIVE TELEMETRY
            </h1>

            {/* Pulsing Live Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(14,165,233,0.15)',
                border: '1px solid rgba(14,165,233,0.4)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 8px var(--accent-primary)',
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                ● LIVE (SIMULATED STREAM)
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              margin: '3px 0 0 0',
              fontWeight: 400,
            }}
          >
            Real-time UAV flight telemetry, sensor feeds, and online reconstruction synchronization.
          </p>
        </div>
      </div>

      {/* Mission Meta & Selectors */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {/* Mission Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 600 }}>
            MISSION ID
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={currentMission.id}
              onChange={(e) => {
                const found = missions.find((m) => m.id === e.target.value);
                if (found) setActiveMission(found);
              }}
              style={{
                appearance: 'none',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '5px 28px 5px 10px',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {missions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id} — {m.name}
                </option>
              ))}
            </select>
            <CaretDown
              size={12}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Mission Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 600 }}>
            MISSION STATUS
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.3)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-primary)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <Broadcast size={14} />
            <span>IN FLIGHT</span>
          </div>
        </div>

        {/* Flight Mode */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 600 }}>
            FLIGHT MODE
          </span>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            SURVEY
          </div>
        </div>

        {/* Uptime */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 600 }}>
            UPTIME
          </span>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-primary)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            {formatUptime(uptimeSeconds)}
          </div>
        </div>
      </div>
    </header>
  );
};
