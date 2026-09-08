import React from 'react';
import {
  Path,
  HardDrives,
  MapPinLine,
  FilmStrip,
  Sparkle
} from '@phosphor-icons/react';
import type { MissionHistorySummary } from '../types';

interface HistoryStatsSummaryProps {
  summary: MissionHistorySummary;
}

export const HistoryStatsSummary: React.FC<HistoryStatsSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* Card 1: Total Distance */}
      <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
          <Path className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#64748B] uppercase">Total Flight Distance</div>
          <div className="text-base font-mono font-bold text-[#F8FAFC]">
            {summary.totalDistanceKm} km
          </div>
        </div>
      </div>

      {/* Card 2: Total Area */}
      <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          <MapPinLine className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#64748B] uppercase">Mapped Surface Area</div>
          <div className="text-base font-mono font-bold text-[#F8FAFC]">
            {summary.totalAreaHa} ha
          </div>
        </div>
      </div>

      {/* Card 3: Total Keyframes */}
      <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/20">
          <FilmStrip className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#64748B] uppercase">Keyframes Processed</div>
          <div className="text-base font-mono font-bold text-[#F8FAFC]">
            {summary.totalKeyframes.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Card 4: Products Generated */}
      <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
          <HardDrives className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#64748B] uppercase">Export Artifacts</div>
          <div className="text-base font-mono font-bold text-[#F8FAFC]">
            {summary.totalProductsGenerated}
          </div>
        </div>
      </div>

      {/* Card 5: Success Rate & Quality */}
      <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20">
          <Sparkle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#64748B] uppercase">Avg Quality / SLA</div>
          <div className="text-base font-mono font-bold text-[#F8FAFC]">
            {summary.avgQualityScore}% / {summary.successRatePercent}%
          </div>
        </div>
      </div>
    </div>
  );
};
