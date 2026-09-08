// ============================================================
// AERIS — Pipeline Timeline
// Visually impressive horizontal 8-stage reconstruction pipeline
// ============================================================

import { ArrowRight } from '@phosphor-icons/react';
import type { PipelineStage } from '../../../types/reconstruction';
import { useReconStore } from '../hooks/useReconStore';
import { formatDuration } from '../../../lib/utils';

interface Props {
  stages: PipelineStage[];
}

const STAGE_COLORS = {
  completed: { bg: 'rgba(5,150,105,0.1)',  border: 'rgba(5,150,105,0.35)',  text: 'var(--status-success)', dot: 'var(--status-success)' },
  running:   { bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.45)', text: 'var(--accent-primary)', dot: 'var(--accent-primary)'  },
  pending:   { bg: 'rgba(14,22,36,0.6)',    border: 'rgba(26,37,53,0.8)',    text: 'var(--text-muted)',    dot: 'var(--status-idle)'    },
  failed:    { bg: 'rgba(220,38,38,0.1)',   border: 'rgba(220,38,38,0.35)', text: 'var(--status-error)',  dot: 'var(--status-error)'   },
  skipped:   { bg: 'rgba(14,22,36,0.4)',    border: 'rgba(26,37,53,0.6)',   text: 'var(--text-muted)',    dot: 'var(--status-idle)'    },
};

function StageCard({ stage, isSelected, onSelect }: {
  stage: PipelineStage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const colors = STAGE_COLORS[stage.status];
  const isRunning = stage.status === 'running';
  const isDone = stage.status === 'completed';

  return (
    <button
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`Stage ${stage.order}: ${stage.name} — ${stage.status}`}
      style={{
        flex: isRunning ? 2.2 : isDone ? 1.1 : 1,
        minWidth: isRunning ? 220 : 100,
        background: isSelected
          ? (isRunning ? 'rgba(14,165,233,0.18)' : colors.bg)
          : colors.bg,
        border: `1px solid ${isSelected ? (isRunning ? 'rgba(14,165,233,0.6)' : colors.border) : colors.border}`,
        borderRadius: 'var(--radius-sm)',
        padding: isRunning ? '10px 14px' : '8px 10px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 200ms ease-out',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: isRunning ? 6 : 4,
        boxShadow: isRunning ? '0 0 0 1px rgba(14,165,233,0.2), 0 4px 16px -4px rgba(14,165,233,0.15)' : 'none',
      }}
    >
      {/* Stage number + dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span
          style={{
            fontSize: 10,
            color: colors.text,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '0.06em',
          }}
        >
          {String(stage.order).padStart(2, '0')}
        </span>
        <span
          className={`status-dot ${isRunning ? 'status-blink' : ''}`}
          style={{ backgroundColor: colors.dot, width: 5, height: 5 }}
          aria-hidden="true"
        />
        {isRunning && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--accent-primary)',
            }}
          >
            {stage.progress}%
          </span>
        )}
        {isDone && stage.durationMs && (
          <span style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {formatDuration(stage.durationMs)}
          </span>
        )}
      </div>

      {/* Stage name */}
      <div
        style={{
          fontSize: isRunning ? 12 : 10,
          fontWeight: isRunning ? 700 : 500,
          color: colors.text,
          lineHeight: 1.3,
          whiteSpace: isRunning ? 'normal' : 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {stage.shortLabel}
      </div>

      {/* Active stage — extended info */}
      {isRunning && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.3 }}>
            {stage.name}
          </div>
          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(14,165,233,0.15)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${stage.progress ?? 0}%`,
                background: 'var(--accent-primary)',
                borderRadius: 2,
                transition: 'width 0.5s ease-out',
              }}
              aria-hidden="true"
            />
          </div>
          {/* Frames */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>12,842 / 18,400 frames</span>
            <span style={{ color: 'var(--accent-primary)' }}>ETA 04:32</span>
          </div>
        </div>
      )}

      {/* Completed tick */}
      {isDone && (
        <div style={{ fontSize: 9, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
          ✓ Done
        </div>
      )}

      {/* Bottom progress line for running stage */}
      {isRunning && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            width: `${stage.progress ?? 0}%`,
            background: 'var(--accent-primary)',
            borderRadius: '0 0 2px 0',
            transition: 'width 0.5s ease-out',
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export function PipelineTimeline({ stages }: Props) {
  const { activeStageId, setActiveStageId } = useReconStore();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '8px 12px 10px',
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border-base)',
      }}
      role="region"
      aria-label="Reconstruction pipeline stages"
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Reconstruction Pipeline
        </span>
        <div style={{ display: 'flex', gap: 12, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <span>Stage 5 / 8 — <span style={{ color: 'var(--accent-primary)' }}>3DGS & Dense Reconstruction</span></span>
          <span>Coverage: <span style={{ color: 'var(--text-secondary)' }}>72.4%</span></span>
          <span>GSD: <span style={{ color: 'var(--text-secondary)' }}>3.2 cm/px</span></span>
        </div>
      </div>

      {/* Stage cards + connectors */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
        {stages.map((stage, i) => (
          <>
            <StageCard
              key={stage.id}
              stage={stage}
              isSelected={activeStageId === stage.id}
              onSelect={() => setActiveStageId(stage.id)}
            />
            {i < stages.length - 1 && (
              <div
                key={`conn-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: stage.status === 'completed' ? 'var(--status-success)' : 'var(--border-strong)',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
                aria-hidden="true"
              >
                <ArrowRight size={12} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
