import React from 'react';
import type { VisualizationSettings as VisualizationSettingsType } from '../types';
import { Eye, Compass, Monitor } from '@phosphor-icons/react';

interface VisualizationSettingsProps {
  settings: VisualizationSettingsType;
  onChange: (updated: Partial<VisualizationSettingsType>) => void;
}

export const VisualizationSettings: React.FC<VisualizationSettingsProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <Eye className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">3D Viewport & Rendering Settings</h2>
          <p className="text-xs text-[#64748B]">CesiumJS / Three.js graphics options, shader antialiasing, and default layer visibility.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Controls */}
        <div className="lg:col-span-2 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Viewport Mode */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[#94A3B8]">Default Viewport Mode</label>
              <select
                value={settings.viewportMode}
                onChange={(e) => onChange({ viewportMode: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="CESIUM_3D">Cesium 3D Globe Viewport</option>
                <option value="THREE_MESH">Three.js High-Detail Mesh Viewer</option>
                <option value="SPLIT">Dual Split-Screen Viewport</option>
              </select>
            </div>

            {/* Antialiasing */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[#94A3B8]">GPU Antialiasing Mode</label>
              <select
                value={settings.antialiasing}
                onChange={(e) => onChange({ antialiasing: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="MSAA_4X">MSAA 4x (Multisample Hardware AA)</option>
                <option value="FXAA">FXAA (Fast Approximate Shader AA)</option>
                <option value="OFF">Disabled (Maximum FPS)</option>
              </select>
            </div>

            {/* Rendering Quality */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[#94A3B8]">Shader Rendering Quality</label>
              <select
                value={settings.renderingQuality}
                onChange={(e) => onChange({ renderingQuality: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="ULTRA">Ultra Quality (Full Shadow & Refraction Shaders)</option>
                <option value="HIGH">High Quality (Standard Shaders)</option>
                <option value="MEDIUM">Medium Quality (Optimized for Mobile/Embedded GPUs)</option>
              </select>
            </div>

            {/* Animation Quality */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[#94A3B8]">Camera Animation Interpolation</label>
              <select
                value={settings.animationQuality}
                onChange={(e) => onChange({ animationQuality: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="ULTRA">Smooth Bezier Spline (60 FPS Target)</option>
                <option value="HIGH">Linear Keyframe Interpolation</option>
                <option value="MEDIUM">Step Interpolation (Low Power)</option>
              </select>
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="pt-4 border-t border-[#1E293B]">
            <span className="block font-mono text-xs font-bold text-[#F8FAFC] mb-3">DEFAULT VIEWPORT LAYERS</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'showFlightTrajectory', label: 'Flight Trajectory Line', desc: 'Display 3D UAV flight path curve' },
                { key: 'showCameraPoses', label: 'Camera Pose Frustums', desc: 'Render 3D keyframe camera pyramids' },
                { key: 'showSurveyBoundary', label: 'Survey Area Boundary', desc: 'Render bounding polygon on terrain' },
                { key: 'showPointCloud', label: '3D Point Cloud Layer', desc: 'Render dense points in viewport' },
                { key: 'showDsmGrid', label: 'DSM Elevation Grid', desc: 'Display elevation heatmap wireframe' },
                { key: 'showTerrainMesh', label: '3D Textured Terrain Mesh', desc: 'Render surface mesh geometry' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-2.5 bg-[#07090E] rounded-lg border border-[#1E293B]">
                  <div className="space-y-0.5">
                    <span className="font-mono font-semibold text-[#F8FAFC] text-xs">{item.label}</span>
                    <p className="text-[10px] text-[#64748B]">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => onChange({ [item.key]: !settings[item.key as keyof VisualizationSettingsType] })}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                      settings[item.key as keyof VisualizationSettingsType] ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                        settings[item.key as keyof VisualizationSettingsType] ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: VIEWPORT PREVIEW Card */}
        <div className="bg-[#07090E] border border-[#1E293B] rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F8FAFC] pb-2 border-b border-[#1E293B]">
              <span className="flex items-center gap-1.5 text-[#38BDF8]">
                <Monitor className="w-4 h-4" />
                VIEWPORT PREVIEW
              </span>
              <span className="text-[10px] text-[#64748B]">{settings.viewportMode}</span>
            </div>

            {/* Stylized Canvas Box */}
            <div className="relative w-full h-48 my-3 bg-[#090D16] rounded border border-[#1E293B]/80 overflow-hidden flex items-center justify-center">
              {/* Grid Background */}
              <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" width="100%" height="100%">
                <defs>
                  <pattern id="viewGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#viewGrid)" />
              </svg>

              {/* Stylized 3D Trajectory & Mesh Preview */}
              <svg viewBox="0 0 200 120" className="w-full h-full relative z-10">
                {/* Boundary */}
                {settings.showSurveyBoundary && (
                  <polygon points="20,20 180,15 175,100 15,105" fill="#38BDF8" fillOpacity="0.1" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
                )}

                {/* Trajectory */}
                {settings.showFlightTrajectory && (
                  <path d="M 30,35 Q 100,10 170,40 T 160,85 T 40,80" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 2" />
                )}

                {/* Camera Poses */}
                {settings.showCameraPoses && (
                  <g fill="#F59E0B">
                    <polygon points="40,30 46,38 34,38" />
                    <polygon points="100,20 106,28 94,28" />
                    <polygon points="150,45 156,53 144,53" />
                  </g>
                )}

                {/* Point Cloud simulation dots */}
                {settings.showPointCloud && (
                  <g fill="#10B981" opacity="0.6">
                    <circle cx="80" cy="50" r="1.5" />
                    <circle cx="85" cy="53" r="1" />
                    <circle cx="78" cy="60" r="1" />
                    <circle cx="110" cy="70" r="1.5" />
                    <circle cx="115" cy="65" r="1" />
                  </g>
                )}
              </svg>

              <div className="absolute top-2 right-2 text-[#64748B] flex items-center gap-1 text-[10px] font-mono">
                <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>N 0°</span>
              </div>

              <div className="absolute bottom-2 left-2 bg-[#07090E]/90 px-2 py-0.5 rounded border border-[#1E293B] text-[10px] font-mono text-[#38BDF8]">
                {settings.antialiasing}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] space-y-1 bg-[#0C1018] p-2.5 rounded border border-[#1E293B]">
            <div className="flex justify-between">
              <span>Renderer:</span>
              <span className="text-[#F8FAFC]">WebGL 2.0 / {settings.renderingQuality}</span>
            </div>
            <div className="flex justify-between">
              <span>Target FPS:</span>
              <span className="text-[#10B981]">60.0 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
