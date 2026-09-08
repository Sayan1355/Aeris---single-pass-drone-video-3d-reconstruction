// ============================================================
// AERIS — Phase 7 Coverage Analysis Panel (E-4)
// Reconstructed cell grid visualization with COVERAGE / CONFIDENCE / GAPS toggles
// ============================================================

import React, { useState } from 'react';
import { Globe } from '@phosphor-icons/react';
import type { CoverageMetric } from '../types';

interface CoverageAnalysisPanelProps {
  coverage: CoverageMetric;
}

type ViewMode = 'coverage' | 'confidence' | 'gaps';

export const CoverageAnalysisPanel: React.FC<CoverageAnalysisPanelProps> = ({ coverage }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('coverage');

  // Generate 8x12 grid cell array for procedural coverage visual
  const gridCells = Array.from({ length: 96 }).map((_, idx) => {
    const isGap = idx === 14 || idx === 37 || idx === 62 || idx === 83;
    const isLowConf = idx === 5 || idx === 23 || idx === 49 || idx === 71 || idx === 90;

    let status: 'reconstructed' | 'gap' | 'low';
    if (isGap) status = 'gap';
    else if (isLowConf) status = 'low';
    else status = 'reconstructed';

    return { id: idx, status };
  });

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
      {/* Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe size={18} color="#34D399" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            E-4 SURFACE COVERAGE COMPLETENESS ANALYSIS
          </span>
        </div>

        {/* View mode buttons */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: 2 }}>
          {(['coverage', 'confidence', 'gaps'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '4px 8px',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                background: viewMode === mode ? 'rgba(52,211,153,0.18)' : 'transparent',
                color: viewMode === mode ? '#34D399' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid + Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Left Stats Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OBSERVABLE AREA</span>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                {coverage.observableAreaHa} ha
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RECONSTRUCTED</span>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#34D399', marginTop: 2 }}>
                {coverage.reconstructedPercent}%
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-muted)' }}>UNRECONSTRUCTED GAPS</span>
            <span style={{ color: 'var(--status-warning)', fontWeight: 700 }}>{coverage.unreconstructedPercent}% ({coverage.cellsGaps} cells)</span>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Spatial completeness evaluated across 1,280 grid cells. Unreconstructed gaps correspond to heavy shadow cast under coastal crane overhangs.
          </p>
        </div>

        {/* Right Stylized Coverage Grid Box */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>SURVEY BOUNDARY CELL MATRIX ({coverage.cellsTotal} CELLS TOTAL)</span>
            <span>MODE: {viewMode.toUpperCase()}</span>
          </div>

          {/* 8x12 Cells Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 3,
              background: '#07090E',
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-base)',
            }}
          >
            {gridCells.map((cell) => {
              let cellBg = '#059669';
              if (cell.status === 'gap') cellBg = '#DC2626';
              else if (cell.status === 'low') cellBg = '#D97706';

              if (viewMode === 'gaps' && cell.status !== 'gap') cellBg = 'rgba(7,9,14,0.6)';
              if (viewMode === 'confidence' && cell.status === 'reconstructed') cellBg = '#0EA5E9';

              return (
                <div
                  key={cell.id}
                  style={{
                    height: 12,
                    borderRadius: 1,
                    background: cellBg,
                    opacity: cell.status === 'gap' ? 1 : 0.85,
                    transition: 'all 0.2s ease',
                  }}
                  title={`Cell #${cell.id}: ${cell.status}`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 12, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#059669', borderRadius: 1 }} />
              <span>RECONSTRUCTED (96.2%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#D97706', borderRadius: 1 }} />
              <span>LOW-VIEW (2.7%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#DC2626', borderRadius: 1 }} />
              <span>GAP (3.8%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
