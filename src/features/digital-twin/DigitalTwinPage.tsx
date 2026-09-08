// ============================================================
// AERIS — 3D Digital Twin & Geospatial Intelligence Workspace (Phase 4)
// ============================================================

import { TopInfoBar }          from './components/TopInfoBar';
import { LayerControlPanel }   from './components/LayerControlPanel';
import { ViewModeSelector }    from './components/ViewModeSelector';
import { MetadataInspector }   from './components/MetadataInspector';
import { MeasurementToolbar }  from './components/MeasurementToolbar';
import { TemporalSlider }      from './components/TemporalSlider';
import { DigitalTwinViewport } from './components/DigitalTwinViewport';

export function DigitalTwinPage() {
  return (
    <div
      role="main"
      id="twin-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
      }}
    >
      {/* 1. Top Information Bar */}
      <TopInfoBar />

      {/* 2. Main 3D Spatial Workspace */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          // LEFT (Layers + Measurement) | CENTER (3D Viewport) | RIGHT (Metadata Inspector)
          gridTemplateColumns: '250px 1fr 240px',
          gridTemplateRows: '1fr',
          gap: 0,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* LEFT COLUMN — GIS Layers & Measurement Tools */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '10px 8px 10px 10px',
            overflowY: 'auto',
            borderRight: '1px solid var(--border-base)',
          }}
        >
          <LayerControlPanel />
          <MeasurementToolbar />
        </div>

      {/* CENTER COLUMN — 3D Viewport with Floating ViewMode Overlay */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          <DigitalTwinViewport />

          {/* Floating View Mode Selector Overlay (Top Left of Viewport) */}
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
            <ViewModeSelector />
          </div>
        </div>

        {/* RIGHT COLUMN — Feature Inspector */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 10px 10px 8px',
            overflow: 'hidden',
            borderLeft: '1px solid var(--border-base)',
          }}
        >
          <MetadataInspector />
        </div>
      </div>

      {/* 3. Bottom Temporal Timeline Slider */}
      <TemporalSlider />
    </div>
  );
}
