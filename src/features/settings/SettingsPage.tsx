import React, { useState, useMemo } from 'react';
import { SettingsHeader } from './components/SettingsHeader';
import { GeneralSettings } from './components/GeneralSettings';
import { ProcessingSettings } from './components/ProcessingSettings';
import { VisualizationSettings } from './components/VisualizationSettings';
import { TelemetrySettings } from './components/TelemetrySettings';
import { StorageSettings } from './components/StorageSettings';
import { InterfaceSettings } from './components/InterfaceSettings';
import { SystemHealthPanel } from './components/SystemHealthPanel';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { AboutAeris } from './components/AboutAeris';
import { DEFAULT_AERIS_SETTINGS, MOCK_SYSTEM_HEALTH, KEYBOARD_SHORTCUTS } from './data/mockSettings';
import type { AerisSettings, SettingsSectionId } from './types';
import {
  Sliders,
  Cpu,
  Eye,
  Waveform,
  HardDrives,
  Layout,
  Heartbeat,
  Keyboard,
  Info,
  CheckCircle
} from '@phosphor-icons/react';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AerisSettings>(DEFAULT_AERIS_SETTINGS);
  const [savedSettings, setSavedSettings] = useState<AerisSettings>(DEFAULT_AERIS_SETTINGS);
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('general');
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dirty state checking
  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(savedSettings);
  }, [settings, savedSettings]);

  // Actions
  const handleSave = () => {
    setSavedSettings(settings);
    const now = new Date().toLocaleTimeString();
    setLastUpdated(now);
    showToast('Configuration changes saved successfully to client session.');
  };

  const handleReset = () => {
    setSettings(savedSettings);
    showToast('Pending configuration edits discarded.');
  };

  const handleRestoreDefaults = () => {
    setSettings(DEFAULT_AERIS_SETTINGS);
    setSavedSettings(DEFAULT_AERIS_SETTINGS);
    setLastUpdated('Restored Factory Defaults');
    showToast('Restored factory default configuration baseline.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Nav item list
  const navItems: { id: SettingsSectionId; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General', icon: <Sliders className="w-4 h-4" /> },
    { id: 'reconstruction', label: 'Reconstruction', icon: <Cpu className="w-4 h-4" /> },
    { id: 'visualization', label: 'Visualization', icon: <Eye className="w-4 h-4" /> },
    { id: 'telemetry', label: 'Telemetry & Flight', icon: <Waveform className="w-4 h-4 text-[#38BDF8]" /> },
    { id: 'storage', label: 'Storage & Exports', icon: <HardDrives className="w-4 h-4" /> },
    { id: 'interface', label: 'Interface & Density', icon: <Layout className="w-4 h-4" /> },
    { id: 'system', label: 'System Health', icon: <Heartbeat className="w-4 h-4" /> },
    { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'about', label: 'About AERIS', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] p-6 space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0C1018] border border-[#38BDF8] text-[#38BDF8] rounded-xl shadow-2xl font-mono text-xs animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <SettingsHeader
        isDirty={isDirty}
        onSave={handleSave}
        onReset={handleReset}
        onRestoreDefaults={handleRestoreDefaults}
        lastUpdated={lastUpdated}
      />

      {/* Main Grid: Left Vertical Navigation + Content Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Navigation Menu */}
        <div className="md:col-span-1 bg-[#0C1018] border border-[#1E293B] rounded-xl p-3 space-y-1 sticky top-6">
          <div className="px-3 py-2 text-[10px] font-mono text-[#64748B] uppercase tracking-wider border-b border-[#1E293B] mb-1">
            CONFIGURATION SECTIONS
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 font-bold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#38BDF8]' : 'text-[#64748B]'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Section Content */}
        <div className="md:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <GeneralSettings
              settings={settings.general}
              onChange={(updated) => setSettings((prev) => ({ ...prev, general: { ...prev.general, ...updated } }))}
            />
          )}

          {activeSection === 'reconstruction' && (
            <ProcessingSettings
              settings={settings.reconstruction}
              onChange={(updated) => setSettings((prev) => ({ ...prev, reconstruction: { ...prev.reconstruction, ...updated } }))}
            />
          )}

          {activeSection === 'visualization' && (
            <VisualizationSettings
              settings={settings.visualization}
              onChange={(updated) => setSettings((prev) => ({ ...prev, visualization: { ...prev.visualization, ...updated } }))}
            />
          )}

          {activeSection === 'telemetry' && (
            <TelemetrySettings
              settings={settings.telemetry}
              onChange={(updated) => setSettings((prev) => ({ ...prev, telemetry: { ...prev.telemetry, ...updated } }))}
            />
          )}

          {activeSection === 'storage' && (
            <StorageSettings
              settings={settings.storage}
              onChange={(updated) => setSettings((prev) => ({ ...prev, storage: { ...prev.storage, ...updated } }))}
            />
          )}

          {activeSection === 'interface' && (
            <InterfaceSettings
              settings={settings.interface}
              onChange={(updated) => setSettings((prev) => ({ ...prev, interface: { ...prev.interface, ...updated } }))}
            />
          )}

          {activeSection === 'system' && (
            <SystemHealthPanel healthItems={MOCK_SYSTEM_HEALTH} />
          )}

          {activeSection === 'shortcuts' && (
            <KeyboardShortcuts shortcuts={KEYBOARD_SHORTCUTS} />
          )}

          {activeSection === 'about' && (
            <AboutAeris />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
