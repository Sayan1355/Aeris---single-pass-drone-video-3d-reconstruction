// ============================================================
// AERIS — Top Command Bar
// Fixed header: brand, mission context, system status, time
// ============================================================

import { useState, useEffect } from 'react';
import {
  CaretDown,
  WifiHigh,
  BellSimple,
  User,
  ArrowsOut,
  Minus,
} from '@phosphor-icons/react';
import { useAppStore } from '../../stores/useAppStore';

// Simulated UTC clock — updates every second
function UTCClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const utc = time.toISOString().slice(0, 19).replace('T', ' ');
  return (
    <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
      {utc}&nbsp;<span style={{ color: 'var(--text-muted)' }}>UTC</span>
    </span>
  );
}

export function TopBar() {
  const { activeMission, systemHealth } = useAppStore();

  // Simple derived connection indicator
  const apiOk = systemHealth.api === 'connected';
  const telOk = systemHealth.telemetry === 'connected';
  const overallOk = apiOk && telOk;

  return (
    <header
      role="banner"
      style={{
        gridArea: 'topbar',
        height: 'var(--topbar-height)',
        background: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-base)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px 0 0',
        gap: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* ---- Brand Wordmark (matches nav width) ---- */}
      <div
        style={{
          width: 'var(--nav-width)',
          height: '100%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderRight: '1px solid var(--border-base)',
          gap: '10px',
        }}
      >
        {/* Logotype mark */}
        <div
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {/* Simplified UAV silhouette / crosshair */}
            <line x1="8" y1="1" x2="8" y2="15" stroke="#07090E" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="1" y1="8" x2="15" y2="8" stroke="#07090E" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="2.5" fill="#07090E"/>
            <line x1="3" y1="3" x2="5.5" y2="5.5" stroke="#07090E" strokeWidth="1" strokeLinecap="round"/>
            <line x1="13" y1="3" x2="10.5" y2="5.5" stroke="#07090E" strokeWidth="1" strokeLinecap="round"/>
            <line x1="3" y1="13" x2="5.5" y2="10.5" stroke="#07090E" strokeWidth="1" strokeLinecap="round"/>
            <line x1="13" y1="13" x2="10.5" y2="10.5" stroke="#07090E" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '0.12em', lineHeight: 1 }}>
            AERIS
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.18em', lineHeight: 1, marginTop: 2, fontWeight: 500 }}>
            UAV RECONSTRUCTION
          </div>
        </div>
      </div>

      {/* ---- Mission Context Selector ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 16px',
          borderRight: '1px solid var(--border-base)',
          height: '100%',
          minWidth: 260,
          cursor: 'pointer',
        }}
        role="button"
        aria-label="Switch active mission"
        tabIndex={0}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
            Active Mission
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              className="status-dot dot-active status-blink"
              style={{ width: 6, height: 6 }}
              aria-hidden="true"
            />
            <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.04em' }}>
              {activeMission?.name ?? '— NO MISSION —'}
            </span>
          </div>
          {activeMission && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 0 }}>
              {activeMission.site}
            </div>
          )}
        </div>
        <CaretDown size={14} weight="bold" style={{ color: 'var(--text-muted)', marginLeft: 4, flexShrink: 0 }} aria-hidden="true" />
      </div>

      {/* ---- Drone / System quick info ---- */}
      {activeMission && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '0 14px',
            borderRight: '1px solid var(--border-base)',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
              Platform
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              {activeMission.droneId}
            </div>
          </div>
        </div>
      )}

      {/* ---- Spacer ---- */}
      <div style={{ flex: 1 }} />

      {/* ---- System Link Status ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 14px',
          height: '100%',
          borderRight: '1px solid var(--border-base)',
        }}
      >
        <WifiHigh
          size={14}
          weight={overallOk ? 'fill' : 'regular'}
          style={{ color: overallOk ? 'var(--status-success)' : 'var(--status-error)' }}
          aria-hidden="true"
        />
        <span style={{ fontSize: 11, color: overallOk ? 'var(--status-success)' : 'var(--status-error)', fontWeight: 600, letterSpacing: '0.06em' }}>
          {overallOk ? 'SYSTEMS OK' : 'CHECK LINK'}
        </span>
      </div>

      {/* ---- UTC Clock ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          height: '100%',
          borderRight: '1px solid var(--border-base)',
        }}
        aria-label="Current UTC time"
      >
        <UTCClock />
      </div>

      {/* ---- Notifications ---- */}
      <button
        className="btn btn-ghost"
        style={{ padding: '0 10px', height: '100%', borderRadius: 0, position: 'relative' }}
        aria-label="Notifications (3 unread)"
        title="Notifications"
      >
        <BellSimple size={16} weight="regular" style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
        {/* Notification badge */}
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 6,
            width: 7,
            height: 7,
            background: 'var(--status-warning)',
            borderRadius: '50%',
            border: '1px solid var(--bg-header)',
          }}
          aria-hidden="true"
        />
      </button>

      {/* ---- Operator / User ---- */}
      <button
        className="btn btn-ghost"
        style={{
          gap: 8,
          padding: '0 12px',
          height: '100%',
          borderRadius: 0,
          borderLeft: '1px solid var(--border-base)',
        }}
        aria-label="Operator menu"
      >
        {/* Avatar */}
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 4,
            background: 'rgba(14,165,233,0.18)',
            border: '1px solid rgba(14,165,233,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--accent-primary)',
            letterSpacing: '0.04em',
          }}
          aria-hidden="true"
        >
          AM
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1 }}>A. Mehta</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1 }}>Operator</span>
        </div>
        <User size={14} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
      </button>

      {/* ---- Window Controls (optional decorative) ---- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 10px', borderLeft: '1px solid var(--border-base)', height: '100%' }}>
        <button className="btn btn-ghost" style={{ padding: '4px', borderRadius: 2, minWidth: 0 }} aria-label="Minimize">
          <Minus size={12} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
        </button>
        <button className="btn btn-ghost" style={{ padding: '4px', borderRadius: 2, minWidth: 0 }} aria-label="Fullscreen">
          <ArrowsOut size={12} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
