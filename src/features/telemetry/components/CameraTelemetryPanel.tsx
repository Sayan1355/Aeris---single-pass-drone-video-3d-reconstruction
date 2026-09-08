// ============================================================
// AERIS — Phase 8 Camera Telemetry & Viewfinder Component
// Live camera sensor parameters, keyframe counter, & viewfinder preview
// ============================================================

import React from 'react';
import { Camera, Record } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface CameraTelemetryPanelProps {
  telemetry: LiveTelemetryData;
}

export const CameraTelemetryPanel: React.FC<CameraTelemetryPanelProps> = ({ telemetry }) => {
  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Camera size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {telemetry.cameraName} TELEMETRY
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)', color: '#F87171', background: 'rgba(248,113,113,0.12)', padding: '2px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(248,113,113,0.3)', fontWeight: 700 }}>
          <Record size={12} weight="fill" style={{ animation: 'pulse 1.5s infinite' }} />
          <span>RECORDING ({telemetry.resolution} @ {telemetry.frameRateFps}FPS)</span>
        </div>
      </div>

      {/* Procedural Live Viewfinder Box */}
      <div
        style={{
          position: 'relative',
          height: 120,
          background: '#070A10',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.12) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Center Crosshair Reticle */}
        <div style={{ position: 'relative', width: 40, height: 40, border: '1px solid rgba(14,165,233,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 4, height: 4, background: 'var(--accent-primary)', borderRadius: '50%' }} />
        </div>

        {/* Viewfinder Annotations Overlay */}
        <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          FRAME #{telemetry.currentFrame.toString().padStart(6, '0')}
        </div>

        <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700 }}>
          KEYFRAMES: {telemetry.keyframesCount}
        </div>
      </div>

      {/* Key Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '6px 8px' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>EXPOSURE</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{telemetry.exposure}</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '6px 8px' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>ISO</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{telemetry.iso}</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '6px 8px' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>STORAGE</span>
          <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>{telemetry.storagePercent}% USED</span>
        </div>
      </div>
    </div>
  );
};
