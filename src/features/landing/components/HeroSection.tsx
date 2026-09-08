import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroScene } from './HeroScene';
import type { ViewportModeOption } from '../types';
import { ArrowRight, Cube, Crosshair } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<ViewportModeOption>('REALISTIC');

  return (
    <section className="relative w-full min-h-screen pt-20 pb-6 bg-[#07090E] flex flex-col justify-between overflow-hidden">
      {/* 3D Background Canvas */}
      <HeroScene />

      {/* Subtle radial background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main HUD Overlays Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col justify-between pt-4">

        {/* 1. Top Telemetry HUD Strip (Matches Reference Image) */}
        <div className="w-full bg-[#0C1018]/80 backdrop-blur-md border border-[#1E293B] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-xl">
          {/* Mission Tag */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-[#38BDF8] font-bold">MISSION-0842 // ACTIVE PASS</span>
            <span className="text-[#64748B]">|</span>
            <span className="text-[#10B981] font-semibold">REC_ONLINE</span>
          </div>

          {/* Telemetry Metrics */}
          <div className="flex flex-wrap items-center gap-6 text-[#94A3B8]">
            <div>
              <span className="text-[#64748B]">COVERAGE </span>
              <strong className="text-[#F8FAFC]">72.4% (312.4 ha)</strong>
            </div>
            <div>
              <span className="text-[#64748B]">GSD </span>
              <strong className="text-[#38BDF8]">3.2 cm/px</strong>
            </div>
            <div>
              <span className="text-[#64748B]">CALIB_POSES </span>
              <strong className="text-[#F8FAFC]">4,821 / 4,821</strong>
            </div>
          </div>

          {/* Processing Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">PROCESSING</span>
            <div className="w-24 h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div className="h-full bg-[#38BDF8] w-[67%]" />
            </div>
            <span className="text-[#38BDF8] font-bold">67%</span>
          </div>
        </div>

        {/* 2. Middle Content Area (Left-Aligned Headline + Subtitle + CTAs) */}
        <div className="my-auto py-10 space-y-5 max-w-3xl">
          {/* Coordinates Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#07090E]/90 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono font-bold tracking-wider shadow-md">
            <Crosshair className="w-3.5 h-3.5" />
            <span>43.2081° N, 05.3698° E :: ORTHOMOSAIC CALIBRATED</span>
          </div>

          {/* Oversized Left-Aligned Headline (Exact Reference Copy) */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#F8FAFC] tracking-tight leading-[1.05] uppercase">
            FROM A SINGLE FLIGHT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#10B981]">
              TO A COMPLETE DIGITAL TWIN.
            </span>
          </h1>

          {/* Technical Subtitle */}
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-2xl font-sans">
            Transform uncalibrated single-pass drone video into georeferenced, millimeter-precise 3D environments, metric dense point clouds, and actionable spatial intelligence.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/hub')}
              className="flex items-center gap-2.5 px-6 py-3 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded-lg font-mono font-bold text-xs tracking-wider transition-all shadow-xl shadow-cyan-500/25 hover:scale-[1.02]"
            >
              <span>EXPLORE MISSION RUN</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/digital-twin')}
              className="flex items-center gap-2.5 px-6 py-3 bg-[#0C1018]/90 hover:bg-[#1E293B] border border-[#38BDF8]/40 text-[#38BDF8] rounded-lg font-mono font-bold text-xs tracking-wider transition-all hover:border-[#38BDF8]"
            >
              <Cube className="w-4 h-4" />
              <span>LAUNCH DIGITAL TWIN VIEWER</span>
            </button>
          </div>
        </div>

        {/* 3. Bottom Instrument Bar & Mode Switcher */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-[#1E293B]/60 font-mono text-xs">
          {/* Flight Readout */}
          <div className="flex flex-wrap items-center gap-4 text-[#94A3B8]">
            <span className="text-[#38BDF8]">FOV 84.1°</span>
            <span>|</span>
            <span>ALT AGL: <strong>124.6M</strong></span>
            <span>|</span>
            <span>VEL: <strong>14.8 M/S</strong></span>
            <span>|</span>
            <span className="text-[#10B981] font-bold">RTK FIXED</span>
          </div>

          {/* Viewport Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-[#0C1018]/90 p-1 rounded-lg border border-[#1E293B]">
            {(['REALISTIC', 'POINT CLOUD', 'WIREFRAME', 'DEPTH MAP', 'CLASSIFIED'] as ViewportModeOption[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                  activeMode === mode
                    ? 'bg-[#38BDF8] text-[#07090E]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Ticker Footer Bar (Bottom of First Viewport) */}
      <div className="w-full bg-[#07090E] border-t border-[#1E293B] mt-4 py-2 px-6 text-[11px] font-mono text-[#64748B] flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span>WGS 84 / UTM 43N</span>
          <span>•</span>
          <span>LAT 23.8765° N</span>
          <span>•</span>
          <span>LON 70.4321° E</span>
          <span>•</span>
          <span>ALT 124.6M AGL</span>
          <span>•</span>
          <span className="text-[#38BDF8]">GSD 3.2 CM/PX</span>
        </div>
        <div className="text-[#94A3B8] font-semibold">
          AERIS DEFENSE INTEL // REV 4.2 SECURE ENCLAVE 01
        </div>
      </div>
    </section>
  );
};
