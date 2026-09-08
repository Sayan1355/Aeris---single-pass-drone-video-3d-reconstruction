import React from 'react';
import type { SystemHealthItem } from '../types';
import { Heartbeat, CheckCircle, Warning, Cpu, Lightning } from '@phosphor-icons/react';

interface SystemHealthPanelProps {
  healthItems: SystemHealthItem[];
}

export const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({ healthItems }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <Heartbeat className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="text-base font-bold text-[#F8FAFC]">System Health & Diagnostics</h2>
            <p className="text-xs text-[#64748B]">Real-time status breakdown of frontend rendering engines, WASM decoders, and cache vault.</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-mono font-bold border border-[#10B981]/30">
          <Lightning className="w-3.5 h-3.5" />
          ALL SUBSYSTEMS NOMINAL
        </span>
      </div>

      {/* Grid of Subsystem Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {healthItems.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-[#07090E] border border-[#1E293B] space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#38BDF8]" />
                  {item.name}
                </div>
                <div className="text-[11px] font-mono text-[#64748B] mt-0.5">{item.subsystem}</div>
              </div>

              <div className="flex items-center gap-2">
                {item.latencyMs !== undefined && (
                  <span className="text-[10px] font-mono text-[#64748B]">{item.latencyMs}ms</span>
                )}
                {item.status === 'ONLINE' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] text-[10px] font-mono font-bold border border-[#10B981]/30">
                    <CheckCircle className="w-3 h-3" />
                    ONLINE
                  </span>
                )}
                {item.status === 'READY' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] text-[10px] font-mono font-bold border border-[#38BDF8]/30">
                    <CheckCircle className="w-3 h-3" />
                    READY
                  </span>
                )}
                {item.status === 'DEGRADED' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-mono font-bold border border-[#F59E0B]/30">
                    <Warning className="w-3 h-3" />
                    DEGRADED
                  </span>
                )}
              </div>
            </div>

            <p className="text-[11px] text-[#94A3B8] pt-1 border-t border-[#1E293B]/60 leading-relaxed font-mono">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
