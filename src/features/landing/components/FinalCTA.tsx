import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Crosshair } from '@phosphor-icons/react';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#07090E] via-[#0F172A] to-[#07090E] border-b border-[#1E293B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <Crosshair className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-tight uppercase leading-tight">
          TURN A FLIGHT INTO A <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#10B981]">
            MEASURABLE DIGITAL TWIN.
          </span>
        </h2>

        <p className="text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Enter the AERIS operator environment to upload video passes, run 3D Gaussian Splatting & SfM pipelines, measure point clouds, and export georeferenced spatial intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/hub')}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded-xl font-mono font-bold text-xs tracking-wider transition-all shadow-xl shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <span>ENTER AERIS CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/pipeline')}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-[#0C1018] hover:bg-[#1E293B] border border-[#38BDF8]/40 text-[#38BDF8] rounded-xl font-mono font-bold text-xs tracking-wider transition-all hover:border-[#38BDF8]"
          >
            <span>VIEW RECONSTRUCTION PIPELINE</span>
          </button>
        </div>
      </div>
    </section>
  );
};
