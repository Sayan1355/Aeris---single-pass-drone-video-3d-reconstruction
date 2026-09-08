// ============================================================
// AERIS — RecentMissionsTable
// Professional data table for mission list
// ============================================================

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import type { Mission } from '../../types/mission';
import { missionStatusBadgeClass, formatDuration, formatRelativeTime } from '../../lib/utils';

interface Props {
  missions: Mission[];
}

const COL = '160px 1fr 100px 140px 100px 90px 80px 120px';

function Th({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '8px 10px',
      }}
    >
      {children}
    </div>
  );
}

export function RecentMissionsTable({ missions }: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Recent missions table"
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border-base)',
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Recent Missions
        </span>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/missions')}
          style={{ fontSize: 11, padding: '3px 8px' }}
          aria-label="View all missions"
        >
          All Missions <ArrowRight size={11} aria-hidden="true" />
        </button>
      </div>

      {/* Table */}
      <div role="table" aria-label="Missions">
        {/* Column headers */}
        <div
          role="row"
          style={{
            display: 'grid',
            gridTemplateColumns: COL,
            borderBottom: '1px solid var(--border-base)',
            background: 'var(--bg-card)',
          }}
        >
          <Th>Mission</Th>
          <Th>Site</Th>
          <Th>Status</Th>
          <Th>Platform</Th>
          <Th>Duration</Th>
          <Th>Coverage</Th>
          <Th>GSD</Th>
          <Th>Updated</Th>
        </div>

        {/* Data rows */}
        {missions.map((m, i) => (
          <div
            key={m.id}
            role="row"
            aria-label={`${m.name}, ${m.site}, ${m.status}`}
            tabIndex={0}
            style={{
              display: 'grid',
              gridTemplateColumns: COL,
              alignItems: 'center',
              borderBottom: i < missions.length - 1 ? '1px solid var(--border-muted)' : 'none',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            onClick={() => navigate('/missions')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/missions'); }}
          >
            {/* Mission ID */}
            <div
              style={{
                padding: '9px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.03em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {m.name}
            </div>

            {/* Site */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 12,
                color: 'var(--text-secondary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {m.site}
            </div>

            {/* Status */}
            <div style={{ padding: '9px 10px' }}>
              <span className={`badge ${missionStatusBadgeClass(m.status)}`}>
                {m.status}
              </span>
            </div>

            {/* Platform */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {m.droneId.replace('UAV-', '')}
            </div>

            {/* Duration */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {m.durationMs ? formatDuration(m.durationMs) : '—'}
            </div>

            {/* Coverage */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {m.coverageHa !== undefined ? `${m.coverageHa.toFixed(0)} ha` : '—'}
            </div>

            {/* GSD */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {m.gsdCm !== undefined ? `${m.gsdCm.toFixed(1)} cm` : '—'}
            </div>

            {/* Updated */}
            <div
              style={{
                padding: '9px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
              }}
            >
              {formatRelativeTime(m.updatedAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
