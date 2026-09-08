// ============================================================
// AERIS — Phase 7 QA Validation Timeline Component
// Sequence from Reconstruction Complete to Final QA Certification
// ============================================================

import React from 'react';
import { CaretRight, CheckCircle, Clock } from '@phosphor-icons/react';

export const QATimeline: React.FC = () => {
  const steps = [
    'RECONSTRUCTION COMPLETE',
    'GEOMETRY VALIDATED',
    'GEOREFERENCE VALIDATED',
    'COVERAGE ANALYZED',
    'TEXTURE VALIDATED',
    'ARTIFACT AUDIT',
    'FINAL QA — COMPLETE',
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
          <Clock size={16} color="var(--status-success)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
            QA VALIDATION AUDIT SEQUENCE
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
          FINAL QA — COMPLETE
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <React.Fragment key={step}>
              <div
                style={{
                  background: isLast ? 'rgba(5,150,105,0.15)' : 'var(--bg-card)',
                  border: isLast ? '1px solid var(--status-success)' : '1px solid var(--border-base)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                <CheckCircle size={12} color="var(--status-success)" weight="fill" />
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isLast ? 700 : 500,
                    color: isLast ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {step}
                </span>
              </div>

              {!isLast && <CaretRight size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
