import React from 'react';
import { MapPin, Compass } from '@phosphor-icons/react';
import type { MissionArchiveRecord } from '../types';

interface MiniGeographicMapProps {
  mission: MissionArchiveRecord;
  className?: string;
}

export const MiniGeographicMap: React.FC<MiniGeographicMapProps> = ({ mission, className = '' }) => {
  const centerLat = mission.lat;
  const centerLng = mission.lon;

  return (
    <div className={`relative overflow-hidden bg-[#07090E] border border-[#1E293B] rounded-lg p-3 ${className}`}>
      {/* Top Map Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-2 pb-1 border-b border-[#1E293B]">
        <div className="flex items-center gap-1.5 text-[#38BDF8]">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#F8FAFC]">SURVEY GEOMETRY</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{centerLat.toFixed(4)}° N</span>
          <span>{centerLng.toFixed(4)}° E</span>
        </div>
      </div>

      {/* SVG Canvas depicting Flight Path & Survey Bounds */}
      <div className="relative w-full h-44 bg-[#090D16] rounded border border-[#1E293B]/60 overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" width="100%" height="100%">
          <defs>
            <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#miniGrid)" />
        </svg>

        {/* Survey Boundary Polygon & Flight Path */}
        <svg viewBox="0 0 300 160" className="w-full h-full relative z-10">
          {/* Survey Area Fill */}
          <polygon
            points="40,30 260,25 270,135 30,140"
            fill="#38BDF8"
            fillOpacity="0.08"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* UAV Flight Trajectory Lawn-mower grid lines */}
          <path
            d="M 50,45 L 250,40 M 250,65 L 50,70 M 50,95 L 250,90 M 250,115 L 50,120"
            fill="none"
            stroke="#818CF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Trajectory points */}
          <circle cx="50" cy="45" r="3" fill="#10B981" />
          <circle cx="250" cy="40" r="2.5" fill="#818CF8" />
          <circle cx="250" cy="65" r="2.5" fill="#818CF8" />
          <circle cx="50" cy="70" r="2.5" fill="#818CF8" />
          <circle cx="50" cy="120" r="3" fill="#EF4444" />
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-[#07090E]/90 px-2 py-1 rounded text-[10px] font-mono border border-[#1E293B]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="text-[#94A3B8]">Bounds</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#818CF8]" />
            <span className="text-[#94A3B8]">Trajectory</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 text-[#64748B] flex items-center gap-1 text-[10px] font-mono">
          <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>N 0°</span>
        </div>
      </div>

      {/* Coverage & Area statistics */}
      <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] font-mono">
        <div className="bg-[#0C1018] p-1.5 rounded border border-[#1E293B] flex justify-between">
          <span className="text-[#64748B]">Area:</span>
          <span className="text-[#F8FAFC] font-semibold">{mission.areaHa} ha</span>
        </div>
        <div className="bg-[#0C1018] p-1.5 rounded border border-[#1E293B] flex justify-between">
          <span className="text-[#64748B]">Altitude:</span>
          <span className="text-[#F8FAFC] font-semibold">{mission.altitudeAglM} m AGL</span>
        </div>
      </div>
    </div>
  );
};
