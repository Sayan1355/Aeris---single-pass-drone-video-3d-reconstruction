import React from 'react';
import { ArrowClockwise, FunnelX } from '@phosphor-icons/react';

interface EmptyHistoryStateProps {
  onReset: () => void;
}

export const EmptyHistoryState: React.FC<EmptyHistoryStateProps> = ({ onReset }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center mx-auto text-[#38BDF8]">
        <FunnelX className="w-8 h-8" />
      </div>

      <div className="max-w-md mx-auto space-y-1">
        <h3 className="text-lg font-bold text-[#F8FAFC]">No Missions Found</h3>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          No historical UAV reconstruction missions match your current filter criteria or search query. Try broadening your keywords or clearing active filters.
        </p>
      </div>

      <div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 rounded-lg text-xs font-mono font-semibold text-[#38BDF8] transition-colors"
        >
          <ArrowClockwise className="w-4 h-4" />
          RESET ALL FILTERS
        </button>
      </div>
    </div>
  );
};
