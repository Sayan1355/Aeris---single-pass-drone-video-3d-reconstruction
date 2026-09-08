// ============================================================
// AERIS — Source Video Panel
// Synthetic aerial-survey frame + playback controls
// ============================================================

import { useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, SkipBack, SkipForward,
  VideoCamera, Warning,
} from '@phosphor-icons/react';
import { useReconStore } from '../hooks/useReconStore';

// ---- Procedural aerial-survey canvas frame ------------------

function SyntheticFrame({ frame, total }: { frame: number; total: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Sky/ground split
    ctx.fillStyle = '#1a2535';
    ctx.fillRect(0, 0, w, h);

    // Aerial ground texture (tan/brown zones)
    const seed = Math.floor(frame / 30); // changes every ~1s at 30fps
    const rng = (s: number) => ((Math.sin(s * 127.1 + seed * 31.7) * 43758.5) % 1 + 1) % 1;

    // Ground base
    const grd = ctx.createLinearGradient(0, h * 0.1, 0, h);
    grd.addColorStop(0, '#3D4B2F');
    grd.addColorStop(0.3, '#5A5030');
    grd.addColorStop(0.7, '#4A4028');
    grd.addColorStop(1, '#3D3820');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // Grid/field overlay
    ctx.strokeStyle = 'rgba(200,190,160,0.08)';
    ctx.lineWidth = 0.5;
    for (let gx = 0; gx < w; gx += 24) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
    }
    for (let gy = 0; gy < h; gy += 24) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
    }

    // Buildings
    const buildings = [
      { x: 0.22, y: 0.35, w: 0.08, h: 0.12, c: '#7A8890' },
      { x: 0.48, y: 0.28, w: 0.06, h: 0.16, c: '#6A7A88' },
      { x: 0.68, y: 0.42, w: 0.10, h: 0.10, c: '#809080' },
      { x: 0.35, y: 0.52, w: 0.07, h: 0.08, c: '#708070' },
      { x: 0.58, y: 0.18, w: 0.05, h: 0.09, c: '#6A7888' },
    ];
    buildings.forEach(b => {
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(b.x * w + 3, b.y * h + 3, b.w * w, b.h * h);
      // Building
      ctx.fillStyle = b.c;
      ctx.fillRect(b.x * w, b.y * h, b.w * w, b.h * h);
      // Roof highlight
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(b.x * w, b.y * h, b.w * w, 3);
    });

    // Roads
    ctx.strokeStyle = 'rgba(200,185,150,0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.1, h * 0.5); ctx.lineTo(w * 0.9, h * 0.45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.1); ctx.lineTo(w * 0.48, h * 0.9); ctx.stroke();

    // Vegetation patches
    ctx.fillStyle = 'rgba(40,80,30,0.45)';
    [[0.15, 0.7], [0.78, 0.25], [0.88, 0.65]].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx * w, cy * h, rng(cx + cy) * 20 + 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // Survey frame overlay (crosshair)
    ctx.strokeStyle = 'rgba(14,165,233,0.35)';
    ctx.lineWidth = 1;
    const cx = w / 2, cy = h / 2;
    ctx.beginPath(); ctx.moveTo(cx - 20, cy); ctx.lineTo(cx + 20, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy + 20); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.stroke();

    // Frame progress band at top
    const progress = frame / total;
    ctx.fillStyle = 'rgba(14,165,233,0.4)';
    ctx.fillRect(0, 0, w * progress, 2);

    // HUD overlays
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(14,165,233,0.8)';
    ctx.fillText(`ALT 142.5m  HDG 274°  SPD 8.3m/s`, 8, 16);
    ctx.fillStyle = 'rgba(100,130,160,0.6)';
    ctx.fillText(`GPS 23.8765°N 70.4321°E`, 8, h - 8);
    ctx.fillText(`FRAME ${frame.toLocaleString()} / ${total.toLocaleString()}`, w - 120, h - 8);
  }, [frame, total]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={200}
      style={{ width: '100%', height: '100%', display: 'block', imageRendering: 'pixelated' }}
      aria-label="Synthetic aerial survey frame preview"
    />
  );
}

// ---- Timestamp formatter ------------------------------------

function frameToTimecode(frame: number, fps: number): string {
  const totalSec = Math.floor(frame / fps);
  const h = Math.floor(totalSec / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSec % 60).toString().padStart(2, '0');
  const ms = Math.floor((frame % fps) * (1000 / fps)).toString().padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
}

