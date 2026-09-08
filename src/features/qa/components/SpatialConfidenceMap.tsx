// ============================================================
// AERIS — Phase 7 Spatial Confidence & Uncertainty Heatmap Component
// Visual confidence map over survey region with occlusion notes & legend
// ============================================================

import React from 'react';
import { Crosshair } from '@phosphor-icons/react';
import type { SpatialConfidenceMetric } from '../types';

interface SpatialConfidenceMapProps {
  confidence: SpatialConfidenceMetric;
}

export const SpatialConfidenceMap: React.FC<SpatialConfidenceMapProps> = ({ confidence }) => {
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Crosshair size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            SPATIAL CONFIDENCE &amp; RECONSTRUCTION UNCERTAINTY MAP
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--text-muted)' }}>MEAN CONFIDENCE:</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{confidence.meanConfidencePercent}%</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Left Stylized Heatmap Box */}
        <div
          style={{
            position: 'relative',
            height: 180,
            background: '#06090F',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-strong)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Fine Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(14,165,233,0.12) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Procedural High/Med/Low Confidence Blobs */}
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(5,150,105,0.2) 60%, transparent 80%)',
              filter: 'blur(10px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 40,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(217,119,6,0.4)',
              filter: 'blur(8px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 25,
              left: 50,
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: 'rgba(220,38,38,0.45)',
              filter: 'blur(6px)',
            }}
          />

          {/* Overlay Text Annotation */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '0.06em', background: 'rgba(12,16,24,0.85)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-base)' }}>
              SURVEY SPATIAL UNCERTAINTY HEATMAP
            </span>
          </div>

          {/* Legend Overlay at Bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 10,
              right: 10,
              background: 'rgba(12,16,24,0.88)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ color: 'var(--accent-primary)' }}>• HIGH (90-100%)</span>
            <span style={{ color: '#D97706' }}>• MED (75-89%)</span>
            <span style={{ color: '#DC2626' }}>• LOW (&lt;75%)</span>
          </div>
        </div>

        {/* Right Metadata Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LOW-CONFIDENCE AREA</span>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#D97706', marginTop: 2 }}>
              {confidence.lowConfidenceAreaPercent}% of Survey Area
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRIMARY OCCLUSION CAUSE</span>
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
              {confidence.primaryCause}
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Uncertainty values calculated via multi-view ray angle variance and 3D Gaussian Splat covariance matrices.
          </p>
        </div>
      </div>
    </div>
  );
};
