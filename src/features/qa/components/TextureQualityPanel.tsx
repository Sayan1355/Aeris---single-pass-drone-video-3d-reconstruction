// ============================================================
// AERIS — Phase 7 Texture Quality Panel (E-5)
// PSNR & SSIM metrics with procedural reference-vs-reconstruction visual
// ============================================================

import React from 'react';
import { Image } from '@phosphor-icons/react';
import type { TextureMetric } from '../types';

interface TextureQualityPanelProps {
  texture: TextureMetric;
}

export const TextureQualityPanel: React.FC<TextureQualityPanelProps> = ({ texture }) => {
  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image size={18} color="#FBBF24" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            E-5 TEXTURE RECONSTRUCTION QUALITY (PSNR &amp; SSIM)
          </span>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--status-success)',
            background: 'rgba(5,150,105,0.12)',
            border: '1px solid rgba(5,150,105,0.3)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          {texture.status}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Metric Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PEAK SIGNAL-TO-NOISE RATIO (PSNR)</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#FBBF24' }}>
                {texture.psnrDb.toFixed(1)} dB
              </span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
                (Target ≥ {texture.targetPsnrDb.toFixed(1)} dB)
              </span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STRUCTURAL SIMILARITY INDEX (SSIM)</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#FBBF24' }}>
                {texture.ssimIndex.toFixed(2)}
              </span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
                (Target ≥ {texture.targetSsimIndex.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* Procedural Reference vs Reconstruction Visual */}
        <div
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-muted)',
            borderRadius: 'var(--radius-xs)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            RADIOMETRIC COMPARISON (REFERENCE KEYFRAME VS RECONSTRUCTED TEXTURE)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div
              style={{
                height: 80,
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-base)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REFERENCE KEYFRAME</span>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Raw 4K Camera Input</span>
            </div>

            <div
              style={{
                height: 80,
                background: 'linear-gradient(135deg, #1E2D40 0%, #0C1018 100%)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--accent-primary)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 9, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>RECONSTRUCTED</span>
              <span style={{ fontSize: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>3DGS Radiance Map</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
