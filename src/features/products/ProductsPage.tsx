// ============================================================
// AERIS — Phase 6 Products / Export Center Main Workspace
// Final generated spatial-intelligence artifacts & asset library
// ============================================================

import { useState } from 'react';
import { ProductHeader } from './components/ProductHeader';
import { DigitalTwinPreview } from './components/DigitalTwinPreview';
import { FeaturedAssetHero } from './components/FeaturedAssetHero';
import { ProductGrid } from './components/ProductGrid';
import { ProductInspector } from './components/ProductInspector';
import { ExportModal } from './components/ExportModal';
import { ProductPipelineContext } from './components/ProductPipelineContext';
import { ProductMetrics } from './components/ProductMetrics';

import { MOCK_PRODUCTS, MOCK_PRODUCT_METRICS } from './data/mockProducts';
import type { ProductAsset } from './types';

export function ProductsPage() {
  const featuredAsset = MOCK_PRODUCTS.find((p) => p.isFeatured) || MOCK_PRODUCTS[0];

  const [selectedAsset, setSelectedAsset] = useState<ProductAsset | null>(featuredAsset);
  const [exportModalAsset, setExportModalAsset] = useState<ProductAsset | null>(null);

  const handleOpenExport = (asset: ProductAsset) => {
    setExportModalAsset(asset);
  };

  const handleInspectAsset = (asset: ProductAsset) => {
    setSelectedAsset(asset);
  };

  return (
    <div
      role="main"
      id="products-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
      }}
    >
      {/* 1. Page Header */}
      <ProductHeader />

      {/* Main Content Area Grid */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* 2. Pipeline Context Banner */}
        <ProductPipelineContext />

        {/* 3. Product Summary Metrics */}
        <ProductMetrics metrics={MOCK_PRODUCT_METRICS} />

        {/* 4. Primary Centerpiece Digital Twin 3D Viewport Preview */}
        <DigitalTwinPreview />

        {/* 5. Featured Asset Hero Showcase */}
        <FeaturedAssetHero
          asset={featuredAsset}
          onExport={handleOpenExport}
        />

        {/* 6. Main Asset Library + Inspector Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selectedAsset ? '1fr 340px' : '1fr',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {/* Asset Grid */}
          <div>
            <ProductGrid
              products={MOCK_PRODUCTS}
              selectedAsset={selectedAsset}
              onSelectAsset={setSelectedAsset}
              onExportAsset={handleOpenExport}
              onInspectAsset={handleInspectAsset}
            />
          </div>

          {/* Asset Inspector Side Panel */}
          {selectedAsset && (
            <div style={{ position: 'sticky', top: 16 }}>
              <ProductInspector
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
                onExport={handleOpenExport}
              />
            </div>
          )}
        </div>
      </div>

      {/* 7. Interactive Export Dialog Modal */}
      {exportModalAsset && (
        <ExportModal
          asset={exportModalAsset}
          onClose={() => setExportModalAsset(null)}
        />
      )}
    </div>
  );
}
