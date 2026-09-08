// ============================================================
// AERIS — Phase 8 Live Reconstruction Pipeline Status Component
// In-flight 8-stage pipeline synchronization & active stage highlight
// ============================================================

import React from 'react';
import { Cpu, CaretRight, CheckCircle, Spinner } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface LiveReconstructionStatusProps {
  telemetry: LiveTelemetryData;
}

export const LiveReconstructionStatus: React.FC<LiveReconstructionStatusProps> = ({ telemetry }) => {
  const stages = [
    { num: 1, name: 'FRAME CURATION', status: 'completed' },
    { num: 2, name: 'POSE ESTIMATION', status: 'completed' },
    { num: 3, name: 'DYNAMIC MASKING', status: 'completed' },
    { num: 4, name: 'METRIC DEPTH', status: 'active' },
    { num: 5, name: '3DGS & DENSE RECON', status: 'pending' },
    { num: 6, name: 'SURFACE MESHING', status: 'pending' },
    { num: 7, name: 'GEOREFERENCING', status: 'pending' },
    { num: 8, name: 'PRODUCT GENERATION', status: 'pending' },
  ];

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            REAL-TIME RECONSTRUCTION PIPELINE SYNCHRONIZATION
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
            {telemetry.currentStageName}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', padding: '2px 8px', borderRadius: 'var(--radius-xs)' }}>
            {telemetry.reconstructionProgressPercent}% COMPLETE
          </span>
        </div>
      </div>

      {/* 8-Stage Flow Chain */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {stages.map((stg) => {
          const isCompleted = stg.status === 'completed';
          const isActive = stg.status === 'active';

          return (
            <React.Fragment key={stg.num}>
              <div
                style={{
                  background: isActive ? 'rgba(14,165,233,0.15)' : isCompleted ? 'rgba(5,150,105,0.12)' : 'var(--bg-card)',
                  border: isActive ? '1px solid var(--accent-primary)' : isCompleted ? '1px solid rgba(5,150,105,0.3)' : '1px solid var(--border-base)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                {isCompleted && <CheckCircle size={13} color="var(--status-success)" weight="fill" />}
                {isActive && <Spinner size={13} color="var(--accent-primary)" style={{ animation: 'spin 1.5s linear infinite' }} />}
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-primary)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-muted)',
                  }}
                >
                  {stg.num}. {stg.name}
                </span>
              </div>

              {stg.num < 8 && <CaretRight size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
