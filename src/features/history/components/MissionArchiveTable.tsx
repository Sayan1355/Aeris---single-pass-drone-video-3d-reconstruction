import React from 'react';
import type { MissionArchiveRecord } from '../types';
import { MissionTableRow } from './MissionTableRow';
import { EmptyHistoryState } from './EmptyHistoryState';
import { Database } from '@phosphor-icons/react';

interface MissionArchiveTableProps {
  missions: MissionArchiveRecord[];
  selectedMissionId: string | null;
  onSelectMission: (mission: MissionArchiveRecord) => void;
  onResetFilters: () => void;
}

export const MissionArchiveTable: React.FC<MissionArchiveTableProps> = ({
  missions,
  selectedMissionId,
  onSelectMission,
  onResetFilters,
}) => {
  if (missions.length === 0) {
    return <EmptyHistoryState onReset={onResetFilters} />;
  }

  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl overflow-hidden shadow-lg">
      {/* Table Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#07090E] border-b border-[#1E293B]">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Database className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-bold text-[#F8FAFC]">HISTORICAL MISSION REGISTRY</span>
          <span className="text-[#64748B]">({missions.length} records)</span>
        </div>
        <div className="text-[11px] font-mono text-[#64748B]">
          Click any row to open inspector details
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#090D16] border-b border-[#1E293B] text-[11px] font-mono uppercase text-[#64748B]">
              <th className="py-3 px-4 font-medium">Mission Code</th>
              <th className="py-3 px-4 font-medium">Site Name / Location</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Quality & QA</th>
              <th className="py-3 px-4 font-medium">Area & Distance</th>
              <th className="py-3 px-4 font-medium">Video Data</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <MissionTableRow
                key={mission.id}
                mission={mission}
                isSelected={selectedMissionId === mission.id}
                onSelect={onSelectMission}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
