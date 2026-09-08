// ============================================================
// AERIS — System Status Bar
// Bottom strip showing real-time system indicators
// ============================================================

import {
  NavigationArrow,
  Broadcast,
  CloudSlash,
  Cloud,
  Cpu,
  Circle,
} from '@phosphor-icons/react';
import { useAppStore } from '../../stores/useAppStore';
import { connectionDotClass, connectionLabel } from '../../lib/utils';
import type { ConnectionState } from '../../types/telemetry';

interface StatusIndicatorProps {
  label: string;
  state: ConnectionState;
  icon: React.ReactNode;
}

function StatusIndicator({ label, state, icon }: StatusIndicatorProps) {
  const dotClass = connectionDotClass(state);
  const stateLabel = connectionLabel(state);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 5 }}
      role="status"
      aria-label={`${label}: ${stateLabel}`}
      title={`${label}: ${stateLabel}`}
    >
      <span
        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}
        aria-hidden="true"
      >
        {label}
      </span>
      <span
        className={`status-dot ${dotClass}`}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: state === 'connected' ? 'var(--status-success)'
               : state === 'degraded'   ? 'var(--status-warning)'
               : state === 'connecting' ? 'var(--status-active)'
               : 'var(--status-error)',
          letterSpacing: '0.06em',
        }}
        aria-hidden="true"
      >
        {stateLabel}
      </span>
    </div>
  );
}

// Visual separator
function Sep() {
  return (
    <div
      style={{ width: 1, height: 14, background: 'var(--border-base)', flexShrink: 0 }}
      aria-hidden="true"
    />
  );
}

export function StatusBar() {
  const { systemHealth, activeMission } = useAppStore();

  return (
    <footer
      role="contentinfo"
      aria-label="System status bar"
      style={{
        gridArea: 'statusbar',
        height: 'var(--statusbar-height)',
        background: 'var(--bg-header)',
        borderTop: '1px solid var(--border-base)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 14,
        flexShrink: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* ---- System indicators ---- */}
      <StatusIndicator
        label="GPS"
        state={systemHealth.gps}
        icon={<NavigationArrow size={11} aria-hidden="true" />}
      />
      <Sep />
      <StatusIndicator
        label="RTK"
        state={systemHealth.rtk}
        icon={<Circle size={11} weight="fill" aria-hidden="true" />}
      />
      <Sep />
      <StatusIndicator
        label="Telemetry"
        state={systemHealth.telemetry}
        icon={<Broadcast size={11} aria-hidden="true" />}
      />
      <Sep />
      <StatusIndicator
        label="Processing"
        state={systemHealth.processing}
        icon={<Cpu size={11} aria-hidden="true" />}
      />
      <Sep />
      <StatusIndicator
        label="API"
        state={systemHealth.api}
        icon={
          systemHealth.api === 'connected'
            ? <Cloud size={11} aria-hidden="true" />
            : <CloudSlash size={11} aria-hidden="true" />
        }
      />

      {/* ---- Spacer ---- */}
      <div style={{ flex: 1 }} aria-hidden="true" />

      {/* ---- Mission identifier ---- */}
      {activeMission && (
        <span
          style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
          aria-label={`Active mission: ${activeMission.id}`}
        >
          {activeMission.id}
        </span>
      )}

      <Sep />

      {/* ---- Build / version tag ---- */}
      <span
        style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}
        aria-label="Software version"
      >
        AERIS v2.4.0-PROD
      </span>
    </footer>
  );
}
