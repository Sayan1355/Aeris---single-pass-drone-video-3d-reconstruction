import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Spinner,
  XCircle,
  Cube,
  Export,
  ShieldCheck,
  CaretRight,
  Archive,
  FilmStrip
} from '@phosphor-icons/react';
import type { MissionArchiveRecord } from '../types';

interface MissionTableRowProps {
  mission: MissionArchiveRecord;
  isSelected: boolean;
  onSelect: (mission: MissionArchiveRecord) => void;
}

export const MissionTableRow: React.FC<MissionTableRowProps> = ({
  mission,
  isSelected,
  onSelect,
}) => {
  const navigate = useNavigate();

  // Status Badge Rendering
  const renderStatusBadge = () => {
    switch (mission.status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-xs font-mono font-medium border border-[#10B981]/30">
            <CheckCircle className="w-3.5 h-3.5" />
            COMPLETED
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-mono font-medium border border-[#38BDF8]/30">
            <Spinner className="w-3.5 h-3.5 animate-spin" />
            PROCESSING
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EF4444]/10 text-[#EF4444] text-xs font-mono font-medium border border-[#EF4444]/30">
            <XCircle className="w-3.5 h-3.5" />
            FAILED
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#64748B]/10 text-[#94A3B8] text-xs font-mono font-medium border border-[#64748B]/30">
            <Archive className="w-3.5 h-3.5" />
            ARCHIVED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <tr
      onClick={() => onSelect(mission)}
      className={`border-b border-[#1E293B] cursor-pointer transition-colors hover:bg-[#0F172A]/70 ${
        isSelected ? 'bg-[#1E293B]/60 border-l-4 border-l-[#38BDF8]' : 'even:bg-[#090D16]/40'
      }`}
    >
      {/* Mission Code & Date */}
      <td className="py-3.5 px-4 font-mono text-xs">
        <div className="font-bold text-[#38BDF8]">{mission.id}</div>
        <div className="text-[#64748B] text-[11px] mt-0.5">{mission.date}</div>
      </td>

      {/* Mission Title & Location */}
      <td className="py-3.5 px-4">
        <div className="text-xs font-semibold text-[#F8FAFC] line-clamp-1">{mission.siteName}</div>
        <div className="text-[11px] font-mono text-[#64748B] flex items-center gap-2 mt-0.5">
          <span>{mission.locationCoordinates}</span>
        </div>
      </td>

      {/* Mission Type */}
      <td className="py-3.5 px-4 font-mono text-xs text-[#94A3B8]">
        <span className="px-2 py-0.5 rounded bg-[#1E293B] text-[11px] text-[#CBD5E1]">
          {mission.missionType}
        </span>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4">{renderStatusBadge()}</td>

      {/* Quality Score & QA */}
      <td className="py-3.5 px-4 font-mono text-xs">
        <div>
          <div className="font-bold text-[#10B981]">{mission.qualityScore}%</div>
          <div className="text-[10px] text-[#64748B]">QA: {mission.qaStatus}</div>
        </div>
      </td>

      {/* Area & Distance */}
      <td className="py-3.5 px-4 font-mono text-xs text-[#94A3B8]">
        <div>{mission.areaHa} ha</div>
        <div className="text-[10px] text-[#64748B]">{mission.flightDistanceKm} km</div>
      </td>

      {/* Video / Keyframes */}
      <td className="py-3.5 px-4 font-mono text-xs text-[#64748B]">
        <div className="flex items-center gap-1 text-[#CBD5E1]">
          <FilmStrip className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{mission.keyframesCount} frames</span>
        </div>
        <div className="text-[10px] text-[#64748B]">{mission.videoResolution}</div>
      </td>

      {/* Quick Action Navigation Triggers */}
      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1.5">
          {mission.status === 'COMPLETED' && (
            <>
              <button
                onClick={() => navigate('/digital-twin')}
                title="Open in 3D Digital Twin"
                className="p-1.5 rounded bg-[#1E293B] hover:bg-[#38BDF8]/20 text-[#38BDF8] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-colors"
              >
                <Cube className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/products')}
                title="View Export Center Products"
                className="p-1.5 rounded bg-[#1E293B] hover:bg-[#818CF8]/20 text-[#818CF8] border border-[#1E293B] hover:border-[#818CF8]/40 transition-colors"
              >
                <Export className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/qa')}
                title="View Quality & Validation"
                className="p-1.5 rounded bg-[#1E293B] hover:bg-[#10B981]/20 text-[#10B981] border border-[#1E293B] hover:border-[#10B981]/40 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => onSelect(mission)}
            title="Inspect Details"
            className="p-1.5 rounded bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-[#334155] transition-colors ml-1"
          >
            <CaretRight className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
