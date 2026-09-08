import React from 'react';
import { CaretRight, CheckCircle, CircleNotch } from '@phosphor-icons/react';

interface MissionIngestionPipelineStripProps {
  currentStageIndex?: number;
}

export const PIPELINE_STAGES = [
  'VIDEO INGESTION',
  'FRAME CURATION',
  'POSE ESTIMATION',
  'DYNAMIC MASKING',
  'METRIC DEPTH',
  '3DGS & RECON',
  'SURFACE MESHING',
  'GEOREFERENCING',
  'PRODUCTS',
];

export const MissionIngestionPipelineStrip: React.FC<MissionIngestionPipelineStripProps> = ({
  currentStageIndex = 5,
}) => {
  return (
    <div className="mx-6 mb-4 p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] font-mono text-xs">
      <div className="flex items-center justify-between mb-3 text-[11px] text-[#64748B]">
        <span className="font-bold tracking-wider uppercase text-[#38BDF8]">
          DATA INGESTION &amp; RECONSTRUCTION PIPELINE WORKFLOW
        </span>
        <span>AERIS SINGLE-PASS CORE v4.2</span>
      </div>

      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isActive = idx === currentStageIndex;

          return (
            <React.Fragment key={stage}>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8] shadow-md shadow-cyan-500/10'
                    : isCompleted
                    ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                    : 'bg-[#1E293B]/50 border-[#1E293B] text-[#64748B]'
                }`}
              >
                {isActive ? (
                  <CircleNotch size={12} className="animate-spin text-[#38BDF8]" />
                ) : isCompleted ? (
                  <CheckCircle size={12} className="text-[#10B981]" />
                ) : (
                  <span className="text-[10px] text-[#64748B] font-bold">0{idx + 1}</span>
                )}
                <span>{stage}</span>
              </div>

              {idx < PIPELINE_STAGES.length - 1 && (
                <CaretRight
                  size={12}
                  className={`shrink-0 ${
                    idx < currentStageIndex ? 'text-[#10B981]' : 'text-[#334155]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
