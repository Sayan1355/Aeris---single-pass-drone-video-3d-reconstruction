import React from 'react';
import { MagnifyingGlass, Funnel, X, ArrowClockwise } from '@phosphor-icons/react';
import type { HistoryFilterState, MissionArchiveStatus, MissionTypeOption } from '../types';

interface HistoryFilterBarProps {
  filter: HistoryFilterState;
  onFilterChange: (newFilter: Partial<HistoryFilterState>) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const HistoryFilterBar: React.FC<HistoryFilterBarProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  const isFiltered =
    filter.searchQuery !== '' ||
    filter.statusFilter !== 'ALL' ||
    filter.typeFilter !== 'ALL' ||
    filter.qualityFilter !== 'ALL' ||
    filter.dateFilter !== 'ALL';

  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-4 space-y-4">
      {/* Top row: Search input & Active Filters Badge */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search box */}
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search mission ID, site name, CRS, or location coordinates..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-9 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-sm text-[#F8FAFC] placeholder-[#475569] focus:outline-none focus:border-[#38BDF8] transition-colors"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F8FAFC]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <span className="text-xs font-mono text-[#94A3B8]">
            Showing <span className="text-[#38BDF8] font-bold">{filteredCount}</span> of {totalCount} missions
          </span>
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#475569] rounded-lg text-xs font-medium text-[#F8FAFC] transition-colors"
            >
              <ArrowClockwise className="w-3.5 h-3.5 text-[#38BDF8]" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Bottom row: Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#1E293B]/60 text-xs">
        <div className="flex items-center gap-1.5 text-[#64748B] font-mono mr-1">
          <Funnel className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>FILTERS:</span>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[#64748B]">Status:</span>
          <select
            value={filter.statusFilter}
            onChange={(e) => onFilterChange({ statusFilter: e.target.value as 'ALL' | MissionArchiveStatus })}
            className="bg-[#07090E] border border-[#1E293B] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="PROCESSING">Processing</option>
            <option value="FAILED">Failed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Mission Type Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[#64748B]">Type:</span>
          <select
            value={filter.typeFilter}
            onChange={(e) => onFilterChange({ typeFilter: e.target.value as 'ALL' | MissionTypeOption })}
            className="bg-[#07090E] border border-[#1E293B] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="ALL">All Types</option>
            <option value="Survey">Survey</option>
            <option value="Inspection">Inspection</option>
            <option value="Mapping">Mapping</option>
            <option value="Reconnaissance">Reconnaissance</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[#64748B]">Timeframe:</span>
          <select
            value={filter.dateFilter}
            onChange={(e) => onFilterChange({ dateFilter: e.target.value as HistoryFilterState['dateFilter'] })}
            className="bg-[#07090E] border border-[#1E293B] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="ALL">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        {/* Quality Score Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[#64748B]">Min Quality:</span>
          <select
            value={filter.qualityFilter}
            onChange={(e) => onFilterChange({ qualityFilter: e.target.value as HistoryFilterState['qualityFilter'] })}
            className="bg-[#07090E] border border-[#1E293B] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="ALL">All Scores</option>
            <option value="90+">90% +</option>
            <option value="80+">80% +</option>
            <option value="70+">70% +</option>
          </select>
        </div>
      </div>
    </div>
  );
};
