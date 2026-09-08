import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cube,
  Export,
  ShieldCheck,
  GlobeHemisphereWest,
  Clock,
  Sparkle,
  TrendUp,
  Airplane,
  Ruler
} from '@phosphor-icons/react';
import type { MissionArchiveRecord } from '../types';

interface FeaturedMissionHeroProps {
  mission: MissionArchiveRecord;
  onSelect: (mission: MissionArchiveRecord) => void;
}

export const FeaturedMissionHero: React.FC<FeaturedMissionHeroProps> = ({ mission, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0C1018] via-[#0F172A] to-[#0C1018] border border-[#38BDF8]/30 rounded-xl p-6 shadow-xl shadow-cyan-950/10">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#1E293B] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-mono font-semibold">
            <Sparkle className="w-3.5 h-3.5" />
            LATEST COMPLETED RECONSTRUCTED MISSION
          </span>
          <span className="text-xs font-mono text-[#64748B]">Recorded {mission.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#94A3B8]">
            Quality Score: <strong className="text-[#10B981] font-bold">{mission.qualityScore}%</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] text-xs font-mono font-medium border border-[#10B981]/30">
            {mission.status}
          </span>
        </div>
      </div>

      {/* Main Grid: Mission Info & Stat Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Col 1 & 2: Mission Title & Details */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-mono font-bold text-[#38BDF8]">{mission.id}</span>
            <h2 className="text-2xl font-bold text-[#F8FAFC] tracking-tight">{mission.siteName}</h2>
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
            {mission.description}
          </p>

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] pt-1">
            <div className="flex items-center gap-1.5">
              <GlobeHemisphereWest className="w-4 h-4 text-[#38BDF8]" />
              <span>{mission.locationCoordinates}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Airplane className="w-4 h-4 text-[#818CF8]" />
              <span>{mission.missionType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#F59E0B]" />
              <span>{mission.crs}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#10B981]" />
              <span>Duration: {mission.durationString}</span>
            </div>
          </div>
        </div>

        {/* Col 3: Stat Overview Cards */}
        <div className="grid grid-cols-2 gap-3 bg-[#07090E]/60 p-4 rounded-xl border border-[#1E293B]">
          <div className="p-2.5 rounded-lg bg-[#0C1018] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#64748B] uppercase">Survey Area</div>
            <div className="text-base font-mono font-bold text-[#38BDF8]">{mission.areaHa} ha</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0C1018] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#64748B] uppercase">Flight Distance</div>
            <div className="text-base font-mono font-bold text-[#818CF8]">{mission.flightDistanceKm} km</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0C1018] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#64748B] uppercase">Altitude AGL</div>
            <div className="text-base font-mono font-bold text-[#10B981]">{mission.altitudeAglM} m</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0C1018] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#64748B] uppercase">Keyframes</div>
            <div className="text-base font-mono font-bold text-[#F59E0B]">{mission.keyframesCount}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#1E293B]">
        <button
          onClick={() => onSelect(mission)}
          className="text-xs font-mono text-[#38BDF8] hover:text-[#7DD3FC] underline flex items-center gap-1"
        >
          <TrendUp className="w-3.5 h-3.5" />
          Inspect Mission Timeline & Detail Breakdown
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/digital-twin')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 rounded-lg text-xs font-medium transition-colors"
          >
            <Cube className="w-4 h-4" />
            3D Digital Twin
          </button>

          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#818CF8]/10 hover:bg-[#818CF8]/20 text-[#818CF8] border border-[#818CF8]/40 rounded-lg text-xs font-medium transition-colors"
          >
            <Export className="w-4 h-4" />
            Export Products
          </button>

          <button
            onClick={() => navigate('/qa')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 rounded-lg text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            QA & Accuracy
          </button>
        </div>
      </div>
    </div>
  );
};
