import React from 'react';

export const TechnicalStrip: React.FC = () => {
  const specs = [
    { label: 'INPUT FORMAT', val: '1080P / 4K MP4' },
    { label: 'FLIGHT PATTERN', val: 'SINGLE-PASS NADIR' },
    { label: 'SPATIAL ACCURACY', val: '< 0.5M RMSE' },
    { label: 'OUTPUT TILES', val: '3D TILES / GLTF' },
    { label: 'POINT DENSITY', val: '24M PTS / HA' },
    { label: 'RASTER EXPORTS', val: 'GEOTIFF / DSM' },
    { label: 'QA VERIFICATION', val: 'AUTOMATED SLA' },
  ];

  return (
    <div className="w-full bg-[#0C1018] border-y border-[#1E293B] py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {specs.map((s, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[#64748B]">{s.label}:</span>
            <span className="text-[#38BDF8] font-bold">{s.val}</span>
            {idx < specs.length - 1 && <span className="text-[#1E293B] ml-4">•</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
