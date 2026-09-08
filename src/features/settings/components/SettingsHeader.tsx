import React from 'react';
import {
  GearSix,
  CheckCircle,
  FloppyDisk,
  ArrowClockwise,
  ArrowCounterClockwise
} from '@phosphor-icons/react';

interface SettingsHeaderProps {
  isDirty: boolean;
  onSave: () => void;
  onReset: () => void;
  onRestoreDefaults: () => void;
  lastUpdated: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  isDirty,
  onSave,
  onReset,
  onRestoreDefaults,
  lastUpdated,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1E293B]">
      {/* Title Area */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
          <GearSix className="w-4 h-4 animate-spin-slow" />
          <span>AERIS PLATFORM v2.4.0-PROD — PHASE 10</span>
        </div>
        <h1 className="text-2xl font-bold text-[#F8FAFC] tracking-tight mt-1">
          Settings & System Configuration
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
          Aerospace operator console for managing global reconstruction defaults, 3D visualization shaders, flight telemetry sample rates, export retention, and hardware diagnostics.
        </p>
      </div>

      {/* Right Controls & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Status Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle className="w-3.5 h-3.5" />
            SYSTEM ONLINE
          </span>
          <span className="text-[#64748B] text-[11px]">Updated: {lastUpdated}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-mono font-medium text-[#F8FAFC] border border-[#475569] transition-colors"
              title="Discard pending unsaved edits"
            >
              <ArrowCounterClockwise className="w-3.5 h-3.5 text-[#F59E0B]" />
              Reset
            </button>
          )}

          <button
            onClick={onRestoreDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-mono font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] transition-colors"
            title="Restore factory default configuration"
          >
            <ArrowClockwise className="w-3.5 h-3.5 text-[#38BDF8]" />
            Factory Defaults
          </button>

          <button
            onClick={onSave}
            disabled={!isDirty}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-md ${
              isDirty
                ? 'bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] border border-[#38BDF8] shadow-cyan-500/20'
                : 'bg-[#1E293B] text-[#64748B] border border-[#334155] cursor-not-allowed opacity-60'
            }`}
          >
            <FloppyDisk className="w-4 h-4" />
            {isDirty ? 'SAVE CHANGES' : 'CONFIG SAVED'}
          </button>
        </div>
      </div>
    </div>
  );
};
