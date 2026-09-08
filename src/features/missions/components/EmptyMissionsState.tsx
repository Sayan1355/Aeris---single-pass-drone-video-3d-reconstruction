import React from 'react';
import { Funnel, X } from '@phosphor-icons/react';

interface EmptyMissionsStateProps {
  onClearFilters: () => void;
}

export const EmptyMissionsState: React.FC<EmptyMissionsStateProps> = ({ onClearFilters }) => {
  return (
    <div className="w-full p-12 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col items-center justify-center text-center font-mono text-xs my-4">
      <div className="p-3 rounded-full bg-[#1E293B] text-[#64748B] mb-3">
        <Funnel size={28} />
      </div>
      <h3 className="text-sm font-bold text-[#F8FAFC]">
        NO MISSIONS MATCH THE CURRENT FILTERS
      </h3>
      <p className="text-xs text-[#94A3B8] max-w-sm mt-1 mb-4 font-sans">
        Try adjusting your search query, status criteria, or UAV platform filter.
      </p>
      <button
        onClick={onClearFilters}
        className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded-lg font-bold transition-all"
      >
        <X size={14} />
        <span>Clear Filters</span>
      </button>
    </div>
  );
};
