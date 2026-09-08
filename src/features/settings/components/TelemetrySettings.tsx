import React from 'react';
import type { TelemetrySettings as TelemetrySettingsType } from '../types';
import { Waveform, Radio, BatteryWarning, Notification, Info } from '@phosphor-icons/react';

interface TelemetrySettingsProps {
  settings: TelemetrySettingsType;
  onChange: (updated: Partial<TelemetrySettingsType>) => void;
}

export const TelemetrySettings: React.FC<TelemetrySettingsProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <Waveform className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">Telemetry & Flight Operations Settings</h2>
          <p className="text-xs text-[#64748B]">Real-time stream update frequencies, warning thresholds, and local simulation options.</p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs text-[#38BDF8]">
        <Info className="w-4 h-4 shrink-0" />
        <span>
          <strong>SIMULATION NOTICE:</strong> Telemetry settings control the local frontend client flight data simulator & display stream rate. No backend WebSockets or live radio hardware connections are altered.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Refresh Rate */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Telemetry Stream Refresh Rate</label>
          <div className="grid grid-cols-4 gap-2">
            {(['100MS', '250MS', '500MS', '1000MS'] as const).map((r) => (
              <button
                key={r}
                onClick={() => onChange({ refreshRate: r })}
                className={`py-2 px-2 rounded font-mono text-xs border text-center transition-colors ${
                  settings.refreshRate === r
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold'
                    : 'bg-[#07090E] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">Controls frequency of state recalculations for flight instruments.</p>
        </div>

        {/* Position Update Frequency */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Position Update Rate (Hz)</label>
          <select
            value={settings.positionUpdateFrequencyHz}
            onChange={(e) => onChange({ positionUpdateFrequencyHz: parseInt(e.target.value, 10) })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="10">10 Hz (High Precision Interpolation)</option>
            <option value="5">5 Hz (Standard Drone Telemetry)</option>
            <option value="1">1 Hz (Low Bandwidth Mode)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">RTK positioning coordinate calculation frequency.</p>
        </div>

        {/* Chart History Duration */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Chart History Buffer Duration</label>
          <select
            value={settings.chartHistoryDurationSec}
            onChange={(e) => onChange({ chartHistoryDurationSec: parseInt(e.target.value, 10) })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="30">30 Seconds Window</option>
            <option value="60">60 Seconds Window (Standard)</option>
            <option value="120">120 Seconds Window (Extended)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Rolling window buffer for telemetry altitude/speed/battery charts.</p>
        </div>

        {/* GNSS Warning Threshold */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-[#F59E0B]" />
            GNSS Warning Threshold (Satellites)
          </label>
          <select
            value={settings.gnssWarningThresholdSatellites}
            onChange={(e) => onChange({ gnssWarningThresholdSatellites: parseInt(e.target.value, 10) })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="15">15 Satellites (Strict Aerospace SLA)</option>
            <option value="12">12 Satellites (Standard RTK Fixed)</option>
            <option value="8">8 Satellites (Minimum Lock)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Trigger warning alert when satellite count falls below threshold.</p>
        </div>

        {/* Battery Warning Threshold */}
        <div className="space-y-1.5 md:col-span-2 bg-[#07090E] p-3 rounded-lg border border-[#1E293B]">
          <div className="flex items-center justify-between font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <BatteryWarning className="w-4 h-4 text-[#EF4444]" />
              Battery Warning Alert Threshold (%):
            </span>
            <span className="text-[#EF4444] font-bold text-sm">{settings.batteryWarningThresholdPercent}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="1"
            value={settings.batteryWarningThresholdPercent}
            onChange={(e) => onChange({ batteryWarningThresholdPercent: parseInt(e.target.value, 10) })}
            className="w-full accent-[#EF4444] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
            <span>10% (Critical Emergency RTH)</span>
            <span>20% (Standard RTH Warning)</span>
            <span>30% (Early Return Warning)</span>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="pt-4 border-t border-[#1E293B] grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs">Simulated Telemetry</span>
            <p className="text-[10px] text-[#64748B]">Generate mock live flight telemetry stream.</p>
          </div>
          <button
            onClick={() => onChange({ showSimulatedTelemetry: !settings.showSimulatedTelemetry })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.showSimulatedTelemetry ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.showSimulatedTelemetry ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs">Auto-Center UAV</span>
            <p className="text-[10px] text-[#64748B]">Lock viewport camera on drone position.</p>
          </div>
          <button
            onClick={() => onChange({ autoCenterUav: !settings.autoCenterUav })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.autoCenterUav ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.autoCenterUav ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-[#F8FAFC] text-xs flex items-center gap-1">
              <Notification className="w-3.5 h-3.5 text-[#38BDF8]" />
              Event Notifications
            </span>
            <p className="text-[10px] text-[#64748B]">Pop alert banners for telemetry events.</p>
          </div>
          <button
            onClick={() => onChange({ showEventNotifications: !settings.showEventNotifications })}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              settings.showEventNotifications ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                settings.showEventNotifications ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
