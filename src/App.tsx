// ============================================================
// AERIS — App Root
// Shell layout + React Router routes
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TopBar } from './components/layout/TopBar';
import { LeftNav } from './components/layout/LeftNav';
import { StatusBar } from './components/layout/StatusBar';
import { useAppStore } from './stores/useAppStore';
import { LandingPage } from './features/landing/LandingPage';
import {
  MissionHubPage,
  MissionsPage,
  TelemetryPage,
  PipelinePage,
  DigitalTwinPage,
  GeospatialPage,
  ProductsPage,
  QAPage,
  HistoryPage,
  SettingsPage,
} from './pages/index';

function AppShell() {
  const { navCollapsed } = useAppStore();

  return (
    <div
      className={`aeris-shell ${navCollapsed ? 'nav-collapsed' : ''}`}
      style={{
        gridTemplateColumns: navCollapsed ? 'var(--nav-collapsed) 1fr' : 'var(--nav-width) 1fr',
        transition: 'grid-template-columns var(--transition-slow)',
      }}
    >
      {/* Fixed Top Bar */}
      <TopBar />

      {/* Left Navigation */}
      <LeftNav />

      {/* Main Content Area */}
      <main
        style={{
          gridArea: 'content',
          background: 'var(--bg-surface)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
        id="main-content"
        tabIndex={-1}
      >
        <div className="w-full h-full overflow-y-auto page-transition-enter">
          <Routes>
            <Route path="/hub"          element={<MissionHubPage />} />
            <Route path="/missions"     element={<MissionsPage />} />
            <Route path="/telemetry"    element={<TelemetryPage />} />
            <Route path="/pipeline"     element={<PipelinePage />} />
            <Route path="/digital-twin" element={<DigitalTwinPage />} />
            <Route path="/geospatial"   element={<GeospatialPage />} />
            <Route path="/products"     element={<ProductsPage />} />
            <Route path="/qa"           element={<QAPage />} />
            <Route path="/history"      element={<HistoryPage />} />
            <Route path="/settings"     element={<SettingsPage />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/hub" replace />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  );
}
