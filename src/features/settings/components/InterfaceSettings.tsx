import React from 'react';
import type { InterfaceSettings as InterfaceSettingsType } from '../types';
import { Layout, Desktop, Tag, Eye } from '@phosphor-icons/react';

interface InterfaceSettingsProps {
  settings: InterfaceSettingsType;
  onChange: (updated: Partial<InterfaceSettingsType>) => void;
}

export const InterfaceSettings: React.FC<InterfaceSettingsProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <Layout className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">Interface & Display Density</h2>
          <p className="text-xs text-[#64748B]">UI layout density, navigation sidebar behavior, typography labels, and accessibility options.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Density Mode */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Desktop className="w-4 h-4 text-[#38BDF8]" />
            UI Layout Density
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['COMFORTABLE', 'COMPACT'] as const).map((d) => (
              <button
                key={d}
                onClick={() => onChange({ densityMode: d })}
                className={`py-2 px-3 rounded font-mono text-xs border text-center transition-colors ${
                  settings.densityMode === d
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold'
                    : 'bg-[#07090E] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">COMPACT increases information density for multi-monitor workstation setups.</p>
        </div>

        {/* Sidebar Behavior */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Navigation Sidebar Behavior</label>
          <select
            value={settings.sidebarBehavior}
            onChange={(e) => onChange({ sidebarBehavior: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="COLLAPSIBLE">Collapsible Drawer Mode</option>
            <option value="ALWAYS_EXPANDED">Always Expanded (Fixed Width)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Controls left navigation panel state during workspace interactions.</p>
        </div>
      </div>

      {/* Interface Toggles */}
      <div className="pt-4 border-t border-[#1E293B] grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#38BDF8]" />
              Show Technical Labels & Code Prefixes
            </span>
            <p className="text-[10px] text-[#64748B]">Display monospace prefixes (e.g., [EPSG:4326], [GSD-0.5]).</p>
          </div>
          <button
            onClick={() => onChange({ showTechnicalLabels: !settings.showTechnicalLabels })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.showTechnicalLabels ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.showTechnicalLabels ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#818CF8]" />
              Reduced Motion & Animation Toggle
            </span>
            <p className="text-[10px] text-[#64748B]">Disable UI transitions for fast response.</p>
          </div>
          <button
            onClick={() => onChange({ reducedMotion: !settings.reducedMotion })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.reducedMotion ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.reducedMotion ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs">Enable Workspace Grid Overlay</span>
            <p className="text-[10px] text-[#64748B]">Render subtle technical grid lines across viewport background.</p>
          </div>
          <button
            onClick={() => onChange({ gridVisibility: !settings.gridVisibility })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.gridVisibility ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.gridVisibility ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs">Interactive Tooltips</span>
            <p className="text-[10px] text-[#64748B]">Display hover info popups on telemetry controls.</p>
          </div>
          <button
            onClick={() => onChange({ tooltipsEnabled: !settings.tooltipsEnabled })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.tooltipsEnabled ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.tooltipsEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
