// ============================================================
// AERIS — Phase 6 Technical Product Card Component
// Individual asset card with technical metadata & action triggers
// ============================================================

import React from 'react';
import {
  Cube,
  GridNine,
  Mountains,
  FileCode,
  FilePdf,
  Eye,
  DownloadSimple,
  Info,
} from '@phosphor-icons/react';
import type { ProductAsset } from '../types';

interface ProductCardProps {
  asset: ProductAsset;
  isSelected: boolean;
  onSelect: (asset: ProductAsset) => void;
  onExport: (asset: ProductAsset) => void;
  onInspect: (asset: ProductAsset) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  asset,
  isSelected,
  onSelect,
  onExport,
  onInspect,
}) => {
  const getCategoryIcon = (category: ProductAsset['category']) => {
    switch (category) {
      case '3d_mesh':
        return <Cube size={20} color="var(--accent-primary)" weight="duotone" />;
      case 'point_cloud':
        return <GridNine size={20} color="#38BDF8" weight="duotone" />;
      case 'raster':
        return <Mountains size={20} color="#34D399" weight="duotone" />;
      case 'vector':
        return <FileCode size={20} color="#FBBF24" weight="duotone" />;
      case 'report':
        return <FilePdf size={20} color="#F87171" weight="duotone" />;
      default:
        return <Cube size={20} color="var(--accent-primary)" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(asset)}
      style={{
        background: isSelected
          ? 'linear-gradient(180deg, rgba(22,30,44,0.95) 0%, rgba(17,23,32,0.95) 100%)'
          : 'var(--bg-card)',
        border: isSelected
          ? '1px solid var(--accent-primary)'
          : '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 12,
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        boxShadow: isSelected
          ? '0 0 16px rgba(14,165,233,0.2)'
          : 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top row: Icon, Name, Format badge */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(12,16,24,0.7)',
                border: '1px solid var(--border-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getCategoryIcon(asset.category)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                {asset.name}
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {asset.shortCode} • {asset.version}
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--status-success)',
              background: 'rgba(5,150,105,0.12)',
              border: '1px solid rgba(5,150,105,0.3)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            {asset.status}
          </span>
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
          {asset.description}
        </p>

        {/* Key Attributes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            background: 'var(--bg-app)',
            border: '1px solid var(--border-muted)',
            borderRadius: 'var(--radius-xs)',
            padding: '8px 10px',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>FORMAT</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.format}</span>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>FILE SIZE</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.size}</span>
          </div>

          {asset.gsd && (
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>GSD</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.gsd}</span>
            </div>
          )}

          {asset.pointCount && (
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>POINTS</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.pointCount}</span>
            </div>
          )}

          {asset.polygonCount && (
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>POLYGONS</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{asset.polygonCount}</span>
            </div>
          )}

          {asset.resolution && (
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>RESOLUTION</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{asset.resolution}</span>
            </div>
          )}

          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>CRS</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 9 }}>{asset.crs}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(asset);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '6px 8px',
            fontSize: 11,
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-base)',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <Eye size={13} />
          <span>VIEW</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(asset);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '6px 8px',
            fontSize: 11,
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.25)',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--accent-primary)',
            cursor: 'pointer',
          }}
        >
          <Info size={13} />
          <span>INSPECT</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onExport(asset);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '6px 8px',
            fontSize: 11,
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            background: 'var(--accent-primary)',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            color: '#07090E',
            cursor: 'pointer',
          }}
        >
          <DownloadSimple size={13} weight="bold" />
          <span>EXPORT</span>
        </button>
      </div>
    </div>
  );
};
