// ============================================================
// AERIS — TelemetrySnapshot Panel
// Compact real-time UAV telemetry overview for Mission Hub
// Clearly separated from the full Telemetry screen (Phase 3)
// ============================================================

import {
  NavigationArrow,
  ArrowUp,
  Lightning,
  Speedometer,
  Compass,
  Cpu,
  VideoCamera,
  ArrowsDownUp,
} from '@phosphor-icons/react';
import type { TelemetrySnapshot } from '../../types/telemetry';
import { formatLat, formatLon } from '../../lib/utils';

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
  warn?: boolean;
}

function TelField({ icon, label, value, unit, accent, warn }: FieldProps) {
  const valueColor = accent
    ? 'var(--accent-primary)'
    : warn
      ? 'var(--status-warning)'
      : 'var(--text-primary)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: '8px 10px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-sm)',
        minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }} aria-hidden="true">
          {icon}
        </span>
        <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: valueColor,
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

interface Props {
  telemetry: TelemetrySnapshot;
}

export function TelemetrySnapshotPanel({ telemetry: t }: Props) {
  const gpsLabel =
    t.gpsFixType === 'rtk'
      ? 'RTK'
      : t.gpsFixType === 'fix3d'
        ? '3D Fix'
        : t.gpsFixType === 'fix2d'
          ? '2D Fix'
          : 'No Fix';

  const batteryWarn = t.batteryPercent < 30;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Live telemetry snapshot"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border-base)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="status-dot dot-active status-blink" style={{ width: 6, height: 6 }} aria-hidden="true" />
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Live Telemetry
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          WP {t.waypointIndex} / {t.waypointTotal}
        </span>
      </div>

      {/* Fields grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 6,
          padding: '10px',
        }}
      >
        <TelField icon={<NavigationArrow size={12} />} label="Latitude"     value={formatLat(t.latitude)} />
        <TelField icon={<NavigationArrow size={12} />} label="Longitude"    value={formatLon(t.longitude)} />
        <TelField icon={<ArrowUp size={12} />}         label="Altitude"     value={t.altitude.toFixed(1)} unit="m AGL" accent />
        <TelField icon={<Speedometer size={12} />}     label="Gnd Speed"    value={t.speed.toFixed(1)} unit="m/s" />
        <TelField icon={<Compass size={12} />}         label="Heading"      value={`${t.heading}°`} />

        <TelField icon={<Cpu size={12} />}             label="GPS"          value={gpsLabel} accent={t.gpsFixType === 'rtk'} />
        <TelField icon={<Cpu size={12} />}             label="Satellites"   value={String(t.satelliteCount)} />
        <TelField icon={<Cpu size={12} />}             label="HDOP"         value={t.hdop.toFixed(1)} />
        <TelField icon={<Lightning size={12} />}       label="Battery"      value={`${t.batteryPercent}%`} warn={batteryWarn} unit={`${t.batteryVoltage.toFixed(1)}V`} />
        <TelField icon={<VideoCamera size={12} />}     label="Camera"       value={t.cameraState.toUpperCase()} accent={t.cameraState === 'recording'} />

        <TelField icon={<ArrowsDownUp size={12} />}   label="Vert. Speed"  value={t.verticalSpeed.toFixed(1)} unit="m/s" />
        <TelField icon={<Compass size={12} />}        label="Pitch"        value={`${t.pitch.toFixed(1)}°`} />
        <TelField icon={<Compass size={12} />}        label="Roll"         value={`${t.roll.toFixed(1)}°`} />
        <TelField icon={<Cpu size={12} />}            label="Link"         value={`${t.signalStrength}%`} accent={t.signalStrength > 80} warn={t.signalStrength < 60} />
        <TelField icon={<Cpu size={12} />}            label="Latency"      value={`${t.latencyMs}`} unit="ms" warn={t.latencyMs > 200} />
      </div>
    </div>
  );
}
