// ============================================================
// AERIS — Phase 8 Telemetry Analytics Charts Component
// Real-time Recharts line graphs for Altitude, Speed, Battery & Satellites
// ============================================================

import React from 'react';
import { TrendUp } from '@phosphor-icons/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import type { TelemetryHistoryPoint } from '../types';

interface TelemetryAnalyticsChartsProps {
  history: TelemetryHistoryPoint[];
}

export const TelemetryAnalyticsCharts: React.FC<TelemetryAnalyticsChartsProps> = ({ history }) => {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendUp size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            REAL-TIME TELEMETRY TREND ANALYTICS (LAST 60 SECONDS)
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          FREQUENCY: 1.0 Hz
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {/* Altitude Trend */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '10px', height: 120, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
            ALTITUDE AGL (METERS)
          </span>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 2, right: 2, left: -25, bottom: 0 }}>
                <XAxis dataKey="timeLabel" tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0C1018', borderColor: '#273548', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="altitude" stroke="#0EA5E9" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speed Trend */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '10px', height: 120, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
            GROUND SPEED (M/S)
          </span>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 2, right: 2, left: -25, bottom: 0 }}>
                <XAxis dataKey="timeLabel" tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0C1018', borderColor: '#273548', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="speed" stroke="#38BDF8" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Battery Trend */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '10px', height: 120, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
            BATTERY DRAIN (%)
          </span>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 2, right: 2, left: -25, bottom: 0 }}>
                <XAxis dataKey="timeLabel" tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0C1018', borderColor: '#273548', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="battery" stroke="#34D399" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
