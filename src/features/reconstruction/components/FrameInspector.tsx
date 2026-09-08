// ============================================================
// AERIS — Frame / Depth Inspector
// RGB / Depth / Confidence map switcher with canvas previews
// Clean boundary for future real-frame injection
// ============================================================

import { useRef, useEffect } from 'react';
import type { FrameInspectorMode } from '../types';
import { useReconStore } from '../hooks/useReconStore';

// ---- Procedural canvas generators --------------------------

function drawRGBFrame(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  // Similar to SourceVideoPanel but smaller / cropped section
  ctx.fillStyle = '#3D4B2F';
  ctx.fillRect(0, 0, w, h);

  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, '#3D4B2F');
  grd.addColorStop(0.6, '#4A4028');
  grd.addColorStop(1, '#5A5030');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = 'rgba(200,190,160,0.06)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 12) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 12) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

  // Building
  ctx.fillStyle = '#7A8890';
  ctx.fillRect(w * 0.3, h * 0.25, w * 0.4, h * 0.5);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(w * 0.3, h * 0.25, w * 0.4, 2);

  // Road
  ctx.strokeStyle = 'rgba(200,185,150,0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(0, h * 0.75); ctx.lineTo(w, h * 0.72); ctx.stroke();

  // Crosshair
  ctx.strokeStyle = 'rgba(14,165,233,0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(w/2 - 8, h/2); ctx.lineTo(w/2 + 8, h/2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w/2, h/2 - 8); ctx.lineTo(w/2, h/2 + 8); ctx.stroke();

  // Frame number
  ctx.font = '8px JetBrains Mono, monospace';
  ctx.fillStyle = 'rgba(14,165,233,0.7)';
  ctx.fillText(`F${frame.toLocaleString()}`, 4, h - 4);
}

function drawDepthMap(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  // Near = dark blue, Far = bright yellow/white
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;

      // Simulate terrain elevation + building bump
      const tx = x / w, ty = y / h;
      let depth = 0.5
        + Math.sin(tx * 3.2 + frame * 0.0001) * 0.18
        + Math.cos(ty * 2.8) * 0.15;

      // Building region closer (lower depth value = nearer)
      if (tx > 0.28 && tx < 0.72 && ty > 0.23 && ty < 0.77) {
        depth -= 0.25 * (1 - Math.abs(tx - 0.5) * 3) * (1 - Math.abs(ty - 0.5) * 2);
      }
      depth = Math.max(0, Math.min(1, depth));

      // Turbo-like colormap: dark blue → cyan → green → yellow → red
      const r = Math.round(Math.min(255, Math.max(0, (depth * 3 - 1) * 255)));
      const g = Math.round(Math.min(255, Math.max(0,
        depth < 0.33 ? depth * 3 * 255
        : depth < 0.66 ? 255
        : (1 - (depth - 0.66) / 0.34) * 255
      )));
      const b = Math.round(Math.min(255, Math.max(0,
        depth < 0.33 ? 255 - depth * 3 * 200 : 0
      )));

      data[idx]     = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Labels
  ctx.font = '7px JetBrains Mono, monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('NEAR', 3, 10);
  ctx.fillStyle = 'rgba(255,100,0,0.8)';
  ctx.fillText('FAR', w - 22, 10);
}

function drawConfidenceMap(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const tx = x / w, ty = y / h;

      // High confidence at center (building), medium on edges
      const distCenter = Math.sqrt((tx - 0.5) ** 2 + (ty - 0.5) ** 2);
      let conf = 1.0 - distCenter * 1.2;

      // Building block: very high confidence
      if (tx > 0.28 && tx < 0.72 && ty > 0.23 && ty < 0.77) {
        conf = 0.9 + Math.random() * 0.1;
      }

      // Edge noise
      if (distCenter > 0.42) {
        conf = Math.max(0, conf + (Math.random() - 0.5) * 0.4);
      }

      conf = Math.max(0, Math.min(1, conf));

      // Green = high, Yellow = medium, Red = low
      const r = Math.round(conf < 0.5 ? 255 : (1 - conf) * 2 * 255);
      const g = Math.round(conf < 0.5 ? conf * 2 * 255 : 255);
      const b = 30;

      data[idx]     = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 220;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Legend
  ctx.font = '7px JetBrains Mono, monospace';
  ctx.fillStyle = 'rgba(0,220,80,0.9)';
  ctx.fillText('HIGH', 3, 10);
  ctx.fillStyle = 'rgba(220,40,40,0.9)';
  ctx.fillText('LOW', w - 24, 10);
}

// ---- Mode button --------------------------------------------

function ModeBtn({ label, active, onClick }: {
  label: string;
  mode: FrameInspectorMode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        flex: 1,
        padding: '4px 0',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.06em',
        fontFamily: 'var(--font-mono)',
        background: active ? 'rgba(14,165,233,0.15)' : 'transparent',
        color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
        border: 'none',
        borderBottom: `2px solid ${active ? 'var(--accent-primary)' : 'transparent'}`,
        cursor: 'pointer',
        transition: 'all 150ms ease-out',
      }}
    >
      {label}
    </button>
  );
}

// ---- Main component -----------------------------------------

export function FrameInspector() {
  const { frameInspectorMode, setFrameInspectorMode, currentFrame } = useReconStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (frameInspectorMode) {
      case 'rgb':        drawRGBFrame(ctx, canvas.width, canvas.height, currentFrame); break;
      case 'depth':      drawDepthMap(ctx, canvas.width, canvas.height, currentFrame); break;
      case 'confidence': drawConfidenceMap(ctx, canvas.width, canvas.height); break;
    }
  }, [frameInspectorMode, currentFrame]);

  const modes: { label: string; mode: FrameInspectorMode }[] = [
    { label: 'RGB',        mode: 'rgb'        },
    { label: 'Depth',      mode: 'depth'      },
    { label: 'Confidence', mode: 'confidence' },
  ];

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="region"
      aria-label="Frame inspector"
    >
      {/* Header */}
      <div style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-base)' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Frame Inspector
        </span>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-muted)' }}>
        {modes.map(({ label, mode }) => (
          <ModeBtn key={mode} label={label} mode={mode} active={frameInspectorMode === mode} onClick={() => setFrameInspectorMode(mode)} />
        ))}
      </div>

      {/* Canvas preview */}
      <div style={{ position: 'relative', background: '#070A10' }}>
        <canvas
          ref={canvasRef}
          width={200}
          height={130}
          style={{ width: '100%', display: 'block' }}
          aria-label={`${frameInspectorMode} frame preview`}
        />
        <div style={{
          position: 'absolute', bottom: 4, right: 6,
          fontSize: 9, color: 'rgba(100,130,160,0.6)',
          fontFamily: 'var(--font-mono)',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          {frameInspectorMode.toUpperCase()}
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: '6px 10px' }}>
        {frameInspectorMode === 'confidence' && (
          <div style={{ display: 'flex', gap: 10, fontSize: 9, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--status-success)' }}>● High</span>
            <span style={{ color: 'var(--status-warning)' }}>● Medium</span>
            <span style={{ color: 'var(--status-error)' }}>● Low</span>
          </div>
        )}
        {frameInspectorMode === 'depth' && (
          <div style={{ display: 'flex', gap: 10, fontSize: 9, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#0080FF' }}>● Near</span>
            <span style={{ color: '#00FF80' }}>● Mid</span>
            <span style={{ color: '#FF6600' }}>● Far</span>
          </div>
        )}
        {frameInspectorMode === 'rgb' && (
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            3840×2160 · H.265 · Blur 0.08
          </div>
        )}
      </div>
    </div>
  );
}
