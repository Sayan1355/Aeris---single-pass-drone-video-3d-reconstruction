import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MissionRecord } from '../types';
import {
  Pulse,
  ArrowSquareOut,
  Cpu,
  MapPin,
  Camera,
  Ruler,
  Stack,
  Crosshair,
} from '@phosphor-icons/react';

interface ActiveMissionFeaturedPanelProps {
  mission: MissionRecord;
}

export const ActiveMissionFeaturedPanel: React.FC<ActiveMissionFeaturedPanelProps> = ({
  mission,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mx-6 my-4 p-5 rounded-xl bg-gradient-to-r from-[#0C1018] via-[#0F172A] to-[#0C1018] border border-[#38BDF8]/40 shadow-xl relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono font-bold">
            <Pulse size={14} className="animate-spin text-[#38BDF8]" />
            <span>FEATURED ACTIVE MISSION</span>
          </span>
          <span className="text-sm font-mono font-extrabold text-[#F8FAFC]">
            {mission.id}
          </span>
          <span className="text-[#64748B]">|</span>
          <span className="text-xs font-mono text-[#CBD5E1] flex items-center gap-1">
            <MapPin size={13} className="text-[#38BDF8]" />
            {mission.location}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
          <Crosshair size={13} className="text-[#10B981]" />
          <span>{mission.coordinates}</span>
        </div>
      </div>

      {/* Grid Metrics & Progress */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 py-4 font-mono text-xs">
        <div>
          <span className="text-[#64748B] block text-[11px]">PLATFORM</span>
          <strong className="text-[#F8FAFC] font-semibold flex items-center gap-1 mt-0.5">
            <Camera size={13} className="text-[#38BDF8]" />
            {mission.platform}
          </strong>
        </div>

        <div>
          <span className="text-[#64748B] block text-[11px]">SURVEY AREA</span>
          <strong className="text-[#F8FAFC] font-semibold mt-0.5 block">
            {mission.areaHa} ha
          </strong>
        </div>

        <div>
          <span className="text-[#64748B] block text-[11px]">GROUND SAMPLING</span>
          <strong className="text-[#38BDF8] font-semibold flex items-center gap-1 mt-0.5">
            <Ruler size={13} />
            {mission.gsdCmPx} cm/px
          </strong>
        </div>

        <div>
          <span className="text-[#64748B] block text-[11px]">CURATED FRAMES</span>
          <strong className="text-[#F8FAFC] font-semibold flex items-center gap-1 mt-0.5">
            <Stack size={13} className="text-[#10B981]" />
            {mission.frameCount.toLocaleString()} / {mission.totalFrames.toLocaleString()}
          </strong>
        </div>

        <div>
          <span className="text-[#64748B] block text-[11px]">ACTIVE PIPELINE STAGE</span>
          <strong className="text-[#38BDF8] font-semibold truncate block mt-0.5">
            {mission.currentStage}
          </strong>
        </div>

        <div>
          <span className="text-[#64748B] block text-[11px]">PROGRESS STATUS</span>
          <strong className="text-[#10B981] font-semibold block mt-0.5">
            {mission.progressPct}% IN PROGRESS
          </strong>
        </div>
      </div>

      {/* Progress Bar & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-[#1E293B]">
        <div className="flex-1 flex items-center gap-3 font-mono text-xs">
          <span className="text-[#64748B] text-[11px] font-bold">PIPELINE PROGRESS</span>
          <div className="flex-1 h-2.5 bg-[#1E293B] rounded-full overflow-hidden border border-[#334155]">
            <div
              className="h-full bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#10B981] rounded-full transition-all duration-500"
              style={{ width: `${mission.progressPct}%` }}
            />
          </div>
          <span className="text-[#38BDF8] font-bold">{mission.progressPct}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/hub')}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#1E293B] hover:bg-[#334155] border border-[#38BDF8]/30 text-[#38BDF8] rounded-lg text-xs font-mono font-bold transition-all"
          >
            <ArrowSquareOut size={14} />
            <span>OPEN MISSION</span>
          </button>

          <button
            onClick={() => navigate('/pipeline')}
            className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded-lg text-xs font-mono font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            <Cpu size={15} />
            <span>VIEW RECONSTRUCTION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
