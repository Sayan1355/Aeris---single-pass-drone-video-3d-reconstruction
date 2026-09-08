// ============================================================
// AERIS — Stage Inspector (right panel)
// GPU metrics, stage detail, throughput for the active stage
// ============================================================

import { useRef, useEffect, useState } from 'react';
import { Lightning, Cpu, Timer, CheckCircle, Circle, XCircle, SpinnerGap } from '@phosphor-icons/react';
import type { PipelineStage } from '../../../types/reconstruction';
import type { StageMetrics } from '../types';
import { formatDuration, formatRelativeTime } from '../../../lib/utils';

// ---- Gauge bar (horizontal) ---------------------------------

function GaugeBar({ label, value, max, unit, warnAt, critAt }: {
  label: string;
  value: number;
  max: number;
  unit: string;
  warnAt?: number;
  critAt?: number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const color =
    critAt && value >= critAt ? 'var(--status-error)'
    : warnAt && value >= warnAt ? 'var(--status-warning)'
    : 'var(--accent-primary)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          {value.toFixed(value < 10 ? 1 : 0)}<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> {unit}</span>
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color,
          borderRadius: 2, transition: 'width 0.4s ease-out, background 0.3s',
        }} aria-hidden="true" />
      </div>
    </div>
  );
}

// ---- Metric row ---------------------------------------------

function MetricRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
      <span style={{
        fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600,
        color: accent ? 'var(--accent-primary)' : 'var(--text-secondary)',
        textAlign: 'right',
      }}>{value}</span>
    </div>
  );
}

// ---- Stage status icon --------------------------------------

function StageStatusIcon({ status }: { status: PipelineStage['status'] }) {
  const sz = 14;
  switch (status) {
    case 'completed': return <CheckCircle size={sz} weight="fill" style={{ color: 'var(--status-success)' }} />;
    case 'running':   return <SpinnerGap size={sz} weight="bold" className="spinner" style={{ color: 'var(--accent-primary)' }} />;
    case 'failed':    return <XCircle size={sz} weight="fill" style={{ color: 'var(--status-error)' }} />;
    default:          return <Circle size={sz} style={{ color: 'var(--status-idle)' }} />;
  }
}

// ---- Animated throughput sparkline --------------------------

function ThroughputSparkline({ baseFps }: { baseFps: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const histRef = useRef<number[]>(Array.from({ length: 40 }, (_, i) =>
    baseFps + Math.sin(i * 0.4) * 4 + Math.random() * 3
  ));

  useEffect(() => {
    const id = setInterval(() => {
      const last = histRef.current[histRef.current.length - 1];
      const next = Math.max(20, last + (Math.random() - 0.48) * 6);
      histRef.current = [...histRef.current.slice(1), next];

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const vals = histRef.current;
      const mn = Math.min(...vals) - 2;
      const mx = Math.max(...vals) + 2;

      ctx.beginPath();
      vals.forEach((v, i) => {
        const x = (i / (vals.length - 1)) * w;
        const y = h - ((v - mn) / (mx - mn)) * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = 'rgba(14,165,233,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Fill under
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = 'rgba(14,165,233,0.08)';
      ctx.fill();
    }, 400);
    return () => clearInterval(id);
  }, [baseFps]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={32}
      style={{ width: '100%', height: 32, display: 'block' }}
      aria-label="GPU throughput sparkline"
    />
  );
}

// ---- Main component -----------------------------------------

interface Props {
  stage: PipelineStage | null;
  metrics: StageMetrics;
  allStages: PipelineStage[];
}

export function StageInspector({ stage, metrics, allStages }: Props) {
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    if (!metrics.startedAt) return;
    const tick = () => {
      const ms = Date.now() - new Date(metrics.startedAt).getTime();
      setElapsed(formatDuration(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [metrics.startedAt]);

  const storagePct = 45; // mock

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Stage inspector panel"
    >
      {/* Header */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-base)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <Cpu size={13} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Stage Inspector
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Active stage section */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-muted)' }}>
          {stage ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <StageStatusIcon status={stage.status} />
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  STAGE {stage.order} / {allStages.length}
                </span>
                <span className={`badge badge-${stage.status === 'running' ? 'active' : stage.status === 'completed' ? 'success' : 'idle'}`}
                  style={{ marginLeft: 'auto', fontSize: 9 }}>
                  {stage.status.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                {stage.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>
                {stage.description}
              </div>

              {stage.status === 'running' && stage.progress !== undefined && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {stage.progress}%
                    </span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${stage.progress}%`, background: 'var(--accent-primary)',
                      borderRadius: 2, transition: 'width 0.5s ease-out',
                    }} aria-hidden="true" />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <MetricRow label="Started" value={stage.startedAt ? formatRelativeTime(stage.startedAt) : '—'} />
                <MetricRow label="Elapsed" value={elapsed} accent />
                <MetricRow label="ETA" value={`≈ ${formatDuration(metrics.estimatedRemainingMs)}`} />
                <MetricRow label="Frames in" value={`${metrics.framesProcessed.toLocaleString()} / ${metrics.framesTotal.toLocaleString()}`} />
              </div>
            </>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
              Select a stage to inspect
            </div>
          )}
        </div>

        {/* GPU section */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Lightning size={11} style={{ color: 'var(--status-warning)' }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              GPU
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
              {metrics.gpuModel.replace('NVIDIA ', '')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <GaugeBar
              label="GPU Utilization"
              value={metrics.gpuUtilizationPct}
              max={100}
              unit="%"
              warnAt={90}
              critAt={98}
            />
            <GaugeBar
              label="VRAM"
              value={metrics.vramUsedGB}
              max={metrics.vramTotalGB}
              unit={`/ ${metrics.vramTotalGB} GB`}
              warnAt={metrics.vramTotalGB * 0.85}
              critAt={metrics.vramTotalGB * 0.95}
            />
            <GaugeBar
              label="Storage I/O"
              value={storagePct}
              max={100}
              unit="%"
            />
          </div>
        </div>

        {/* Throughput sparkline */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Timer size={11} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Throughput
              </span>
            </div>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {metrics.throughputFps.toFixed(1)} <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 400 }}>frames/s</span>
            </span>
          </div>
          <ThroughputSparkline baseFps={metrics.throughputFps} />
        </div>

        {/* All stages mini-list */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            All Stages
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {allStages.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <StageStatusIcon status={s.status} />
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
                  letterSpacing: '0.04em', minWidth: 20, flexShrink: 0,
                }}>{String(s.order).padStart(2, '0')}</span>
                <span style={{
                  fontSize: 11,
                  color: s.status === 'running' ? 'var(--accent-primary)'
                    : s.status === 'completed' ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                  fontWeight: s.status === 'running' ? 600 : 400,
                  flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {s.shortLabel}
                </span>
                {s.status === 'running' && s.progress !== undefined && (
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', flexShrink: 0 }}>
                    {s.progress}%
                  </span>
                )}
                {s.status === 'completed' && s.durationMs && (
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', flexShrink: 0 }}>
                    {formatDuration(s.durationMs)}
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
