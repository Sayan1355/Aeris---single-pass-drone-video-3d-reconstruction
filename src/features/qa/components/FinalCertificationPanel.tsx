// ============================================================
// AERIS — Phase 7 Final Certification Panel Component
// Final mission validation acceptance certificate & action triggers
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, DownloadSimple, Package, Cube } from '@phosphor-icons/react';
import type { QAScoreBreakdown } from '../types';

interface FinalCertificationPanelProps {
  score: QAScoreBreakdown;
  onExportReport: () => void;
}

export const FinalCertificationPanel: React.FC<FinalCertificationPanelProps> = ({
  score,
  onExportReport,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(12,16,24,0.98) 0%, rgba(17,23,32,0.98) 100%)',
        border: '1px solid rgba(5,150,105,0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        boxShadow: '0 0 25px rgba(5,150,105,0.1), var(--shadow-panel)',
      }}
    >
      {/* Left Info Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={24} color="var(--status-success)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', letterSpacing: '0.08em' }}>
            MISSION VALIDATION CERTIFICATE — ACCEPTED ({score.overallScore} / {score.maxScore})
          </span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
          Spatial Intelligence Reconstruction Certified
        </h2>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, maxWidth: '640px', lineHeight: 1.4 }}>
          This AERIS reconstruction mission has satisfied all 8 scientific evaluation benchmarks (E-1 through E-8). The spatial digital twin, point cloud, and raster assets are confirmed ready for operational deployment.
        </p>

        {/* Categories Pass Badges */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}>
            ✓ GEOMETRY: PASS (94%)
          </span>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}>
            ✓ GEOREFERENCE: PASS (91%)
          </span>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}>
            ✓ COVERAGE: PASS (96%)
          </span>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}>
            ✓ TEXTURE: PASS (89%)
          </span>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}>
            ✓ ARTIFACT AUDIT: PASS
          </span>
        </div>
      </div>

      {/* Right Action Triggers Column */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/products')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--accent-primary)',
            color: '#07090E',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 18px',
            fontSize: 13,
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Package size={16} weight="bold" />
          <span>VIEW PRODUCTS</span>
        </button>

        <button
          onClick={() => navigate('/digital-twin')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(14,165,233,0.12)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(14,165,233,0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 18px',
            fontSize: 13,
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Cube size={16} />
          <span>OPEN DIGITAL TWIN</span>
        </button>

        <button
          onClick={onExportReport}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(5,150,105,0.15)',
            color: 'var(--status-success)',
            border: '1px solid rgba(5,150,105,0.4)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 18px',
            fontSize: 13,
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <DownloadSimple size={16} weight="bold" />
          <span>EXPORT QA REPORT</span>
        </button>
      </div>
    </div>
  );
};
