// ============================================================
// AERIS — Phase 7 Primary Accuracy Panel (E-1 Georeferencing & E-2 Structural)
// Visual threshold indicators for absolute RMSE & relative structural error
// ============================================================

import React from 'react';
import { Compass, Scales } from '@phosphor-icons/react';
import type { GeoreferencingMetric, StructuralAccuracyMetric } from '../types';

interface PrimaryAccuracyPanelProps {
  georeferencing: GeoreferencingMetric;
  structural: StructuralAccuracyMetric;
}

export const PrimaryAccuracyPanel: React.FC<PrimaryAccuracyPanelProps> = ({
  georeferencing,
  structural,
}) => {
  const geoMarginMeters = georeferencing.targetRmseMeters - georeferencing.rmseMeters;
  const structMarginGsd = structural.targetGsdMultiple - structural.relativeErrorGsdMultiple;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16,
      }}
    >
      {/* Card E-1: Absolute Georeferencing Accuracy */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Compass size={18} color="var(--accent-primary)" />
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                E-1 ABSOLUTE GEOREFERENCING ACCURACY
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
              {georeferencing.status}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '8px 0' }}>
            <span style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {georeferencing.rmseMeters.toFixed(2)} m
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              RMSE (3D Position Error)
            </span>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>
            Evaluated against {georeferencing.checkpointsCount} independent ground control checkpoints (GCPs) with RTK GNSS calibration.
          </p>
        </div>

        {/* Visual Threshold Bar */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>MEASURED: {georeferencing.rmseMeters}m</span>
            <span style={{ color: 'var(--text-muted)' }}>TARGET: ≤ {georeferencing.targetRmseMeters}m</span>
            <span style={{ color: 'var(--status-success)' }}>MARGIN: +{geoMarginMeters.toFixed(2)}m</span>
          </div>

          <div style={{ position: 'relative', height: 8, background: 'var(--border-base)', borderRadius: 4, overflow: 'hidden' }}>
            {/* Target Threshold Line at 80% */}
            <div style={{ position: 'absolute', right: '0%', top: 0, bottom: 0, width: '20%', background: 'rgba(220,38,38,0.2)' }} />
            <div style={{ height: '100%', width: `${(georeferencing.rmseMeters / georeferencing.targetRmseMeters) * 80}%`, background: 'var(--accent-primary)', borderRadius: 4 }} />
          </div>
        </div>
      </div>

      {/* Card E-2: Relative Structural Accuracy */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Scales size={18} color="#38BDF8" />
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                E-2 RELATIVE STRUCTURAL ACCURACY
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
              {structural.status}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '8px 0' }}>
            <span style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {structural.relativeErrorGsdMultiple} × GSD
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-accent)', fontFamily: 'var(--font-mono)' }}>
              ({(structural.relativeErrorGsdMultiple * structural.gsdCm).toFixed(1)} cm residual)
            </span>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>
            Local plane-fit residual error measured across structural facades relative to native {structural.gsdCm} cm/px GSD.
          </p>
        </div>

        {/* Visual Threshold Bar */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#38BDF8' }}>MEASURED: {structural.relativeErrorGsdMultiple}× GSD</span>
            <span style={{ color: 'var(--text-muted)' }}>TARGET: ≤ {structural.targetGsdMultiple}× GSD</span>
            <span style={{ color: 'var(--status-success)' }}>MARGIN: +{structMarginGsd.toFixed(1)}× GSD</span>
          </div>

          <div style={{ position: 'relative', height: 8, background: 'var(--border-base)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(structural.relativeErrorGsdMultiple / structural.targetGsdMultiple) * 70}%`, background: '#38BDF8', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
