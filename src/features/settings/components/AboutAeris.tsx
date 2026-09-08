import React from 'react';
import { FlyingSaucer, ShieldCheck, Code, Globe, Cpu } from '@phosphor-icons/react';

export const AboutAeris: React.FC = () => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Platform Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
            <FlyingSaucer className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <span>AERIS AEROSPACE PLATFORM</span>
              <span>•</span>
              <span className="text-[#10B981] font-bold">RELEASE READY</span>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC]">AERIS UAV 3D Reconstruction Engine</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Single-Pass Drone Video 3D Reconstruction & Spatial Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-[#07090E] border border-[#1E293B] text-[#38BDF8] font-bold">
            v2.4.0-PROD
          </span>
        </div>
      </div>

      {/* About Description */}
      <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-3xl">
        AERIS is an enterprise-grade photogrammetry and spatial reconstruction platform engineered for real-time single-pass UAV video conversion into high-density 3D digital twins, orthomosaics, and Digital Surface Models (DSM). Designed for infrastructure inspection, defense intelligence, disaster reconnaissance, and smart city spatial auditing.
      </p>

      {/* System Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 bg-[#07090E] rounded-lg border border-[#1E293B] space-y-1">
          <div className="text-[#64748B] flex items-center gap-1.5 text-[11px]">
            <Code className="w-3.5 h-3.5 text-[#38BDF8]" />
            Frontend Build
          </div>
          <div className="text-[#F8FAFC] font-bold">2026.09.08-rc3</div>
        </div>

        <div className="p-3 bg-[#07090E] rounded-lg border border-[#1E293B] space-y-1">
          <div className="text-[#64748B] flex items-center gap-1.5 text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-[#818CF8]" />
            SfM Pipeline Engine
          </div>
          <div className="text-[#F8FAFC] font-bold">v4.1.0-SfM-Dense</div>
        </div>

        <div className="p-3 bg-[#07090E] rounded-lg border border-[#1E293B] space-y-1">
          <div className="text-[#64748B] flex items-center gap-1.5 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-[#10B981]" />
            Geospatial Kernel
          </div>
          <div className="text-[#F8FAFC] font-bold">Cesium 1.115 / PROJ4</div>
        </div>

        <div className="p-3 bg-[#07090E] rounded-lg border border-[#1E293B] space-y-1">
          <div className="text-[#64748B] flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            Compliance Standard
          </div>
          <div className="text-[#F8FAFC] font-bold">ISO-19115 / OGC</div>
        </div>
      </div>
    </div>
  );
};
