// ============================================================
// AERIS — Phase 8 Live Telemetry / Flight Operations Main Workspace
// Operator real-time mission console during active UAV flight
// ============================================================


import { useTelemetrySimulation } from './hooks/useTelemetrySimulation';
import { TelemetryHeader } from './components/TelemetryHeader';
import { FlightMapViewport } from './components/FlightMapViewport';
import { LiveTelemetryStrip } from './components/LiveTelemetryStrip';
import { UavStatusPanel } from './components/UavStatusPanel';
import { GnssQualityPanel } from './components/GnssQualityPanel';
import { CameraTelemetryPanel } from './components/CameraTelemetryPanel';
import { LiveReconstructionStatus } from './components/LiveReconstructionStatus';
import { MissionProgressCard } from './components/MissionProgressCard';
import { TelemetryAnalyticsCharts } from './components/TelemetryAnalyticsCharts';
import { SystemEventFeed } from './components/SystemEventFeed';
import { SystemHealthMatrix } from './components/SystemHealthMatrix';
import { OperatorControlsBar } from './components/OperatorControlsBar';

export function LiveTelemetryPage() {
  const { telemetry, events, history, health, isPaused, togglePauseCapture } = useTelemetrySimulation();

  return (
    <div
      role="main"
      id="telemetry-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
      }}
    >
      {/* 1. Operation Header */}
      <TelemetryHeader uptimeSeconds={telemetry.uptimeSeconds} />

      {/* Main Content Workspace */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* 2. Operator Controls Bar */}
        <OperatorControlsBar isPaused={isPaused} onTogglePause={togglePauseCapture} />

        {/* 3. Operational Telemetry Strip */}
        <LiveTelemetryStrip telemetry={telemetry} />

        {/* 4. Primary Flight Map Viewport */}
        <FlightMapViewport telemetry={telemetry} />

        {/* 5. In-flight Reconstruction Pipeline Sync */}
        <LiveReconstructionStatus telemetry={telemetry} />

        {/* 6. Mission Progress System */}
        <MissionProgressCard telemetry={telemetry} />

        {/* 7. Grid: Airframe Status & GNSS Position Quality */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          <UavStatusPanel telemetry={telemetry} />
          <GnssQualityPanel telemetry={telemetry} />
        </div>

        {/* 8. Grid: Camera Sensor & System Health Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          <CameraTelemetryPanel telemetry={telemetry} />
          <SystemHealthMatrix health={health} />
        </div>

        {/* 9. Real-Time Telemetry Trend Analytics Charts */}
        <TelemetryAnalyticsCharts history={history} />

        {/* 10. System Event Feed */}
        <SystemEventFeed events={events} />
      </div>
    </div>
  );
}
