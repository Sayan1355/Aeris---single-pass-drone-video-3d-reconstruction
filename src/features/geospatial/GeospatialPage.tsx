// ============================================================
// AERIS — Geospatial Analysis Workspace (Phase 5)
// ============================================================

import { GeospatialHeader }       from './components/GeospatialHeader';
import { LayerPanel }             from './components/LayerPanel';
import { MapModeSelector }        from './components/MapModeSelector';
import { GeospatialInspector }    from './components/GeospatialInspector';
import { MapMeasurementTools }    from './components/MapMeasurementTools';
import { TrajectoryAnalysisPanel }from './components/TrajectoryAnalysisPanel';
import { CoverageAnalysisPanel }  from './components/CoverageAnalysisPanel';
import { ElevationProfileChart }  from './components/ElevationProfileChart';
import { CrsCoordinatePanel }     from './components/CrsCoordinatePanel';
import { GeospatialTimeline }     from './components/GeospatialTimeline';
import { GeospatialMapViewport }  from './components/GeospatialMapViewport';

export function GeospatialPage() {
  return (
    <div
      role="main"
      id="geo-main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
      }}
    >
      {/* 1. Header Bar */}
      <GeospatialHeader />

      {/* 2. Main Spatial Workspace */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          // LEFT (Layers, Measurement, CRS, Elevation Chart) | CENTER (Cesium Map) | RIGHT (Inspector, Trajectory, Coverage)
          gridTemplateColumns: '260px 1fr 250px',
          gridTemplateRows: '1fr',
          gap: 0,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* LEFT COLUMN — Layers & Tools */}
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
          <LayerPanel />
          <MapMeasurementTools />
          <CrsCoordinatePanel />
          <ElevationProfileChart />
        </div>

        {/* CENTER COLUMN — Main Interactive Map Viewport */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          <GeospatialMapViewport />

          {/* Floating Map Mode Selector (Top Left of Map) */}
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
            <MapModeSelector />
          </div>
        </div>

        {/* RIGHT COLUMN — Inspector & Analytics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '10px 10px 10px 8px',
            overflowY: 'auto',
            borderLeft: '1px solid var(--border-base)',
          }}
        >
          <GeospatialInspector />
          <TrajectoryAnalysisPanel />
          <CoverageAnalysisPanel />
        </div>
      </div>

      {/* 3. Bottom Temporal Flight Timeline */}
      <GeospatialTimeline />
    </div>
  );
}
