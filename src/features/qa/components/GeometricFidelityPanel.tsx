// ============================================================
// AERIS — Phase 7 Geometric Fidelity Panel (E-3 Chamfer & F-Score)
// Mesh deviation comparison & error density distribution chart
// ============================================================

import React from 'react';
import { Cube } from '@phosphor-icons/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { GeometricFidelityMetric } from '../types';

interface GeometricFidelityPanelProps {
  fidelity: GeometricFidelityMetric;
}

export const GeometricFidelityPanel: React.FC<GeometricFidelityPanelProps> = ({ fidelity }) => {
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
          <Cube size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            E-3 GEOMETRIC FIDELITY VS REFERENCE MESH
          </span>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--status-success)',
            background: 'rgba(5,150,105,0.12)',
            border: '1px solid rgba(5,150,105,0.3)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          {fidelity.status}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Metric Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 12px',
            }}
          >
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              CHAMFER DISTANCE (3D SURFACE BIAS)
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {fidelity.chamferDistanceMeters.toFixed(3)} m
              </span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
                (Target ≤ {fidelity.targetChamferMeters}m)
              </span>
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 12px',
            }}
          >
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              F-SCORE @ 0.5m TOLERANCE THRESHOLD
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
                {fidelity.fScore.toFixed(2)}
              </span>
              <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>
                (Target ≥ {fidelity.targetFScore.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* Recharts Deviation Distribution Chart */}
        <div
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-muted)',
            borderRadius: 'var(--radius-xs)',
            padding: '12px',
            height: '140px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
            SURFACE DISTANCE ERROR DISTRIBUTION DENSITY (REFERENCE VS RECONSTRUCTED)
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fidelity.distributionCurve} margin={{ top: 4, right: 4, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="geomGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="distance" tick={{ fill: '#4A6180', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4A6180', fontSize: 8 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0C1018', borderColor: '#273548', borderRadius: 4, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ color: '#0EA5E9' }}
                />
                <Area type="monotone" dataKey="errorDensity" stroke="#0EA5E9" fillOpacity={1} fill="url(#geomGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
