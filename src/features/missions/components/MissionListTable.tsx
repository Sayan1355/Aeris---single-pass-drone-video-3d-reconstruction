import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MissionRecord, MissionStatus } from '../types';
import {
  Pulse,
  CircleNotch,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  Cpu,
  Cube,
} from '@phosphor-icons/react';

interface MissionListTableProps {
  missions: MissionRecord[];
  selectedMissionId: string | null;
  onSelectMission: (mission: MissionRecord) => void;
}

export const renderStatusBadge = (status: MissionStatus) => {
  switch (status) {
    case 'ACTIVE':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
          <Pulse size={12} className="animate-ping" />
          ACTIVE
        </span>
      );
    case 'PROCESSING':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
          <CircleNotch size={12} className="animate-spin text-[#38BDF8]" />
          PROCESSING
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
          <CheckCircle size={12} />
          COMPLETED
        </span>
      );
    case 'FAILED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
          <XCircle size={12} />
          FAILED
        </span>
      );
    case 'QUEUED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30">
          <Clock size={12} />
          QUEUED
        </span>
      );
    case 'DRAFT':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#64748B]/15 text-[#94A3B8] border border-[#64748B]/30">
          <FileText size={12} />
          DRAFT
        </span>
      );
  }
};

export const MissionListTable: React.FC<MissionListTableProps> = ({
  missions,
  selectedMissionId,
  onSelectMission,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0C1018] font-mono text-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#1E293B] bg-[#07090E]/80 text-[#64748B] text-[11px] uppercase tracking-wider font-bold">
            <th className="py-3 px-4">MISSION ID</th>
            <th className="py-3 px-4">STATUS</th>
            <th className="py-3 px-4">LOCATION</th>
            <th className="py-3 px-4">PLATFORM</th>
            <th className="py-3 px-4">CAPTURE DATE</th>
            <th className="py-3 px-4 text-right">AREA</th>
            <th className="py-3 px-4 text-right">GSD</th>
            <th className="py-3 px-4">PROGRESS</th>
            <th className="py-3 px-4 text-right">QUALITY</th>
            <th className="py-3 px-4 text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]/60 text-[#CBD5E1]">
          {missions.map((mission) => {
            const isSelected = selectedMissionId === mission.id;

            return (
              <tr
                key={mission.id}
                onClick={() => onSelectMission(mission)}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#38BDF8]/10 text-[#F8FAFC]'
                    : 'hover:bg-[#1E293B]/40'
                }`}
              >
                {/* Mission ID */}
                <td className="py-3.5 px-4 font-bold text-[#38BDF8] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span>{mission.id}</span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">{renderStatusBadge(mission.status)}</td>

                {/* Location */}
                <td className="py-3.5 px-4 font-sans font-medium text-[#F8FAFC]">
                  {mission.location}
                </td>

                {/* Platform */}
                <td className="py-3.5 px-4 text-[#94A3B8]">{mission.platform}</td>

                {/* Capture Date */}
                <td className="py-3.5 px-4 text-[#94A3B8]">{mission.captureDate}</td>

                {/* Area */}
                <td className="py-3.5 px-4 text-right font-bold text-[#F8FAFC]">
                  {mission.areaHa} ha
                </td>

                {/* GSD */}
                <td className="py-3.5 px-4 text-right text-[#38BDF8]">
                  {mission.gsdCmPx} cm/px
                </td>

                {/* Progress Bar */}
                <td className="py-3.5 px-4 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          mission.status === 'COMPLETED'
                            ? 'bg-[#34D399]'
                            : mission.status === 'FAILED'
                            ? 'bg-[#EF4444]'
                            : 'bg-[#38BDF8]'
                        }`}
                        style={{ width: `${mission.progressPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#94A3B8]">
                      {mission.progressPct}%
                    </span>
                  </div>
                </td>

                {/* Quality */}
                <td className="py-3.5 px-4 text-right font-bold">
                  {mission.qualityScore !== null ? (
                    <span className="text-[#34D399]">{mission.qualityScore}</span>
                  ) : (
                    <span className="text-[#64748B]">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4">
                  <div
                    className="flex items-center justify-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onSelectMission(mission)}
                      title="Inspect Mission Details"
                      className="p-1.5 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] transition-all"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      onClick={() => navigate('/pipeline')}
                      title="Open Reconstruction Pipeline"
                      className="p-1.5 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] transition-all"
                    >
                      <Cpu size={15} />
                    </button>

                    <button
                      onClick={() => navigate('/digital-twin')}
                      title="Open 3D Digital Twin Viewer"
                      className="p-1.5 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] transition-all"
                    >
                      <Cube size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
