// ============================================================
// AERIS — Page exports
// Barrel file — import all pages from here for clean routing
// ============================================================

// Phase 2 — Real screen
export { MissionHubPage } from './MissionHubPage';

// Phase 3 — Real screen
export { ReconstructionPage } from '../features/reconstruction/ReconstructionPage';

// Phase 1 shell placeholders (replaced in future phases)
export { PagePlaceholder } from '../components/ui/PagePlaceholder';

export { MissionsPage } from '../features/missions/MissionsPage';

export { LiveTelemetryPage as TelemetryPage } from '../features/telemetry/LiveTelemetryPage';

export { ReconstructionPage as PipelinePage } from '../features/reconstruction/ReconstructionPage';

export { DigitalTwinPage } from '../features/digital-twin/DigitalTwinPage';

export { GeospatialPage } from '../features/geospatial/GeospatialPage';

export { ProductsPage } from '../features/products/ProductsPage';

export { QAAccuracyPage as QAPage } from '../features/qa/QAAccuracyPage';

export { MissionHistoryPage as HistoryPage } from '../features/history/MissionHistoryPage';

export { SettingsPage } from '../features/settings/SettingsPage';
