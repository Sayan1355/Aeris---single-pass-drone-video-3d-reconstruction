import React from 'react';

export const MissionAnalyticsSection: React.FC = () => {
  return (
    <div className="mx-6 my-6 grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
      {/* 1. Missions by Status */}
      <div className="p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col justify-between">
        <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-2 uppercase">
          MISSIONS BY STATUS
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="text-[#34D399] font-bold">COMPLETED</span>
            <span className="text-[#F8FAFC]">17 (70.8%)</span>
          </div>
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
            <div className="h-full bg-[#34D399] w-[70.8%]" />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-[#38BDF8] font-bold">PROCESSING</span>
            <span className="text-[#F8FAFC]">3 (12.5%)</span>
          </div>
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
            <div className="h-full bg-[#38BDF8] w-[12.5%]" />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-[#EF4444] font-bold">FAILED</span>
            <span className="text-[#F8FAFC]">2 (8.3%)</span>
          </div>
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
            <div className="h-full bg-[#EF4444] w-[8.3%]" />
          </div>
        </div>
      </div>

      {/* 2. Survey Area Ingested */}
      <div className="p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col justify-between">
        <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-1 uppercase">
          SURVEY AREA (AUG/SEP 2026)
        </span>
        <div className="mt-1">
          <span className="text-2xl font-bold text-[#F8FAFC] font-sans">1,284.4</span>
          <span className="text-xs text-[#38BDF8] ml-1 font-bold">ha</span>
        </div>
        <p className="text-[10px] text-[#94A3B8] mt-2">
          +24.2% increase in monthly high-density 3D reconstruction coverage.
        </p>
      </div>

      {/* 3. Average Processing Speed */}
      <div className="p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col justify-between">
        <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-1 uppercase">
          AVG PROCESSING TIME
        </span>
        <div className="mt-1">
          <span className="text-2xl font-bold text-[#38BDF8] font-sans">21.4</span>
          <span className="text-xs text-[#94A3B8] ml-1 font-bold">min / flight</span>
        </div>
        <p className="text-[10px] text-[#10B981] mt-2">
          Single-pass GPU pipeline optimized (Stage 5 3DGS 3.4x faster).
        </p>
      </div>

      {/* 4. Average Quality Score */}
      <div className="p-4 rounded-xl bg-[#0C1018] border border-[#1E293B] flex flex-col justify-between">
        <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-1 uppercase">
          AVG QUALITY SCORE
        </span>
        <div className="mt-1">
          <span className="text-2xl font-bold text-[#34D399] font-sans">93.2</span>
          <span className="text-xs text-[#64748B] ml-1 font-bold">/ 100</span>
        </div>
        <p className="text-[10px] text-[#94A3B8] mt-2">
          98.4% point cloud reprojection accuracy within millimeter bounds.
        </p>
      </div>
    </div>
  );
};
