import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, User, ArrowRight } from '@phosphor-icons/react';

export const LandingNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090E]/80 backdrop-blur-md border-b border-[#1E293B]/80 px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logotype & Spec Tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#38BDF8] flex items-center justify-center text-[#07090E] font-bold shadow-md shadow-cyan-500/20">
            <Crosshair className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#F8FAFC] tracking-widest">AERIS</span>
              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-1.5 py-0.2 rounded">
                SPEC-08
              </span>
            </div>
            <div className="text-[9px] font-mono text-[#64748B] tracking-widest uppercase">
              UAV RECONSTRUCTION
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#94A3B8]">
          <button onClick={() => navigate('/hub')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Missions
          </button>
          <button onClick={() => navigate('/pipeline')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Reconstruction
          </button>
          <button onClick={() => navigate('/digital-twin')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Digital Twin
          </button>
          <button onClick={() => navigate('/geospatial')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Geospatial
          </button>
          <button onClick={() => navigate('/products')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Products
          </button>
          <button onClick={() => navigate('/qa')} className="hover:text-[#38BDF8] transition-colors uppercase tracking-wider">
            Accuracy
          </button>
        </nav>

        {/* Right: Status & Enter Workspace CTA */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[11px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            SYSTEMS NOMINAL
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/hub')}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/50 text-[#38BDF8] rounded-lg text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-950/40 hover:border-[#38BDF8]"
          >
            <span>ENTER WORKSPACE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* User Profile Avatar */}
          <div className="w-7 h-7 rounded bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#94A3B8] text-xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
