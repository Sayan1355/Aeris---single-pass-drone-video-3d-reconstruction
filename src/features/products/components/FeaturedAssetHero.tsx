// ============================================================
// AERIS — Phase 6 Featured Asset Hero Component
// Highlighted showcase for primary 3D Digital Twin Tileset
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cube, DownloadSimple, ArrowSquareOut } from '@phosphor-icons/react';
import type { ProductAsset } from '../types';

interface FeaturedAssetHeroProps {
  asset: ProductAsset;
  onExport: (asset: ProductAsset) => void;
}

export const FeaturedAssetHero: React.FC<FeaturedAssetHeroProps> = ({ asset, onExport }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(17,23,32,0.95) 0%, rgba(22,30,44,0.95) 100%)',
        border: '1px solid rgba(14,165,233,0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 25px rgba(14,165,233,0.08), var(--shadow-panel)',
      }}
    >
      {/* Background Accent Grid Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(14,165,233,0.08) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignItems: 'center',
        }}
      >
        {/* Left Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Badge line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--accent-primary)',
                background: 'rgba(14,165,233,0.15)',
                border: '1px solid rgba(14,165,233,0.4)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
              }}
            >
              PRIMARY FEATURED ASSET
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--status-success)',
                background: 'rgba(5,150,105,0.12)',
                border: '1px solid rgba(5,150,105,0.3)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              STATUS: READY
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                margin: '0 0 6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Cube size={24} color="var(--accent-primary)" weight="duotone" />
              {asset.name}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {asset.description}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              background: 'rgba(7,9,14,0.6)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              marginTop: 4,
            }}
          >
            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                FORMAT &amp; VER
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {asset.format} ({asset.version})
              </span>
            </div>

            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                POLYGON COUNT
              </span>
              <span style={{ fontSize: 12, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {asset.polygonCount || '14.2M'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                CONFIDENCE
              </span>
              <span style={{ fontSize: 12, color: 'var(--status-success)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {asset.confidence || '99.4%'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                CRS
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {asset.crs}
              </span>
            </div>

            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                GSD / ACCURACY
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {asset.gsd}
              </span>
            </div>

            <div>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                FILE SIZE
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {asset.size}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <button
              onClick={() => navigate('/digital-twin')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent-primary)',
                color: '#07090E',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 18px',
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: '0 0 15px rgba(14,165,233,0.3)',
              }}
            >
              <ArrowSquareOut size={16} weight="bold" />
              <span>OPEN DIGITAL TWIN</span>
            </button>

            <button
              onClick={() => onExport(asset)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(14,165,233,0.12)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(14,165,233,0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 18px',
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <DownloadSimple size={16} />
              <span>DOWNLOAD ASSET</span>
            </button>
          </div>
        </div>

        {/* Right Graphical Card */}
        <div
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              SPATIAL TILESET SPECS
            </span>
            <span style={{ fontSize: 10, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
              {asset.shortCode}
            </span>
          </div>

          {/* Graphical Wireframe Spec Canvas Preview Box */}
          <div
            style={{
              height: 110,
              background: '#090D14',
              borderRadius: 'var(--radius-xs)',
              border: '1px dashed var(--border-base)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Grid overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(14,165,233,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <Cube size={40} color="var(--accent-primary)" weight="duotone" style={{ zIndex: 2, opacity: 0.8 }} />
            <div
              style={{
                fontSize: 10,
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                marginTop: 6,
                zIndex: 2,
              }}
            >
              Cesium 3D Tiles / GLB 2.0
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>GENERATED:</span>
            <span style={{ color: 'var(--text-secondary)' }}>{asset.generatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
