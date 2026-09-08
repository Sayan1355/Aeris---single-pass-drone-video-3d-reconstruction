import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MissionRecord } from '../types';
import { renderStatusBadge } from './MissionListTable';
import { MiniGeospatialMap } from './MiniGeospatialMap';
import {
  X,
  Cpu,
  Cube,
  Package,
  CheckSquare,
  Crosshair,
  Camera,
  Compass,
  Gauge,
  Calendar,
} from '@phosphor-icons/react';

interface MissionInspectorProps {
  mission: MissionRecord | null;
  onClose: () => void;
}

export const MissionInspector: React.FC<MissionInspectorProps> = ({
  mission,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!mission) return null;

  return (
    <div className="w-full lg:w-[420px] shrink-0 bg-[#0C1018] border-t lg:border-t-0 lg:border-l border-[#1E293B] flex flex-col h-full font-mono text-xs overflow-y-auto">
      {/* Inspector Header */}
      <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#07090E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#F8FAFC]">{mission.id}</span>
            {renderStatusBadge(mission.status)}
          </div>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">{mission.name}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#1E293B] text-[#64748B] hover:text-[#F8FAFC] transition-all"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Mini Geospatial Map Preview */}
        <div>
          <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-2 uppercase">
            GEOSPATIAL CENTROID PREVIEW
          </span>
          <MiniGeospatialMap
            location={mission.location}
            coordinates={mission.coordinates}
            areaHa={mission.areaHa}
          />
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => navigate('/pipeline')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-[#38BDF8] rounded-lg font-bold text-[11px] transition-all"
          >
            <Cpu size={14} />
            <span>RECONSTRUCTION</span>
          </button>

          <button
            onClick={() => navigate('/digital-twin')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#38BDF8]/30 text-[#F8FAFC] rounded-lg font-bold text-[11px] transition-all"
          >
            <Cube size={14} className="text-[#38BDF8]" />
            <span>DIGITAL TWIN</span>
          </button>

          <button
            onClick={() => navigate('/products')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-[#CBD5E1] rounded-lg font-bold text-[11px] transition-all"
          >
            <Package size={14} />
            <span>PRODUCTS</span>
          </button>

          <button
            onClick={() => navigate('/qa')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-[#CBD5E1] rounded-lg font-bold text-[11px] transition-all"
          >
            <CheckSquare size={14} />
            <span>ACCURACY &amp; QA</span>
          </button>
        </div>

        {/* Parameter Details Table */}
        <div className="space-y-3 pt-2 border-t border-[#1E293B]">
          <span className="text-[11px] text-[#64748B] font-bold tracking-wider block uppercase">
            MISSION PARAMETERS &amp; METADATA
          </span>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <Crosshair size={13} className="text-[#38BDF8]" />
                COORDINATES
              </span>
              <span className="text-[#F8FAFC] font-semibold">{mission.coordinates}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <Camera size={13} className="text-[#38BDF8]" />
                PLATFORM
              </span>
              <span className="text-[#F8FAFC] font-semibold">{mission.platform}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B]">CAMERA SENSOR</span>
              <span className="text-[#38BDF8] font-semibold">{mission.cameraModel}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <Gauge size={13} className="text-[#10B981]" />
                ALTITUDE AGL
              </span>
              <span className="text-[#F8FAFC] font-semibold">{mission.altitudeM} M</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B]">ESTIMATED GSD</span>
              <span className="text-[#38BDF8] font-semibold">{mission.gsdCmPx} cm/px</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B]">SURVEY COVERAGE</span>
              <span className="text-[#F8FAFC] font-semibold">{mission.areaHa} ha</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B]">CURATED FRAMES</span>
              <span className="text-[#F8FAFC] font-semibold">
                {mission.frameCount} / {mission.totalFrames}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B]">FLIGHT DURATION</span>
              <span className="text-[#F8FAFC] font-semibold">{mission.flightDurationMin} min</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <Compass size={13} className="text-[#10B981]" />
                GNSS &amp; RTK MODE
              </span>
              <span className="text-[#10B981] font-semibold">
                {mission.gnssMode} ({mission.rtkStatus})
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <Calendar size={13} />
                CREATED
              </span>
              <span className="text-[#94A3B8]">{mission.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
