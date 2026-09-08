// ============================================================
// AERIS — ActiveMissionPanel
// Prominent active-mission card with all operational metadata
// ============================================================

import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Drone,
  Timer,
  Image,
  ArrowsOut,
  Gauge,
  ArrowUp,
} from '@phosphor-icons/react';
import type { Mission } from '../../types/mission';
import type { PipelineStage } from '../../types/reconstruction';
import {
  missionStatusBadgeClass,
  formatDuration,
  formatUTC,
  stageBarColor,
} from '../../lib/utils';

// ---- Metadata field row ----
interface MetaRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}
function MetaRow({ icon, label, value, mono, accent }: MetaRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: 'var(--text-muted)', flexShrink: 0, display: 'flex' }} aria-hidden="true">
        {icon}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 90, flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 12,
          color: accent ? 'var(--accent-primary)' : 'var(--text-secondary)',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
          fontWeight: mono ? 600 : 400,
          letterSpacing: mono ? '0.03em' : 0,
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface Props {
  mission: Mission;
  stages: PipelineStage[];
}

export function ActiveMissionPanel({ mission, stages }: Props) {
  const navigate = useNavigate();

  const activeStage = stages.find((s) => s.status === 'running');
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const elapsed = mission.startedAt
    ? formatDuration(Date.now() - new Date(mission.startedAt).getTime())
    : '—';

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(14,165,233,0.18)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label={`Active mission: ${mission.name}`}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-base)',
          background: 'var(--bg-panel)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Live pulse */}
          <span
            className="status-dot dot-active status-blink"
            style={{ width: 7, height: 7 }}
            aria-label="Mission is live"
          />
          <span
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Active Mission
          </span>
          <span className={`badge ${missionStatusBadgeClass(mission.status)}`}>
            {mission.status.toUpperCase()}
          </span>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/pipeline')}
          aria-label="View reconstruction pipeline"
          style={{ fontSize: 12, padding: '5px 10px' }}
        >
          View Pipeline <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 0 }}>
        {/* Left: identity + metadata */}
        <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-base)' }}>
          {/* Mission ID + site */}
          <div style={{ marginBottom: 12 }}>
            <h2
              style={{
                margin: '0 0 4px',
                fontSize: 18,
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                letterSpacing: '0.06em',
              }}
            >
              {mission.name}
            </h2>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {mission.site}
            </div>
          </div>

          {/* Metadata grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px 20px',
            }}
          >
            <MetaRow icon={<Drone size={13} />} label="Platform" value={mission.droneId} mono />
            <MetaRow icon={<Timer size={13} />} label="Elapsed" value={elapsed} mono accent />
            <MetaRow icon={<MapPin size={13} />} label="Site" value={mission.site.split(' — ')[0]} />
            {mission.altitudeM !== undefined && (
              <MetaRow icon={<ArrowUp size={13} />} label="Altitude" value={`${mission.altitudeM} m AGL`} mono />
            )}
            {mission.framesTotal !== undefined && (
              <MetaRow
                icon={<Image size={13} />}
                label="Frames"
                value={`${mission.framesProcessed?.toLocaleString()} / ${mission.framesTotal?.toLocaleString()}`}
                mono
              />
            )}
            {mission.coverageHa !== undefined && (
              <MetaRow icon={<ArrowsOut size={13} />} label="Coverage" value={`${mission.coverageHa.toFixed(1)} ha`} mono />
            )}
            {mission.gsdCm !== undefined && (
              <MetaRow icon={<Gauge size={13} />} label="GSD" value={`${mission.gsdCm.toFixed(1)} cm/px`} mono accent />
            )}
            <MetaRow
              icon={<Timer size={13} />}
              label="Started"
              value={mission.startedAt ? formatUTC(mission.startedAt) : '—'}
            />
          </div>
        </div>

        {/* Right: pipeline progress column */}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Stage count header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Pipeline
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {completedCount} / {stages.length}
            </span>
          </div>

          {/* Segmented bar */}
          <div style={{ display: 'flex', gap: 3 }}>
            {stages.map((stage) => (
              <div
                key={stage.id}
                style={{
                  flex: 1,
                  height: 5,
                  borderRadius: 2,
                  background: stageBarColor(stage.status),
                  transition: 'background 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                title={`${stage.order}. ${stage.name}: ${stage.status}`}
                aria-label={`Stage ${stage.order} ${stage.name}: ${stage.status}`}
              >
                {/* Animated fill for running stage */}
                {stage.status === 'running' && stage.progress !== undefined && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: `${stage.progress}%`,
                      background: 'var(--status-active)',
                      transition: 'width 0.5s ease-out',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Active stage detail */}
          {activeStage && (
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(14,165,233,0.15)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span className="status-dot dot-active status-blink" style={{ width: 6, height: 6 }} aria-hidden="true" />
                <span style={{ fontSize: 10, color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Stage {activeStage.order} / {stages.length}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 2 }}>
                {activeStage.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, lineHeight: 1.4 }}>
                {activeStage.description}
              </div>
              {activeStage.progress !== undefined && (
                <>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: 3,
                      background: 'var(--border-base)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${activeStage.progress}%`,
                        background: 'var(--accent-primary)',
                        borderRadius: 2,
                        transition: 'width 0.5s ease-out',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {activeStage.outputSummary ?? ''}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                      }}
                    >
                      {activeStage.progress}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* All stage list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
            {stages.map((stage) => (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  opacity: stage.status === 'pending' ? 0.45 : 1,
                }}
              >
                <span
                  className={`status-dot ${
                    stage.status === 'completed' ? 'dot-success'
                    : stage.status === 'running'  ? 'dot-active status-blink'
                    : stage.status === 'failed'   ? 'dot-error'
                    : 'dot-idle'
                  }`}
                  style={{ width: 5, height: 5, flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', flexShrink: 0, minWidth: 40 }}>
                  {String(stage.order).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: stage.status === 'running'
                      ? 'var(--accent-primary)'
                      : stage.status === 'completed'
                        ? 'var(--text-secondary)'
                        : 'var(--text-muted)',
                    fontWeight: stage.status === 'running' ? 600 : 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stage.name}
                </span>
                {stage.status === 'completed' && stage.durationMs && (
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 'auto', flexShrink: 0 }}>
                    {formatDuration(stage.durationMs)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
