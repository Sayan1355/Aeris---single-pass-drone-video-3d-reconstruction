// ============================================================
// AERIS — MissionSummaryStrip
// Six operational KPI statistics across the top
// ============================================================

import type { MissionSummaryStats } from '../../types/mission';

interface StatProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
  subValue?: string;
}

function Stat({ label, value, unit, accent, subValue }: StatProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${accent ? 'rgba(14,165,233,0.22)' : 'var(--border-base)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: accent ? 'var(--accent-primary)' : 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>
      {subValue && (
        <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1 }}>
          {subValue}
        </div>
      )}
    </div>
  );
}

interface Props {
  stats: MissionSummaryStats;
}

export function MissionSummaryStrip({ stats }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 8,
      }}
      role="region"
      aria-label="Mission summary statistics"
    >
      <Stat
        label="Active Missions"
        value={stats.activeMissions}
        accent
        subValue="Processing"
      />
      <Stat
        label="Completed Today"
        value={stats.completedToday}
      />
      <Stat
        label="Total Missions"
        value={stats.totalMissions}
        subValue="All time"
      />
      <Stat
        label="Data Ingested"
        value={stats.dataIngestedGB.toFixed(1)}
        unit="GB"
        subValue="Current session"
      />
      <Stat
        label="3D Models"
        value={stats.modelsGenerated}
        subValue="Generated"
      />
      <Stat
        label="Avg. GSD"
        value={stats.avgGsdCm.toFixed(1)}
        unit="cm/px"
        subValue="Ground sample dist."
      />
    </div>
  );
}
