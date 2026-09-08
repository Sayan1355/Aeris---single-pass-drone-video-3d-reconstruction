import React from 'react';
import { Cube, Globe, ShieldCheck, HardDrives, FileCode, Path } from '@phosphor-icons/react';

export const OutputsSection: React.FC = () => {
  const outputs = [
    {
      title: '3D Digital Twin Mesh',
      format: '.GLTF / 3D Tiles',
      spec: 'Sub-centimeter UV Texture Atlas',
      desc: 'Seamless 3D textured mesh model for web browsers and CAD environments.',
      icon: <Cube className="w-6 h-6 text-[#38BDF8]" />,
    },
    {
      title: 'Dense Point Cloud',
      format: '.LAS / .LAZ / .PLY',
      spec: '24M Points / Hectare',
      desc: 'Full-density RGB-colored 3D point cloud with classification attributes.',
      icon: <FileCode className="w-6 h-6 text-[#818CF8]" />,
    },
    {
      title: 'Orthomosaic Raster',
      format: '.GeoTIFF (UTM Projected)',
      spec: '1.0 cm/px GSD Resolution',
      desc: 'High-resolution true orthophoto mosaic georeferenced to UTM coordinate systems.',
      icon: <Globe className="w-6 h-6 text-[#10B981]" />,
    },
    {
      title: 'Digital Surface Model (DSM)',
      format: '.GeoTIFF Elevation Grid',
      spec: '0.1m Vertical Resolution',
      desc: 'Topographic elevation model for cut/fill volume auditing and slope analysis.',
      icon: <HardDrives className="w-6 h-6 text-[#F59E0B]" />,
    },
    {
      title: '3D Flight Trajectory',
      format: '.KML / .CZML / .JSON',
      spec: '10Hz RTK Position Curve',
      desc: 'Exact spatial camera path with timestamped position and orientation telemetry.',
      icon: <Path className="w-6 h-6 text-[#EC4899]" />,
    },
    {
      title: 'Scientific QA Certification',
      format: '.PDF / .JSON Report',
      spec: 'RMSE < 0.42m Verified',
      desc: 'Residual error audit matrix, GCP confidence score, and accuracy certificate.',
      icon: <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#07090E] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">GENERATED SPATIAL ASSETS</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            High-Precision Output Deliverables
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
            AERIS generates standard OGC-compliant spatial formats ready for immediate ingestion into GIS platforms, BIM software, and web viewports.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outputs.map((out, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0C1018] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-[#07090E] border border-[#1E293B]">{out.icon}</div>
                <span className="font-mono text-[11px] text-[#38BDF8] px-2.5 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                  {out.format}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#F8FAFC]">{out.title}</h3>
                <div className="text-xs font-mono text-[#64748B] mt-0.5">{out.spec}</div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">{out.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
