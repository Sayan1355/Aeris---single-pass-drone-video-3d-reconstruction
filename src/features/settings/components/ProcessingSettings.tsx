import React from 'react';
import type { ReconstructionSettings as ReconstructionSettingsType } from '../types';
import { Cpu, Atom, ShieldCheck, Lightning, Cube } from '@phosphor-icons/react';

interface ProcessingSettingsProps {
  settings: ReconstructionSettingsType;
  onChange: (updated: Partial<ReconstructionSettingsType>) => void;
}

export const ProcessingSettings: React.FC<ProcessingSettingsProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <Cpu className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">Reconstruction Engine Pipeline Defaults</h2>
          <p className="text-xs text-[#64748B]">SfM, MVS dense point cloud generation, mesh texturing, and GSD resolution target parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Quality Preset */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Default Reconstruction Quality</label>
          <div className="grid grid-cols-3 gap-2">
            {(['HIGH', 'BALANCED', 'FAST'] as const).map((q) => (
              <button
                key={q}
                onClick={() => onChange({ defaultQuality: q })}
                className={`py-2 px-3 rounded font-mono text-xs border text-center transition-colors ${
                  settings.defaultQuality === q
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold'
                    : 'bg-[#07090E] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">HIGH maximizes dense point cloud resolution; FAST optimizes processing throughput.</p>
        </div>

        {/* Frame Sampling Mode */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Video Frame Sampling Mode</label>
          <select
            value={settings.frameSamplingMode}
            onChange={(e) => onChange({ frameSamplingMode: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="KEYFRAME_ADAPTIVE">Adaptive Keyframe Selection (Optical Flow Delta)</option>
            <option value="UNIFORM_1FPS">Uniform 1 FPS Sampling</option>
            <option value="FULL_30FPS">Full Video FPS Extraction (Maximum Density)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Determines how keyframes are extracted from single-pass drone video files.</p>
        </div>

        {/* Default Viz Mode */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Default Visualization Mode</label>
          <select
            value={settings.defaultVizMode}
            onChange={(e) => onChange({ defaultVizMode: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="POINT_CLOUD">3D Dense Point Cloud (.LAS/.LAZ)</option>
            <option value="MESH">Textured 3D Surface Mesh (.OBJ/.GLTF)</option>
            <option value="DSM">Digital Surface Model Raster (DSM Grid)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Pre-selected viewer layer upon completion of pipeline processing.</p>
        </div>

        {/* Georeferencing Mode */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Georeferencing Alignment Engine</label>
          <select
            value={settings.georeferencingMode}
            onChange={(e) => onChange({ georeferencingMode: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="GCP_GPS">Hybrid Ground Control Points (GCP) + RTK GPS</option>
            <option value="DIRECT_GEO">Direct Video Telemetry Georeferencing (No GCPs)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Controls absolute spatial positioning method for coordinate transformation.</p>
        </div>

        {/* Target GSD Slider */}
        <div className="space-y-1.5 md:col-span-2 bg-[#07090E] p-3 rounded-lg border border-[#1E293B]">
          <div className="flex items-center justify-between font-mono text-[#94A3B8]">
            <span>Target Ground Sampling Distance (GSD):</span>
            <span className="text-[#38BDF8] font-bold text-sm">{settings.defaultGsdTargetCmPx.toFixed(1)} cm/px</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={settings.defaultGsdTargetCmPx}
            onChange={(e) => onChange({ defaultGsdTargetCmPx: parseFloat(e.target.value) })}
            className="w-full accent-[#38BDF8] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
            <span>0.5 cm/px (Ultra High Res)</span>
            <span>2.5 cm/px (Standard)</span>
            <span>5.0 cm/px (Coarse Recon)</span>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="pt-4 border-t border-[#1E293B] grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] flex items-center gap-1.5">
              <Lightning className="w-4 h-4 text-[#F59E0B]" />
              Dynamic Object Masking
            </span>
            <p className="text-[11px] text-[#64748B]">Filter moving vehicles and pedestrians from keyframes.</p>
          </div>
          <button
            onClick={() => onChange({ dynamicObjectMasking: !settings.dynamicObjectMasking })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.dynamicObjectMasking ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.dynamicObjectMasking ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] flex items-center gap-1.5">
              <Atom className="w-4 h-4 text-[#818CF8]" />
              Dense Point Cloud Generation
            </span>
            <p className="text-[11px] text-[#64748B]">Execute MVS depth-map fusion for 3D point cloud.</p>
          </div>
          <button
            onClick={() => onChange({ densePointCloudGeneration: !settings.densePointCloudGeneration })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.densePointCloudGeneration ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.densePointCloudGeneration ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] flex items-center gap-1.5">
              <Cube className="w-4 h-4 text-[#EC4899]" />
              Texture Atlas Generation
            </span>
            <p className="text-[11px] text-[#64748B]">Build UV texture maps for 3D surface mesh.</p>
          </div>
          <button
            onClick={() => onChange({ textureGeneration: !settings.textureGeneration })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.textureGeneration ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.textureGeneration ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Automatic QA Validation
            </span>
            <p className="text-[11px] text-[#64748B]">Calculate RMSE and residual errors after processing.</p>
          </div>
          <button
            onClick={() => onChange({ autoQaValidation: !settings.autoQaValidation })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.autoQaValidation ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#07090E] transition-transform transform ${
                settings.autoQaValidation ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