// ---- Blur / quality indicator -------------------------------

function QualityIndicator({ frame }: { frame: number }) {
  const blurScore = 0.04 + (Math.sin(frame * 0.003) * 0.5 + 0.5) * 0.12;
  const quality = Math.round(95 - blurScore * 40);
  const good = blurScore < 0.1;
  return (
    <div style={{ display: 'flex', gap: 10, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: 'var(--text-muted)' }}>
        Blur: <span style={{ color: good ? 'var(--status-success)' : 'var(--status-warning)' }}>
          {blurScore.toFixed(2)}
        </span>
      </span>
      <span style={{ color: 'var(--text-muted)' }}>
        Quality: <span style={{ color: good ? 'var(--status-success)' : 'var(--status-warning)' }}>
          {quality}%
        </span>
      </span>
      {!good && <Warning size={11} style={{ color: 'var(--status-warning)' }} />}
    </div>
  );
}

// ---- Main component -----------------------------------------

export function SourceVideoPanel() {
  const { isPlaying, currentFrame, totalFrames, fps, togglePlaying, stepFrame, setCurrentFrame } = useReconStore();
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        useReconStore.getState().stepFrame(1);
        if (useReconStore.getState().currentFrame >= totalFrames) {
          useReconStore.getState().setPlaying(false);
        }
      }, 1000 / fps);
    }
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [isPlaying, fps, totalFrames]);

  const handleScrub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrame(Number(e.target.value));
  }, [setCurrentFrame]);

  const pct = ((currentFrame / totalFrames) * 100).toFixed(1);

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
      aria-label="Source video panel"
    >
      {/* Header */}
      <div style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-base)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <VideoCamera size={13} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Source Video
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          H.265 · 3840×2160 · {fps}fps
        </span>
      </div>

      {/* Frame canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        <SyntheticFrame frame={currentFrame} total={totalFrames} />

        {/* Recording indicator */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 6px',
            background: 'rgba(0,0,0,0.55)',
            borderRadius: 3,
            backdropFilter: 'blur(6px)',
          }}
          aria-hidden="true"
        >
          <span className="status-dot dot-error status-blink" style={{ width: 5, height: 5 }} />
          <span style={{ fontSize: 9, color: '#fff', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>REC</span>
        </div>
      </div>

      {/* Frame metadata row */}
      <div style={{ padding: '5px 10px', borderTop: '1px solid var(--border-muted)', borderBottom: '1px solid var(--border-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Frame: <span style={{ color: 'var(--text-primary)' }}>{currentFrame.toLocaleString()} / {totalFrames.toLocaleString()}</span>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            TC: <span style={{ color: 'var(--accent-primary)' }}>{frameToTimecode(currentFrame, fps)}</span>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{pct}%</span>
          </span>
        </div>
        <QualityIndicator frame={currentFrame} />
      </div>

      {/* Timeline scrubber */}
      <div style={{ padding: '4px 10px 0', position: 'relative' }}>
        <input
          type="range"
          min={0}
          max={totalFrames}
          value={currentFrame}
          onChange={handleScrub}
          aria-label="Frame timeline scrubber"
          style={{
            width: '100%',
            appearance: 'none',
            height: 3,
            background: `linear-gradient(to right, var(--accent-primary) ${pct}%, var(--border-strong) ${pct}%)`,
            borderRadius: 2,
            outline: 'none',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Playback controls */}
      <div style={{ padding: '6px 10px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          className="btn btn-ghost"
          onClick={() => stepFrame(-fps * 5)}
          aria-label="Skip back 5 seconds"
          style={{ padding: '4px 6px', minWidth: 0 }}
        >
          <SkipBack size={14} />
        </button>
        <button
          className="btn btn-secondary"
          onClick={togglePlaying}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{ padding: '5px 10px', minWidth: 0 }}
        >
          {isPlaying ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => stepFrame(fps * 5)}
          aria-label="Skip forward 5 seconds"
          style={{ padding: '4px 6px', minWidth: 0 }}
        >
          <SkipForward size={14} />
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost" onClick={() => stepFrame(-1)} aria-label="Previous frame" style={{ padding: '4px 6px', minWidth: 0, fontSize: 10 }}>
          ‹ Frame
        </button>
        <button className="btn btn-ghost" onClick={() => stepFrame(1)} aria-label="Next frame" style={{ padding: '4px 6px', minWidth: 0, fontSize: 10 }}>
          Frame ›
        </button>
      </div>
    </div>
  );
}
