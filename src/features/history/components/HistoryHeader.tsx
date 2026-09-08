import React from 'react';
import { ClockCounterClockwise, CheckCircle, Spinner, XCircle, HardDrives } from '@phosphor-icons/react';
import type { MissionHistorySummary } from '../types';

interface HistoryHeaderProps {
  summary: MissionHistorySummary;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({ summary }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
          <ClockCounterClockwise className="w-4 h-4" />
          <span>PHASE 9 — MISSION HISTORY & ARCHIVE</span>
        </div>
        <h1 className="text-2xl font-bold text-[#F8FAFC] tracking-tight mt-1">
          Historical Mission Registry
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
          Searchable archive of all past single-pass UAV reconstruction flights, keyframe spatial metadata, multi-temporal benchmarks, and generated digital twin artifacts.
        </p>
      </div>

      {/* Quick Summary Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C1018] border border-[#1E293B]">
          <span className="text-[#94A3B8]">Total:</span>
          <span className="font-bold text-[#F8FAFC]">{summary.totalMissions}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{summary.completedCount} Completed</span>
        </div>

        {summary.processingCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]">
            <Spinner className="w-3.5 h-3.5 animate-spin" />
            <span>{summary.processingCount} Processing</span>
          </div>
        )}

        {summary.failedCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444]">
            <XCircle className="w-3.5 h-3.5" />
            <span>{summary.failedCount} Failed</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#818CF8]/10 border border-[#818CF8]/30 text-[#818CF8]">
          <HardDrives className="w-3.5 h-3.5" />
          <span>{summary.totalProductsGenerated} Artifacts</span>
        </div>
      </div>
    </div>
  );
};
