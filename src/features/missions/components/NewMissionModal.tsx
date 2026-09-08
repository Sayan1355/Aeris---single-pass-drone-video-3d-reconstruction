import React, { useState } from 'react';
import type { MissionRecord, NewMissionFormData } from '../types';
import { X, Plus, CheckCircle, PaperPlaneTilt, Camera, MapPin, Gauge } from '@phosphor-icons/react';

interface NewMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMission: (mission: MissionRecord) => void;
}

export const NewMissionModal: React.FC<NewMissionModalProps> = ({
  isOpen,
  onClose,
  onCreateMission,
}) => {
  const [formData, setFormData] = useState<NewMissionFormData>({
    id: `AERIS-MSN-0248`,
    name: 'New UAV Survey Area Reconnaissance',
    location: 'Surat Coastal Expansion Zone',
    areaHa: 120.5,
    platform: 'UAV-DJI-M350-01',
    videoSource: 'Single-Pass 4K 60FPS Video',
    gpsSource: 'RTK Dual-Freq Log (.NMEA)',
    cameraModel: 'Zenmuse P1 45MP Full-Frame',
    expectedGsd: 2.8,
    hasImu: true,
    hasBaro: true,
    hasRtk: true,
    hasIntrinsics: true,
  });

  const [isCreated, setIsCreated] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: MissionRecord = {
      id: formData.id || `AERIS-MSN-${Math.floor(200 + Math.random() * 800)}`,
      name: formData.name,
      status: 'PROCESSING',
      location: formData.location,
      coordinates: '22.8450° N, 71.3210° E',
      platform: formData.platform,
      captureDate: '09 SEP 2026',
      areaHa: Number(formData.areaHa) || 100,
      gsdCmPx: Number(formData.expectedGsd) || 3.0,
      progressPct: 15,
      qualityScore: null,
      frameCount: 1200,
      totalFrames: 3500,
      currentStage: 'Stage 1 — Video Ingestion & Frame Extraction',
      altitudeM: 115.0,
      flightDurationMin: 20.0,
      cameraModel: formData.cameraModel,
      gnssMode: formData.hasRtk ? 'RTK Dual-Freq' : 'GPS Standard',
      rtkStatus: formData.hasRtk ? 'FIXED' : 'SINGLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onCreateMission(newRecord);
    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07090E]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0C1018] border border-[#38BDF8]/40 rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#07090E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#38BDF8]/10 text-[#38BDF8]">
              <PaperPlaneTilt size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F8FAFC]">CONFIGURE NEW MISSION</h2>
              <p className="text-[11px] text-[#94A3B8] font-sans">
                Set parameters for single-pass UAV video ingestion &amp; 3D reconstruction.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#1E293B] text-[#64748B] hover:text-[#F8FAFC]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Success Banner */}
        {isCreated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle size={48} className="text-[#10B981] animate-bounce" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              MISSION CREATED SUCCESSFULLY
            </h3>
            <p className="text-xs text-[#38BDF8]">
              READY FOR DATA INGESTION &amp; RECONSTRUCTION PIPELINE
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Mission ID & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1">
                  MISSION ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#38BDF8] font-bold focus:border-[#38BDF8] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1">
                  MISSION NAME / TITLE
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#F8FAFC] focus:border-[#38BDF8] outline-none"
                  required
                />
              </div>
            </div>

            {/* Location & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1 flex items-center gap-1">
                  <MapPin size={13} className="text-[#38BDF8]" />
                  LOCATION / SURVEY ZONE
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#F8FAFC] focus:border-[#38BDF8] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1">
                  SURVEY AREA (ha)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.areaHa}
                  onChange={(e) => setFormData({ ...formData, areaHa: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#F8FAFC] focus:border-[#38BDF8] outline-none"
                  required
                />
              </div>
            </div>

            {/* Platform & Camera */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1 flex items-center gap-1">
                  <Camera size={13} className="text-[#38BDF8]" />
                  UAV PLATFORM
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#F8FAFC] focus:border-[#38BDF8] outline-none"
                >
                  <option value="UAV-DJI-M30T-07">UAV-DJI-M30T-07</option>
                  <option value="UAV-DJI-M350-01">UAV-DJI-M350-01</option>
                  <option value="UAV-DJI-M350-02">UAV-DJI-M350-02</option>
                  <option value="UAV-AUTEL-EVO2">UAV-AUTEL-EVO2</option>
                  <option value="UAV-WINGTRA-ONE">UAV-WINGTRA-ONE</option>
                </select>
              </div>

              <div>
                <label className="text-[#64748B] block text-[11px] font-bold mb-1 flex items-center gap-1">
                  <Gauge size={13} className="text-[#38BDF8]" />
                  EXPECTED GSD (cm/px)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.expectedGsd}
                  onChange={(e) => setFormData({ ...formData, expectedGsd: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded text-[#38BDF8] font-bold focus:border-[#38BDF8] outline-none"
                />
              </div>
            </div>

            {/* Sensor Inputs Toggles */}
            <div className="pt-2 border-t border-[#1E293B]">
              <span className="text-[11px] text-[#64748B] font-bold tracking-wider block mb-2">
                REQUIRED SENSOR INPUTS &amp; TELEMETRY
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'hasImu', label: 'IMU Telemetry' },
                  { key: 'hasBaro', label: 'Barometric Alt' },
                  { key: 'hasRtk', label: 'RTK / PPK GNSS' },
                  { key: 'hasIntrinsics', label: 'Camera Calibration' },
                ].map((s) => (
                  <label
                    key={s.key}
                    className="flex items-center gap-2 p-2 rounded bg-[#07090E] border border-[#1E293B] cursor-pointer text-[11px] text-[#CBD5E1]"
                  >
                    <input
                      type="checkbox"
                      checked={(formData as any)[s.key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [s.key]: e.target.checked })
                      }
                      className="accent-[#38BDF8]"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-[#CBD5E1] rounded text-xs font-bold transition-all"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#07090E] rounded text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus size={16} weight="bold" />
                <span>CREATE MISSION</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
