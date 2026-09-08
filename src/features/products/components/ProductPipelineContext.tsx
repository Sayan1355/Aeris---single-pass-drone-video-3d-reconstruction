// ============================================================
// AERIS — Phase 6 Pipeline Context Diagram Component
// Compact visual stage sequence showing origin from reconstruction pipeline
// ============================================================

import React from 'react';
import { CaretRight, CheckCircle, Cpu } from '@phosphor-icons/react';

export const ProductPipelineContext: React.FC = () => {
  const stages = [
    { name: 'SOURCE VIDEO', status: 'COMPLETED' },
    { name: 'FRAME CURATION', status: 'COMPLETED' },
    { name: 'POSE ESTIMATION', status: 'COMPLETED' },
    { name: 'DEPTH MAPS', status: 'COMPLETED' },
    { name: '3DGS SPLATTING', status: 'COMPLETED' },
    { name: 'MESH EXTRACTION', status: 'COMPLETED' },
    { name: 'GEOREFERENCING', status: 'COMPLETED' },
    { name: 'PRODUCT GENERATION', status: 'ACTIVE' },
  ];

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
            RECONSTRUCTION PIPELINE ORIGIN &amp; lineage
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)' }}>
          <CheckCircle size={14} weight="fill" />
          <span>PRODUCT GENERATION — COMPLETE</span>
        </div>
      </div>

      {/* Horizontal Flow Chain */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {stages.map((stage, i) => {
          const isFinal = i === stages.length - 1;
          return (
            <React.Fragment key={stage.name}>
              <div
                style={{
                  background: isFinal ? 'rgba(14,165,233,0.15)' : 'var(--bg-card)',
                  border: isFinal ? '1px solid var(--accent-primary)' : '1px solid var(--border-base)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isFinal ? 'var(--accent-primary)' : 'var(--status-success)',
                    boxShadow: isFinal ? '0 0 6px var(--accent-primary)' : 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isFinal ? 700 : 500,
                    color: isFinal ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {stage.name}
                </span>
              </div>

              {!isFinal && (
                <CaretRight size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
