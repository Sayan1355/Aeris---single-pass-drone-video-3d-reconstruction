// ============================================================
// AERIS — Mission Hub Page (Phase 2)
// Full operational overview screen
// ============================================================

import { useNavigate } from 'react-router-dom';
import { Plus, UploadSimple } from '@phosphor-icons/react';

import { useAppStore } from '../stores/useAppStore';
import { MOCK_SUMMARY_STATS } from '../data/missions';

import { MissionSummaryStrip }    from '../components/mission/MissionSummaryStrip';
import { ActiveMissionPanel }     from '../components/mission/ActiveMissionPanel';
import { QuickActionsBar }        from '../components/mission/QuickActionsBar';
import { RecentMissionsTable }    from '../components/mission/RecentMissionsTable';
import { TelemetrySnapshotPanel } from '../components/telemetry/TelemetrySnapshotPanel';
import { FlightTrajectoryMap }    from '../components/geospatial/FlightTrajectoryMap';
import { PipelineStagesPanel }    from '../components/pipeline/PipelineStagesPanel';
import { SystemHealthPanel }      from '../components/status/SystemHealthPanel';
import { ActivityFeed }           from '../components/status/ActivityFeed';

// ---- Section heading utility --------------------------------
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

// ---- Page ---------------------------------------------------
export function MissionHubPage() {
  const navigate = useNavigate();
  const {
    activeMission,
    missions,
    telemetry,
    trajectory,
    currentPosition,
    pipelineStages,
    systemHealth,
    activity,
  } = useAppStore();

  return (
    <div
      role="main"
      id="hub-main"
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '16px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxSizing: 'border-box',
      }}
    >
      {/* ---- 1. Page header ---- */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            Mission Hub
          </h1>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
            Operational overview
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-secondary"
            aria-label="Import mission data"
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            <UploadSimple size={14} aria-hidden="true" /> Import Data
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/missions')}
            aria-label="Create new mission"
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            <Plus size={14} aria-hidden="true" /> New Mission
          </button>
        </div>
      </div>

      {/* ---- 2. Mission summary strip ---- */}
      <section aria-label="Mission summary statistics" style={{ flexShrink: 0 }}>
        <MissionSummaryStrip stats={MOCK_SUMMARY_STATS} />
      </section>

      {/* ---- 3. Active mission panel ---- */}
      {activeMission && (
        <section aria-label="Active mission" style={{ flexShrink: 0 }}>
          <ActiveMissionPanel mission={activeMission} stages={pipelineStages} />
        </section>
      )}

      {/* ---- 4 + 5. Telemetry snapshot + Flight map (side by side) ---- */}
      <section
        aria-label="Telemetry and flight map"
        style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12, flexShrink: 0 }}
      >
        <TelemetrySnapshotPanel telemetry={telemetry} />
        <FlightTrajectoryMap
          trajectory={trajectory}
          currentPosition={currentPosition}
          missionName={activeMission?.name ?? 'Mission'}
        />
      </section>

      {/* ---- 6 + 9 + 8. Pipeline + Activity + System Health (3-col) ---- */}
      <section
        aria-label="Pipeline, activity, and system health"
        style={{ display: 'grid', gridTemplateColumns: '1fr 260px 200px', gap: 12, flexShrink: 0 }}
      >
        <PipelineStagesPanel stages={pipelineStages} />
        <ActivityFeed entries={activity} maxItems={9} />
        <SystemHealthPanel health={systemHealth} />
      </section>

      {/* ---- 10. Quick actions ---- */}
      <section aria-label="Quick access to modules" style={{ flexShrink: 0 }}>
        <SectionLabel>Quick Access</SectionLabel>
        <QuickActionsBar />
      </section>

      {/* ---- 7. Recent missions table ---- */}
      <section aria-label="Recent missions" style={{ flexShrink: 0 }}>
        <RecentMissionsTable missions={missions} />
      </section>
    </div>
  );
}
