import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Cube,
  Export,
  ShieldCheck,
  CheckCircle,
  Clock,
  Spinner,
  FileCode,
  HardDrives,
  Camera,
  Ruler,
  Cpu,
  Globe
} from '@phosphor-icons/react';
import type { MissionArchiveRecord, MissionTimelineStep } from '../types';
import { MiniGeographicMap } from './MiniGeographicMap';

interface MissionDetailInspectorProps {
  mission: MissionArchiveRecord;
  onClose: () => void;
}

export const MissionDetailInspector: React.FC<MissionDetailInspectorProps> = ({
  mission,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#07090E] border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-[#38BDF8]">{mission.id}</span>
          <span className="text-xs font-mono text-[#64748B]">|</span>
          <h3 className="text-sm font-bold text-[#F8FAFC] truncate max-w-xs">{mission.siteName}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-[#64748B] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="p-5 space-y-6 overflow-y-auto flex-1 text-xs">
        {/* Quick Action Navigation Bar */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigate('/digital-twin')}
            disabled={mission.status !== 'COMPLETED'}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] disabled:opacity-40 border border-[#38BDF8]/30 rounded-lg font-mono font-medium transition-colors"
          >
            <Cube className="w-4 h-4" />
            3D Twin
          </button>

          <button
            onClick={() => navigate('/products')}
            disabled={mission.status !== 'COMPLETED'}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#818CF8]/10 hover:bg-[#818CF8]/20 text-[#818CF8] disabled:opacity-40 border border-[#818CF8]/30 rounded-lg font-mono font-medium transition-colors"
          >
            <Export className="w-4 h-4" />
            Products
          </button>

          <button
            onClick={() => navigate('/qa')}
            disabled={mission.status !== 'COMPLETED'}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] disabled:opacity-40 border border-[#10B981]/30 rounded-lg font-mono font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            QA Report
          </button>
        </div>

        {/* Survey Geometry Mini Map */}
        <MiniGeographicMap mission={mission} />

        {/* Mission Processing Timeline */}
        <div className="bg-[#07090E] border border-[#1E293B] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F8FAFC]">
            <span>RECONSTRUCTION PIPELINE TIMELINE</span>
            <span className="text-[#38BDF8]">
              {mission.timeline.filter((s: MissionTimelineStep) => s.status === 'completed').length} / {mission.timeline.length} STAGES
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {mission.timeline.map((step: MissionTimelineStep, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#0C1018] border border-[#1E293B]/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-[#64748B] w-4">0{idx + 1}</span>
                  {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-[#10B981]" />}
                  {step.status === 'active' && <Spinner className="w-4 h-4 text-[#38BDF8] animate-spin" />}
                  {step.status === 'pending' && <Clock className="w-4 h-4 text-[#64748B]" />}
                  <span className={`font-mono text-xs ${step.status === 'completed' ? 'text-[#F8FAFC]' : step.status === 'active' ? 'text-[#38BDF8] font-bold' : 'text-[#64748B]'}`}>
                    {step.stageName}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-[#64748B]">{step.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    step.status === 'completed' ? 'bg-[#10B981]/10 text-[#10B981]' :
                    step.status === 'active' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'bg-[#1E293B] text-[#64748B]'
                  }`}>
                    {step.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications Grid */}
        <div className="bg-[#07090E] border border-[#1E293B] rounded-lg p-4 space-y-3">
          <div className="text-xs font-mono font-bold text-[#F8FAFC]">TECHNICAL DATA SPECIFICATIONS</div>
          <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <Ruler className="w-4 h-4 text-[#38BDF8]" />
              <div>
                <div className="text-[#64748B]">Survey Area</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.areaHa} ha</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <Cpu className="w-4 h-4 text-[#818CF8]" />
              <div>
                <div className="text-[#64748B]">Keyframes</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.keyframesCount} frames</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <FileCode className="w-4 h-4 text-[#F59E0B]" />
              <div>
                <div className="text-[#64748B]">Products</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.productCount} files</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <HardDrives className="w-4 h-4 text-[#10B981]" />
              <div>
                <div className="text-[#64748B]">Flight Dist</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.flightDistanceKm} km</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <Camera className="w-4 h-4 text-[#EC4899]" />
              <div>
                <div className="text-[#64748B]">Resolution</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.videoResolution}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#0C1018] rounded border border-[#1E293B]">
              <Globe className="w-4 h-4 text-[#38BDF8]" />
              <div>
                <div className="text-[#64748B]">CRS Reference</div>
                <div className="text-[#F8FAFC] font-semibold">{mission.crs}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
