import React from 'react';
import { Sparkle } from '@phosphor-icons/react';

export const PipelineStory: React.FC = () => {
  const stages = [
    { num: '01', title: 'Video Ingestion', desc: 'Raw 4K drone video & telemetry sync' },
    { num: '02', title: 'Frame Curation', desc: 'Optical flow keyframe selection' },
    { num: '03', title: 'Pose Estimation', desc: 'Structure from Motion (SfM) solver' },
    { num: '04', title: 'Dynamic Masking', desc: 'AI filter for moving vehicles/pedestrians' },
    { num: '05', title: 'Metric Depth', desc: 'Multi-view stereo (MVS) depth fusion' },
    { num: '06', title: '3DGS & Dense Recon', desc: '3D Gaussian Splatting & point cloud' },
    { num: '07', title: 'Surface Meshing', desc: 'Delaunay triangulation & UV texturing' },
    { num: '08', title: 'Georeferencing', desc: 'RTK GPS & Ground Control Point alignment' },
    { num: '09', title: 'Product Generation', desc: '3D Tiles, GeoTIFF, DSM & QA report' },
  ];

  return (
    <section className="py-20 px-6 bg-[#07090E] border-b border-[#1E293B] space-y-20">
      {/* Section A: The Statement */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkle className="w-3.5 h-3.5" />
          SINGLE-PASS RECONSTRUCTION KERNEL
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-tight uppercase max-w-4xl mx-auto leading-tight">
          ONE FLIGHT. <br />
          ONE VIDEO. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#10B981]">
            A COMPLETE 3D ENVIRONMENT.
          </span>
        </h2>
        <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto font-sans leading-relaxed">
          No multi-angle grid passes or ground station cloud uploads required. AERIS extracts dense spatial geometry and photogrammetric surface models directly from a single UAV video file.
        </p>
      </div>

      {/* Section B: 9-Stage Pipeline Story Flow */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <div>
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">COMPUTATIONAL PIPELINE</span>
            <h3 className="text-xl font-bold text-[#F8FAFC] mt-1">End-to-End Processing Architecture</h3>
          </div>
          <span className="text-xs font-mono text-[#64748B]">9 AUTOMATED STAGES</span>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stg) => (
            <div
              key={stg.num}
              className="p-5 rounded-xl bg-[#0C1018] border border-[#1E293B] hover:border-[#38BDF8]/50 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">{stg.num}</span>
                <span className="w-2 h-2 rounded-full bg-[#10B981]/80 group-hover:scale-125 transition-transform" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                {stg.title}
              </h4>
              <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">{stg.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
