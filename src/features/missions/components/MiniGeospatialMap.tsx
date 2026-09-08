import React from 'react';
import { Crosshair, MapPin } from '@phosphor-icons/react';

interface MiniGeospatialMapProps {
  location: string;
  coordinates: string;
  areaHa: number;
}

export const MiniGeospatialMap: React.FC<MiniGeospatialMapProps> = ({
  location,
  coordinates,
  areaHa,
}) => {
  return (
    <div className="w-full rounded-xl border border-[#1E293B] bg-[#07090E] p-4 font-mono text-xs relative overflow-hidden">
      {/* Schematic Map Background Canvas SVG */}
      <div className="relative w-full h-44 bg-[#090D16] rounded-lg border border-[#1E293B]/80 overflow-hidden flex items-center justify-center">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Survey Boundary Polygon & Flight Trajectory SVG */}
        <svg className="w-full h-full absolute inset-0 text-[#38BDF8]">
          {/* Survey boundary polygon */}
          <polygon
            points="40,30 280,45 320,130 90,145 30,90"
            fill="rgba(14,165,233,0.08)"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Flight trajectory path */}
          <path
            d="M 50 45 L 260 55 L 290 80 L 70 95 L 100 125 L 300 135"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.5"
          />

          {/* Camera pose markers */}
          {[
            { x: 50, y: 45 },
            { x: 120, y: 49 },
            { x: 190, y: 52 },
            { x: 260, y: 55 },
            { x: 290, y: 80 },
            { x: 180, y: 88 },
            { x: 70, y: 95 },
            { x: 100, y: 125 },
            { x: 200, y: 130 },
            { x: 300, y: 135 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3"
              fill="#07090E"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Center Target Indicator */}
        <div className="relative z-10 flex flex-col items-center gap-1 bg-[#0C1018]/90 p-2 rounded-lg border border-[#38BDF8]/40 backdrop-blur-sm shadow-xl">
          <Crosshair size={20} className="text-[#38BDF8] animate-pulse" />
          <span className="text-[10px] text-[#F8FAFC] font-bold">
            SURVEY CENTROID
          </span>
          <span className="text-[9px] text-[#10B981] font-mono">
            {coordinates}
          </span>
        </div>
      </div>

      {/* Map Footer Metadata */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-[#38BDF8]" />
          <span className="text-[#F8FAFC] font-semibold">{location}</span>
        </div>
        <div>
          <span className="text-[#64748B]">AREA: </span>
          <strong className="text-[#38BDF8]">{areaHa} ha</strong>
        </div>
      </div>
    </div>
  );
};
