// ============================================================
// AERIS — Phase 7 Overall Quality Score Card Component
// Restrained radial score visualization & category breakdown
// ============================================================

import React from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import type { QAScoreBreakdown } from '../types';

interface OverallQualityCardProps {
  score: QAScoreBreakdown;
}

export const OverallQualityCard: React.FC<OverallQualityCardProps> = ({ score }) => {
  const strokeDashoffset = 283 - (283 * score.overallScore) / 100;

  const categories = [
    { label: 'GEOMETRY', score: score.categoryScores.geometry, color: 'var(--accent-primary)' },
    { label: 'GEOREFERENCE', score: score.categoryScores.georeference, color: '#38BDF8' },
    { label: 'COVERAGE', score: score.categoryScores.coverage, color: '#34D399' },
    { label: 'TEXTURE', score: score.categoryScores.texture, color: '#FBBF24' },
    { label: 'CONFIDENCE', score: score.categoryScores.confidence, color: '#A855F7' },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(17,23,32,0.95) 0%, rgba(22,30,44,0.95) 100%)',
        border: '1px solid rgba(14,165,233,0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        boxShadow: '0 0 25px rgba(14,165,233,0.08), var(--shadow-panel)',
      }}
    >
      {/* Left Column: Radial Dial Showcase */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Radial SVG Dial */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="7"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1 }}>
              {score.overallScore}
            </span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              / 100
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
            }}
          >
            OVERALL RECONSTRUCTION QUALITY
          </span>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '4px 0 6px 0',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Mission Validation Score
          </h2>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(5,150,105,0.12)',
              border: '1px solid rgba(5,150,105,0.3)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--status-success)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <CheckCircle size={14} weight="fill" />
            <span>{score.statusText}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Category Sub-Scores Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 12,
          flex: 1,
          maxWidth: '600px',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.label}
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              {cat.label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: cat.color }}>
              {cat.score}%
            </div>
            <div style={{ height: 3, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
              <div style={{ height: '100%', width: `${cat.score}%`, background: cat.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
