import React from 'react';
import type { GeneralSettings as GeneralSettingsType } from '../types';
import { SlidersHorizontal, Globe, User, ShieldCheck } from '@phosphor-icons/react';

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  onChange: (updated: Partial<GeneralSettingsType>) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <SlidersHorizontal className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">General Platform Parameters</h2>
          <p className="text-xs text-[#64748B]">Core operational defaults, spatial coordinate systems, and operator display preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Operator Name */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8] flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#38BDF8]" />
            Operator Display Name
          </label>
          <input
            type="text"
            value={settings.operatorDisplayName}
            onChange={(e) => onChange({ operatorDisplayName: e.target.value })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          />
          <p className="text-[11px] text-[#64748B]">Displayed in mission audit logs, export watermarks, and QA validation sign-offs.</p>
        </div>

        {/* Default Mission Mode */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Default Mission Workflow</label>
          <select
            value={settings.defaultMissionMode}
            onChange={(e) => onChange({ defaultMissionMode: e.target.value })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="SINGLE_PASS_RECON">Single-Pass Video 3D Reconstruction</option>
            <option value="MULTI_PASS_SURVEY">Multi-Pass Photogrammetry Survey</option>
            <option value="CORRIDOR_INSPECTION">Linear Corridor Inspection</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Initial mode pre-selected when launching a new UAV mission ingestion flow.</p>
        </div>

        {/* CRS Coordinate Reference System */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#38BDF8]" />
            Default Coordinate Reference System (CRS)
          </label>
          <select
            value={settings.crs}
            onChange={(e) => onChange({ crs: e.target.value })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="EPSG:4326 (WGS 84 / Geographic)">EPSG:4326 (WGS 84 / Geographic Lat-Lon)</option>
            <option value="EPSG:3857 (Web Mercator)">EPSG:3857 (WGS 84 / Web Mercator)</option>
            <option value="EPSG:32643 (UTM Zone 43N)">EPSG:32643 (UTM Zone 43N)</option>
            <option value="EPSG:32644 (UTM Zone 44N)">EPSG:32644 (UTM Zone 44N)</option>
            <option value="EPSG:32645 (UTM Zone 45N)">EPSG:32645 (UTM Zone 45N)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Primary spatial reference frame for georeferencing and point cloud alignment.</p>
        </div>

        {/* Distance Units */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Distance Measurement Units</label>
          <div className="flex items-center gap-2 p-1 bg-[#07090E] border border-[#1E293B] rounded-lg w-fit">
            <button
              onClick={() => onChange({ distanceUnit: 'METRIC' })}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-colors ${
                settings.distanceUnit === 'METRIC' ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/40' : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              METRIC (m / km)
            </button>
            <button
              onClick={() => onChange({ distanceUnit: 'IMPERIAL' })}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-colors ${
                settings.distanceUnit === 'IMPERIAL' ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/40' : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              IMPERIAL (ft / mi)
            </button>
          </div>
          <p className="text-[11px] text-[#64748B]">Used across digital twin measurement tools and distance telemetry readout.</p>
        </div>

        {/* Elevation Units */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Elevation Units</label>
          <div className="flex items-center gap-2 p-1 bg-[#07090E] border border-[#1E293B] rounded-lg w-fit">
            <button
              onClick={() => onChange({ elevationUnit: 'METERS' })}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-colors ${
                settings.elevationUnit === 'METERS' ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/40' : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              METERS (AGL/MSL)
            </button>
            <button
              onClick={() => onChange({ elevationUnit: 'FEET' })}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-colors ${
                settings.elevationUnit === 'FEET' ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/40' : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              FEET (AGL/MSL)
            </button>
          </div>
          <p className="text-[11px] text-[#64748B]">Digital Surface Model (DSM) and drone barometric altitude unit system.</p>
        </div>

        {/* Time Format */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Time & Stamp Format</label>
          <select
            value={settings.timeFormat}
            onChange={(e) => onChange({ timeFormat: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="24H">24-Hour Military Time (14:30:00)</option>
            <option value="12H">12-Hour Standard Time (02:30:00 PM)</option>
            <option value="UTC">Coordinated Universal Time (UTC)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Time display standard for flight telemetry logs and keyframe timestamping.</p>
        </div>
      </div>

      {/* Switches & Toggles */}
      <div className="pt-4 border-t border-[#1E293B] space-y-4">
        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC]">Auto-Save Configuration Edits</span>
            <p className="text-[11px] text-[#64748B]">Automatically sync local client configuration parameters upon modification.</p>
          </div>
          <button
            onClick={() => onChange({ autoSaveConfig: !settings.autoSaveConfig })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.autoSaveConfig ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.autoSaveConfig ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              Confirm Destructive Mission Deletions
            </span>
            <p className="text-[11px] text-[#64748B]">Require double confirmation modals before clearing mission caches or point cloud files.</p>
          </div>
          <button
            onClick={() => onChange({ confirmDestructiveActions: !settings.confirmDestructiveActions })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.confirmDestructiveActions ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.confirmDestructiveActions ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
