import React from 'react';
import type { MissionStatus } from '../types';
import { MagnifyingGlass, Funnel, X } from '@phosphor-icons/react';

interface MissionFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: MissionStatus | 'ALL';
  onStatusChange: (status: MissionStatus | 'ALL') => void;
  platformFilter: string;
  onPlatformChange: (platform: string) => void;
  onClearFilters: () => void;
}

const STATUS_OPTIONS: { label: string; value: MissionStatus | 'ALL' }[] = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed', value: 'FAILED' },
  { label: 'Queued', value: 'QUEUED' },
  { label: 'Draft', value: 'DRAFT' },
];

const PLATFORM_OPTIONS = [
  { label: 'All Platforms', value: 'ALL' },
  { label: 'UAV-DJI-M30T-07', value: 'UAV-DJI-M30T-07' },
  { label: 'UAV-DJI-M350-01', value: 'UAV-DJI-M350-01' },
  { label: 'UAV-DJI-M350-02', value: 'UAV-DJI-M350-02' },
  { label: 'UAV-DJI-M30T-03', value: 'UAV-DJI-M30T-03' },
  { label: 'UAV-AUTEL-EVO2', value: 'UAV-AUTEL-EVO2' },
  { label: 'UAV-WINGTRA-ONE', value: 'UAV-WINGTRA-ONE' },
];

export const MissionFilterBar: React.FC<MissionFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  platformFilter,
  onPlatformChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'ALL' || platformFilter !== 'ALL';

  return (
    <div className="mx-6 mb-4 p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[260px]">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by mission ID, location, or platform..."
          className="w-full pl-9 pr-4 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder-[#64748B] text-xs font-mono focus:outline-none focus:border-[#38BDF8] transition-all"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter Pills / Dropdown */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Funnel size={14} className="text-[#38BDF8] shrink-0 mr-1" />
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all shrink-0 ${
                statusFilter === opt.value
                  ? 'bg-[#38BDF8] text-[#07090E] shadow-sm'
                  : 'bg-[#1E293B]/60 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Platform Dropdown Filter */}
        <select
          value={platformFilter}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="px-3 py-1.5 bg-[#07090E] border border-[#1E293B] text-[#CBD5E1] rounded-lg text-xs font-mono focus:outline-none focus:border-[#38BDF8]"
        >
          {PLATFORM_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-lg text-xs font-mono font-bold hover:bg-[#EF4444]/20 transition-all"
          >
            <X size={13} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};
