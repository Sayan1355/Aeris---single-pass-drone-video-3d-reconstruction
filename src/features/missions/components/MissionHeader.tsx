import React from 'react';
import { Plus, UploadSimple, PaperPlaneTilt } from '@phosphor-icons/react';

interface MissionHeaderProps {
  onNewMission: () => void;
  onImportMission?: () => void;
}

export const MissionHeader: React.FC<MissionHeaderProps> = ({
  onNewMission,
  onImportMission,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0C1018] border-b border-[#1E293B]">
      {/* Title & Description */}
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] shrink-0 mt-0.5">
          <PaperPlaneTilt size={22} weight="bold" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#F8FAFC] tracking-tight font-sans">
              MISSIONS
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/30 font-semibold">
              SPEC-08 // RECON_OPS
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] font-sans mt-1">
            Configure, launch, monitor and review UAV reconstruction missions and data ingestion workflows.
          </p>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onImportMission}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-[#CBD5E1] rounded-lg text-xs font-mono font-semibold transition-all hover:text-[#F8FAFC]"
        >
          <UploadSimple size={15} />
          <span>IMPORT MISSION</span>
        </button>

        <button
          onClick={onNewMission}
          className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded-lg text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
        >
          <Plus size={16} weight="bold" />
          <span>NEW MISSION</span>
        </button>
      </div>
    </div>
  );
};
