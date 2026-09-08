import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { ChartLine, TrendUp } from '@phosphor-icons/react';
import type { QualityTrendPoint } from '../types';

interface HistoryQualityTrendChartProps {
  data: QualityTrendPoint[];
}

export const HistoryQualityTrendChart: React.FC<HistoryQualityTrendChartProps> = ({ data }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-5 space-y-4">
      {/* Title & Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <ChartLine className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-bold text-[#F8FAFC]">HISTORICAL RECONSTRUCTION QUALITY SCORE TREND (%)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#10B981]" />
            <span className="text-[#94A3B8]">Quality Score (%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#F59E0B] stroke-dasharray" />
            <span className="text-[#94A3B8]">Target SLA (85%)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1E293B' }}
            />
            <YAxis
              domain={[70, 100]}
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1E293B' }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#07090E',
                borderColor: '#1E293B',
                borderRadius: '0.5rem',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#F8FAFC',
              }}
              formatter={(value: any, _name: any, item: any) => [
                `${value}%`,
                `Quality [MSN-${item.payload.missionId}]`,
              ]}
            />
            <ReferenceLine y={85} stroke="#F59E0B" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="qualityScore"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ fill: '#10B981', r: 3 }}
              activeDot={{ r: 5, fill: '#38BDF8', stroke: '#F8FAFC' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#1E293B]">
        <span className="flex items-center gap-1 text-[#10B981]">
          <TrendUp className="w-3.5 h-3.5" />
          Average quality score across history: <strong>89.7%</strong>
        </span>
        <span>SLA target compliance rate: <strong>87.5%</strong></span>
      </div>
    </div>
  );
};
