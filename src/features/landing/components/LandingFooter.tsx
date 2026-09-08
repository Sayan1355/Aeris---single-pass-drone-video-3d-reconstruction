import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, CheckCircle } from '@phosphor-icons/react';

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#07090E] border-t border-[#1E293B] py-12 px-6 font-mono text-xs text-[#64748B]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1E293B]">
        {/* Col 1: Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#38BDF8] flex items-center justify-center text-[#07090E]">
              <Crosshair className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-[#F8FAFC]">AERIS</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed font-sans">
            Single-Pass Drone Video 3D Reconstruction & Spatial Intelligence Platform.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-[10px]">
            <CheckCircle className="w-3 h-3" />
            SYSTEMS NOMINAL
          </div>
        </div>

        {/* Col 2: Workspace Links */}
        <div className="space-y-2">
          <div className="text-[#F8FAFC] font-bold uppercase text-[11px]">WORKSPACE MODULES</div>
          <ul className="space-y-1.5 text-[11px]">
            <li><button onClick={() => navigate('/hub')} className="hover:text-[#38BDF8]">Mission Hub</button></li>
            <li><button onClick={() => navigate('/pipeline')} className="hover:text-[#38BDF8]">Reconstruction Command</button></li>
            <li><button onClick={() => navigate('/digital-twin')} className="hover:text-[#38BDF8]">3D Digital Twin Viewer</button></li>
            <li><button onClick={() => navigate('/geospatial')} className="hover:text-[#38BDF8]">Geospatial Intelligence</button></li>
          </ul>
        </div>

        {/* Col 3: Intelligence Deliverables */}
        <div className="space-y-2">
          <div className="text-[#F8FAFC] font-bold uppercase text-[11px]">SPATIAL PRODUCTS</div>
          <ul className="space-y-1.5 text-[11px]">
            <li><button onClick={() => navigate('/products')} className="hover:text-[#38BDF8]">Dense Point Clouds (.LAZ)</button></li>
            <li><button onClick={() => navigate('/products')} className="hover:text-[#38BDF8]">Orthomosaic Rasters (.GeoTIFF)</button></li>
            <li><button onClick={() => navigate('/products')} className="hover:text-[#38BDF8]">Digital Surface Models (DSM)</button></li>
            <li><button onClick={() => navigate('/qa')} className="hover:text-[#38BDF8]">QA Residual Error Audits</button></li>
          </ul>
        </div>

        {/* Col 4: Platform Metadata */}
        <div className="space-y-2">
          <div className="text-[#F8FAFC] font-bold uppercase text-[11px]">OPERATIONAL SPECS</div>
          <div className="text-[11px] space-y-1">
            <div>Platform Version: <strong className="text-[#38BDF8]">v2.4.0-PROD</strong></div>
            <div>Build Engine: <strong>SfM-MVS v4.1</strong></div>
            <div>CRS Engine: <strong>PROJ4 / EPSG:4326</strong></div>
            <div>Security Enclave: <strong>SECURE-01</strong></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>© 2026 AERIS UAV RECONSTRUCTION. ALL SPATIAL INTELLIGENCE RIGHTS RESERVED.</div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/settings')} className="hover:text-[#38BDF8]">SYSTEM CONFIGURATION</button>
          <span>•</span>
          <button onClick={() => navigate('/telemetry')} className="hover:text-[#38BDF8]">LIVE TELEMETRY STREAM</button>
        </div>
      </div>
    </footer>
  );
};
