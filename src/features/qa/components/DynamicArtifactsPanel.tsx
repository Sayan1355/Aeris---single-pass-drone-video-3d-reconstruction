// ============================================================
// AERIS — Phase 7 Dynamic Artifact Suppression Panel (E-6)
// Dynamic entity masking & floater artifact suppression audit
// ============================================================

import React from 'react';
import { ShieldCheck, CaretRight } from '@phosphor-icons/react';
import type { ArtifactMetric } from '../types';

interface DynamicArtifactsPanelProps {
  artifacts: ArtifactMetric;
}

export const DynamicArtifactsPanel: React.FC<DynamicArtifactsPanelProps> = ({ artifacts }) => {
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
          <ShieldCheck size={18} color="#F87171" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            E-6 DYNAMIC OBJECT ARTIFACT SUPPRESSION AUDIT
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
          {artifacts.status}
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
        {/* Left Stats & Masked Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>GHOSTING / FLOATER ARTIFACT COUNT</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {artifacts.artifactCountPerKm2.toFixed(1)} / km²
              </span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
                (Target ≤ {artifacts.targetMaxPerKm2.toFixed(1)} / km²)
              </span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 4 }}>
              SUPPRESSED DYNAMIC ENTITY CLASSES
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {artifacts.maskedCategories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-muted)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  • {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 3-Step Pipeline Visual Flow */}
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
            DYNAMIC MASKING INTEGRATION FLOW (RAW → SEGMENTATION → MESH)
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>STEP 1</span>
              <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RAW FRAME</span>
            </div>

            <CaretRight size={14} color="var(--text-muted)" />

            <div style={{ flex: 1, background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 'var(--radius-xs)', padding: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: 9, color: '#F87171', fontFamily: 'var(--font-mono)', display: 'block' }}>STEP 2</span>
              <span style={{ fontSize: 11, color: '#F87171', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>MASK REGION</span>
            </div>

            <CaretRight size={14} color="var(--text-muted)" />

            <div style={{ flex: 1, background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: 'var(--radius-xs)', padding: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--status-success)', fontFamily: 'var(--font-mono)', display: 'block' }}>STEP 3</span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>CLEAN SURFACE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
