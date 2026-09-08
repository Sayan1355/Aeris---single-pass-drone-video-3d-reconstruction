// ============================================================
// AERIS — ActivityFeed
// Operational mission activity log
// ============================================================

import {
  CheckCircle,
  Warning,
  XCircle,
  Info,
} from '@phosphor-icons/react';
import type { ActivityEntry } from '../../types/mission';
import { formatRelativeTime, formatTime } from '../../lib/utils';

interface Props {
  entries: ActivityEntry[];
  maxItems?: number;
}

function EntryIcon({ level }: { level: ActivityEntry['level'] }) {
  const size = 13;
  switch (level) {
    case 'success':
      return <CheckCircle size={size} weight="fill" style={{ color: 'var(--status-success)', flexShrink: 0 }} />;
    case 'warning':
      return <Warning size={size} weight="fill" style={{ color: 'var(--status-warning)', flexShrink: 0 }} />;
    case 'error':
      return <XCircle size={size} weight="fill" style={{ color: 'var(--status-error)', flexShrink: 0 }} />;
    default:
      return <Info size={size} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />;
  }
}

export function ActivityFeed({ entries, maxItems = 8 }: Props) {
  const visible = entries.slice(0, maxItems);

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Mission activity feed"
      aria-live="polite"
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid var(--border-base)',
          fontSize: 10,
          color: 'var(--text-muted)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Activity Log
      </div>

      {/* Entries */}
      <div role="log" aria-label="Activity entries">
        {visible.map((entry, idx) => (
          <div
            key={entry.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '16px 1fr 60px',
              alignItems: 'start',
              gap: 8,
              padding: '7px 12px',
              borderBottom: idx < visible.length - 1 ? '1px solid var(--border-muted)' : 'none',
            }}
            aria-label={`${entry.level}: ${entry.message} — ${formatRelativeTime(entry.timestamp)}`}
          >
            {/* Icon */}
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
              <EntryIcon level={entry.level} />
            </div>

            {/* Message */}
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
              }}
            >
              {entry.message}
            </div>

            {/* Timestamp */}
            <div
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textAlign: 'right',
                paddingTop: 2,
              }}
              title={entry.timestamp}
            >
              {formatTime(entry.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
