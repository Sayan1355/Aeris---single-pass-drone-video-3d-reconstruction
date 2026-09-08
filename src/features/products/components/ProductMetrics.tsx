// ============================================================
// AERIS — Phase 6 Product Metrics & Quality Indicators Component
// Technical metrics summary & verification checks
// ============================================================

import React from 'react';
import { HardDrive, Cube, Mountains, GridNine, Compass } from '@phosphor-icons/react';
import type { ProductMetrics as ProductMetricsType } from '../types';

interface ProductMetricsProps {
  metrics: ProductMetricsType;
}

export const ProductMetrics: React.FC<ProductMetricsProps> = ({ metrics }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
      }}
    >
      {/* Metric 1: Total Products */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(14,165,233,0.12)',
            border: '1px solid rgba(14,165,233,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
          }}
        >
          <Cube size={20} weight="duotone" />
        </div>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', display: 'block' }}>
            TOTAL PRODUCTS
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {metrics.totalProducts} ASSETS
          </span>
        </div>
      </div>

      {/* Metric 2: 3D Assets & Point Cloud */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(56,189,248,0.12)',
            border: '1px solid rgba(56,189,248,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38BDF8',
          }}
        >
          <GridNine size={20} weight="duotone" />
        </div>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', display: 'block' }}>
            POINT CLOUD
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            {metrics.pointCloudPoints}
          </span>
        </div>
      </div>

      {/* Metric 3: Rasters */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(52,211,153,0.12)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34D399',
          }}
        >
          <Mountains size={20} weight="duotone" />
        </div>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', display: 'block' }}>
            RASTER PRODUCTS
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
            {metrics.rasterProducts} GEO-TIFFS
          </span>
        </div>
      </div>

      {/* Metric 4: Total Storage */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FBBF24',
          }}
        >
          <HardDrive size={20} weight="duotone" />
        </div>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', display: 'block' }}>
            TOTAL OUTPUT SIZE
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {metrics.totalOutputSize}
          </span>
        </div>
      </div>

      {/* Metric 5: CRS & GSD */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A855F7',
          }}
        >
          <Compass size={20} weight="duotone" />
        </div>
        <div>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', display: 'block' }}>
            GSD &amp; COORDINATE SYSTEM
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-accent)', fontFamily: 'var(--font-mono)' }}>
            {metrics.gsd} • UTM 43N
          </span>
        </div>
      </div>
    </div>
  );
};
