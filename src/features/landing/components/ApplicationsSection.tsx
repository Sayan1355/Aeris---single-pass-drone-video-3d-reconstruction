import React from 'react';
import { Compass, ShieldCheck, Buildings, Wrench, Siren, Plant } from '@phosphor-icons/react';

export const ApplicationsSection: React.FC = () => {
  const apps = [
    {
      title: 'Infrastructure Inspection',
      desc: 'Bridges, dams, power lines, and industrial facilities audited without GPS ground teams.',
      icon: <Wrench className="w-5 h-5 text-[#38BDF8]" />,
    },
    {
      title: 'Disaster Response & Recon',
      desc: 'Rapid post-landslide or flood terrain mapping for emergency casualty routing.',
      icon: <Siren className="w-5 h-5 text-[#EF4444]" />,
    },
    {
      title: 'Construction & Volume Auditing',
      desc: 'Stockpile cut/fill volume calculations and automated progress tracking.',
      icon: <Buildings className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      title: 'Strategic Defense Mapping',
      desc: 'GPS-denied Single-Pass video reconstruction for tactical spatial awareness.',
      icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
    },
    {
      title: 'Urban Planning & Smart Cities',
      desc: 'High-density 3D Tiles mesh generation for municipal transit and building zoning.',
      icon: <Compass className="w-5 h-5 text-[#818CF8]" />,
    },
    {
      title: 'Environmental & Canopy Survey',
      desc: 'Coastal erosion tracking, forest canopy density modeling, and terrain DEM analysis.',
      icon: <Plant className="w-5 h-5 text-[#38BDF8]" />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#07090E] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">OPERATIONAL DOMAINS</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Built for High-Stakes Aerospace Workflows
          </h2>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0C1018] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-[#07090E] border border-[#1E293B] shrink-0">{item.icon}</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
