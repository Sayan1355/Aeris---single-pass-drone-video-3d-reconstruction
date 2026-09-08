// ============================================================
// AERIS — Phase 6 Product Asset Library Grid
// Filterable asset library grid with category tabs
// ============================================================

import React, { useState } from 'react';
import type { ProductAsset, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { FunnelSimple } from '@phosphor-icons/react';

interface ProductGridProps {
  products: ProductAsset[];
  selectedAsset: ProductAsset | null;
  onSelectAsset: (asset: ProductAsset) => void;
  onExportAsset: (asset: ProductAsset) => void;
  onInspectAsset: (asset: ProductAsset) => void;
}

type FilterTab = 'ALL' | ProductCategory;

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedAsset,
  onSelectAsset,
  onExportAsset,
  onInspectAsset,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'ALL', label: 'ALL PRODUCTS' },
    { id: '3d_mesh', label: '3D & MESH' },
    { id: 'point_cloud', label: 'POINT CLOUD' },
    { id: 'raster', label: 'RASTERS & DEM' },
    { id: 'vector', label: 'VECTORS & TRAJECTORY' },
    { id: 'report', label: 'QA REPORTS' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'ALL') return true;
    return p.category === activeTab;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Navigation Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-base)',
          paddingBottom: 10,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'rgba(14,165,233,0.14)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-base)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <FunnelSimple size={14} />
          <span>SHOWING {filteredProducts.length} OF {products.length} ASSETS</span>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: 16,
        }}
      >
        {filteredProducts.map((asset) => (
          <ProductCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAsset?.id === asset.id}
            onSelect={onSelectAsset}
            onExport={onExportAsset}
            onInspect={onInspectAsset}
          />
        ))}
      </div>
    </div>
  );
};
