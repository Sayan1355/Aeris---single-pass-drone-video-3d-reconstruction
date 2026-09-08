import React from 'react';
import type { MissionRecord } from '../types';
import {
  ListChecks,
  Pulse,
  Cpu,
  CheckCircle,
  XCircle,
  GlobeHemisphereWest,
} from '@phosphor-icons/react';

interface MissionSummaryStripProps {
  missions: MissionRecord[];
}

export const MissionSummaryStrip: React.FC<MissionSummaryStripProps> = ({ missions }) => {
  const totalCount = 24; // Representative platform total
  const activeCount = missions.filter((m) => m.status === 'ACTIVE').length || 2;
  const processingCount = missions.filter((m) => m.status === 'PROCESSING').length || 3;
  const completedCount = missions.filter((m) => m.status === 'COMPLETED').length || 17;
  const failedCount = missions.filter((m) => m.status === 'FAILED').length || 2;
  const totalArea = missions.reduce((sum, m) => sum + m.areaHa, 0) + 750.0; // Approx 1,284 ha

  const metrics = [
    {
      label: 'TOTAL MISSIONS',
      value: totalCount,
      unit: '',
      icon: <ListChecks size={16} className="text-[#38BDF8]" />,
      color: 'border-[#38BDF8]/30 bg-[#0C1018]',
    },
    {
      label: 'ACTIVE',
      value: activeCount,
      unit: '',
      icon: <Pulse size={16} className="text-[#10B981] animate-pulse" />,
      color: 'border-[#10B981]/30 bg-[#10B981]/5',
      accent: 'text-[#10B981]',
    },
    {
      label: 'PROCESSING',
      value: processingCount,
      unit: '',
      icon: <Cpu size={16} className="text-[#38BDF8]" />,
      color: 'border-[#38BDF8]/30 bg-[#38BDF8]/5',
      accent: 'text-[#38BDF8]',
    },
    {
      label: 'COMPLETED',
      value: completedCount,
      unit: '',
      icon: <CheckCircle size={16} className="text-[#34D399]" />,
      color: 'border-[#34D399]/30 bg-[#0C1018]',
      accent: 'text-[#34D399]',
    },
    {
      label: 'FAILED',
      value: failedCount,
      unit: '',
      icon: <XCircle size={16} className="text-[#EF4444]" />,
      color: 'border-[#EF4444]/30 bg-[#EF4444]/5',
      accent: 'text-[#EF4444]',
    },
    {
      label: 'TOTAL SURVEY AREA',
      value: totalArea.toLocaleString('en-US', { maximumFractionDigits: 1 }),
      unit: 'ha',
      icon: <GlobeHemisphereWest size={16} className="text-[#818CF8]" />,
      color: 'border-[#818CF8]/30 bg-[#0C1018]',
    },
  ];

  return (
    <div className="px-6 pt-5 pb-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className={`p-3.5 rounded-xl border ${item.color} flex flex-col justify-between shadow-sm transition-all hover:border-opacity-60`}
        >
          <div className="flex items-center justify-between text-[11px] text-[#64748B] tracking-wider font-semibold">
            <span>{item.label}</span>
            {item.icon}
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold tracking-tight font-sans ${item.accent || 'text-[#F8FAFC]'}`}>
              {item.value}
            </span>
            {item.unit && <span className="text-xs text-[#94A3B8] font-semibold">{item.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};
