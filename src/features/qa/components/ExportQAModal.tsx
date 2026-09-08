// ============================================================
// AERIS — Phase 7 Export QA Report Modal Component
// Simulated PDF report export dialog for scientific validation
// ============================================================

import React, { useState } from 'react';
import { X, DownloadSimple, CheckCircle, Spinner, FilePdf } from '@phosphor-icons/react';

interface ExportQAModalProps {
  onClose: () => void;
}

export const ExportQAModal: React.FC<ExportQAModalProps> = ({ onClose }) => {
  const [exporting, setExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleStartExport = () => {
    setExporting(true);
    setProgress(0);
    setCompleted(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setExporting(false);
        setCompleted(true);
      }
      setProgress(current);
    }, 150);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 0 30px rgba(5,150,105,0.15), var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'var(--bg-header)',
            borderBottom: '1px solid var(--border-base)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FilePdf size={20} color="var(--status-success)" />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                EXPORT QA INSPECTION REPORT
              </h3>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                AERIS-MSN-0247 • PDF Document
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Generate formal executive accuracy report including ground control checkpoint residuals, Chamfer distance curves, surface coverage breakdown, and E-1 to E-8 validation matrix.
          </p>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', fontSize: 11, fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>DOCUMENT:</span>
              <span style={{ color: 'var(--text-primary)' }}>AERIS_QA_Report_MSN-0247.pdf</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>SIZE:</span>
              <span style={{ color: 'var(--text-primary)' }}>4.2 MB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>SCORE:</span>
              <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>92.6 / 100 (PASSED)</span>
            </div>
          </div>

          {exporting && (
            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                <span style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Spinner size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  COMPILING SCIENTIFIC REPORT PDF...
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{progress}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--status-success)',
                    transition: 'width 0.15s ease-out',
                  }}
                />
              </div>
            </div>
          )}

          {completed && (
            <div
              style={{
                background: 'rgba(5,150,105,0.12)',
                border: '1px solid rgba(5,150,105,0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--status-success)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={18} weight="fill" />
                <span>PDF REPORT COMPILED</span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>sha256 verified</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-base)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 16px',
              fontSize: 12,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {completed ? 'CLOSE' : 'CANCEL'}
          </button>

          {!completed ? (
            <button
              onClick={handleStartExport}
              disabled={exporting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--status-success)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: exporting ? 'not-allowed' : 'pointer',
              }}
            >
              <DownloadSimple size={16} weight="bold" />
              <span>{exporting ? 'GENERATING...' : 'GENERATE PDF'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                alert('Simulated download for AERIS_QA_Report_MSN-0247.pdf complete.');
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                color: '#07090E',
                cursor: 'pointer',
              }}
            >
              <DownloadSimple size={16} weight="bold" />
              <span>SAVE PDF TO DISK</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
