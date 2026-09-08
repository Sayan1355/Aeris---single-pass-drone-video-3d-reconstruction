// ============================================================
// AERIS — SystemHealthPanel
// Compact 7-subsystem health indicator for Mission Hub
// ============================================================

import {
  NavigationArrow,
  Circle,
  Broadcast,
  VideoCamera,
  Cpu,
  HardDrive,
  Cloud,
} from '@phosphor-icons/react';
import type { SystemHealth, ConnectionState } from '../../types/telemetry';
import { connectionDotClass, connectionLabel, connectionColor, formatGB } from '../../lib/utils';

interface HealthRowProps {
  icon: React.ReactNode;
  label: string;
  state: ConnectionState;
  detail?: string;
}

function HealthRow({ icon, label, state, detail }: HealthRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 12px',
      }}
      role="status"
      aria-label={`${label}: ${connectionLabel(state)}`}
    >
      <span style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }} aria-hidden="true">
        {icon}
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, minWidth: 0 }}>
        {label}
      </span>
      {detail && (
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {detail}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span className={`status-dot ${connectionDotClass(state)}`} aria-hidden="true" />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            color: connectionColor(state),
            letterSpacing: '0.06em',
            minWidth: 52,
            textAlign: 'right',
          }}
          aria-hidden="true"
        >
          {connectionLabel(state)}
        </span>
      </div>
    </div>
  );
}

interface Props {
  health: SystemHealth;
}

export function SystemHealthPanel({ health }: Props) {
  const storageUsedPct =
    health.storageUsedGB !== undefined && health.storageTotalGB
      ? (health.storageUsedGB / health.storageTotalGB) * 100
      : null;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="System health status"
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid var(--border-base)',
          fontSize: 10,
          color: 'var(--text-muted)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        System Health
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HealthRow icon={<NavigationArrow size={13} />} label="GPS"          state={health.gps} />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow icon={<Circle size={13} weight="fill" />} label="RTK"    state={health.rtk} />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow
          icon={<Broadcast size={13} />}
          label="Telemetry"
          state={health.telemetry}
        />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow
          icon={<VideoCamera size={13} />}
          label="Video Stream"
          state={health.videoStream}
          detail={health.videoLatencyMs !== undefined ? `${health.videoLatencyMs}ms` : undefined}
        />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow
          icon={<Cpu size={13} />}
          label="Processing"
          state={health.processing}
          detail={health.processingCpuPct !== undefined ? `CPU ${health.processingCpuPct}%` : undefined}
        />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow
          icon={<HardDrive size={13} />}
          label="Storage"
          state={health.storage}
          detail={
            health.storageUsedGB !== undefined && health.storageTotalGB
              ? `${formatGB(health.storageUsedGB)} / ${formatGB(health.storageTotalGB)}`
              : undefined
          }
        />
        <div style={{ height: 1, background: 'var(--border-muted)', margin: '0 12px' }} />
        <HealthRow
          icon={<Cloud size={13} />}
          label="API"
          state={health.api}
          detail={health.apiLatencyMs !== undefined ? `${health.apiLatencyMs}ms` : undefined}
        />
      </div>

      {/* Storage bar */}
      {storageUsedPct !== null && (
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-base)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 5,
              fontSize: 10,
              color: 'var(--text-muted)',
            }}
          >
            <span>Storage</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{storageUsedPct.toFixed(0)}%</span>
          </div>
          <div style={{ height: 3, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${storageUsedPct}%`,
                background:
                  storageUsedPct > 90
                    ? 'var(--status-error)'
                    : storageUsedPct > 75
                      ? 'var(--status-warning)'
                      : 'var(--status-active)',
                borderRadius: 2,
                transition: 'width 0.4s',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  );
}
