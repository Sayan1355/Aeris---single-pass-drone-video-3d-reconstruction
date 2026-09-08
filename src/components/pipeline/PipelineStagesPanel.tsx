// ============================================================
// AERIS — PipelineStagesPanel
// Full 8-stage reconstruction pipeline overview for Mission Hub
// ============================================================

import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Circle, XCircle, SpinnerGap } from '@phosphor-icons/react';
import type { PipelineStage } from '../../types/reconstruction';
import { formatDuration } from '../../lib/utils';

interface Props {
  stages: PipelineStage[];
}

function StageIcon({ status }: { status: PipelineStage['status'] }) {
  const size = 16;
  switch (status) {
    case 'completed':
      return <CheckCircle size={size} weight="fill" style={{ color: 'var(--status-success)', flexShrink: 0 }} />;
    case 'running':
      return (
        <SpinnerGap
          size={size}
          weight="bold"
          className="spinner"
          style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
        />
      );
    case 'failed':
      return <XCircle size={size} weight="fill" style={{ color: 'var(--status-error)', flexShrink: 0 }} />;
    default:
      return <Circle size={size} style={{ color: 'var(--status-idle)', flexShrink: 0 }} />;
  }
}

export function PipelineStagesPanel({ stages }: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Reconstruction pipeline stages"
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
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Reconstruction Pipeline
        </span>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/pipeline')}
          style={{ fontSize: 11, padding: '3px 8px' }}
          aria-label="View full pipeline"
        >
          View Pipeline <ArrowRight size={11} aria-hidden="true" />
        </button>
      </div>

      {/* Stage rows */}
      <div>
        {stages.map((stage, idx) => {
          const isRunning = stage.status === 'running';
          const isDone = stage.status === 'completed';
          const isFailed = stage.status === 'failed';
          const isPending = stage.status === 'pending';

          return (
            <div
              key={stage.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 32px 1fr auto',
                alignItems: 'start',
                gap: '0 10px',
                padding: '9px 14px',
                borderBottom: idx < stages.length - 1 ? '1px solid var(--border-muted)' : 'none',
                background: isRunning ? 'rgba(14,165,233,0.04)' : 'transparent',
                transition: 'background 0.2s',
                opacity: isPending ? 0.55 : 1,
              }}
              role="listitem"
              aria-label={`Stage ${stage.order}: ${stage.name} — ${stage.status}`}
            >
              {/* Stage icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1 }}>
                <StageIcon status={stage.status} />
              </div>

              {/* Order number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: isRunning ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  paddingTop: 2,
                }}
              >
                {String(stage.order).padStart(2, '0')}
              </div>

              {/* Stage name + details */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: isRunning ? 600 : isDone ? 500 : 400,
                    color: isRunning
                      ? 'var(--accent-primary)'
                      : isDone
                        ? 'var(--text-secondary)'
                        : isFailed
                          ? 'var(--status-error)'
                          : 'var(--text-muted)',
                    marginBottom: 2,
                  }}
                >
                  {stage.name}
                </div>

                {/* Running progress bar */}
                {isRunning && stage.progress !== undefined && (
                  <div style={{ marginTop: 4, marginBottom: 4 }}>
                    <div
                      style={{
                        height: 2,
                        background: 'var(--border-base)',
                        borderRadius: 1,
                        overflow: 'hidden',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${stage.progress}%`,
                          background: 'var(--accent-primary)',
                          borderRadius: 1,
                          transition: 'width 0.5s ease-out',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}

                {/* Output summary or description */}
                {(stage.outputSummary || (isRunning && stage.outputSummary)) && (
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {stage.outputSummary}
                  </div>
                )}
                {isPending && (
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {stage.description}
                  </div>
                )}
              </div>

              {/* Right: duration / progress value */}
              <div style={{ textAlign: 'right', paddingTop: 1 }}>
                {isDone && stage.durationMs !== undefined && (
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {formatDuration(stage.durationMs)}
                  </span>
                )}
                {isRunning && stage.progress !== undefined && (
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--accent-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stage.progress}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
