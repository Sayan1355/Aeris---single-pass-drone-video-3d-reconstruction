import React from 'react';
import type { StorageSettings as StorageSettingsType } from '../types';
import { HardDrives, Database, FileCode, CheckCircle } from '@phosphor-icons/react';

interface StorageSettingsProps {
  settings: StorageSettingsType;
  onChange: (updated: Partial<StorageSettingsType>) => void;
}

export const StorageSettings: React.FC<StorageSettingsProps> = ({ settings, onChange }) => {
  const cachePercent = Math.min(100, Math.round((settings.localCacheUsedGB / settings.localCacheMaxGB) * 100));

  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
        <HardDrives className="w-5 h-5 text-[#38BDF8]" />
        <div>
          <h2 className="text-base font-bold text-[#F8FAFC]">Storage Vault & Export Defaults</h2>
          <p className="text-xs text-[#64748B]">Object storage allocation, client cache quota, retention lifecycles, and export format defaults.</p>
        </div>
      </div>

      {/* Storage Status & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Object Storage Status */}
        <div className="bg-[#07090E] p-4 rounded-xl border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#38BDF8]" />
              Object Storage Bucket
            </span>
            <span className="inline-flex items-center gap-1 text-[#10B981] font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              ONLINE
            </span>
          </div>
          <p className="text-xs font-mono text-[#F8FAFC] truncate">{settings.objectStorageStatus}</p>
          <p className="text-[11px] text-[#64748B]">MinIO S3-compatible enterprise storage vault.</p>
        </div>

        {/* Local Cache Usage */}
        <div className="bg-[#07090E] p-4 rounded-xl border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8]">Browser Client Cache Usage</span>
            <span className="text-[#38BDF8] font-bold">
              {settings.localCacheUsedGB.toFixed(1)} GB / {settings.localCacheMaxGB.toFixed(1)} GB ({cachePercent}%)
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#1E293B] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                cachePercent > 85 ? 'bg-[#EF4444]' : cachePercent > 60 ? 'bg-[#F59E0B]' : 'bg-[#38BDF8]'
              }`}
              style={{ width: `${cachePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
            <span>Point Cloud & Tiles Buffer</span>
            <span>Allocated Quota</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Retention Policy */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Product Retention Lifecycle</label>
          <select
            value={settings.productRetentionDays}
            onChange={(e) => onChange({ productRetentionDays: parseInt(e.target.value, 10) })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="30">30 Days (Automated Cleanup)</option>
            <option value="90">90 Days (Quarterly Retention Standard)</option>
            <option value="365">365 Days (Annual Archive)</option>
            <option value="0">Indefinite / Perpetual Retention</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Auto-purge interval for temporary reconstruction intermediate files.</p>
        </div>

        {/* Default Export CRS */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Default Export Projection (CRS)</label>
          <select
            value={settings.defaultExportCrs}
            onChange={(e) => onChange({ defaultExportCrs: e.target.value })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="EPSG:32643 (UTM 43N)">EPSG:32643 (UTM Zone 43N - Projected)</option>
            <option value="EPSG:4326 (WGS 84)">EPSG:4326 (WGS 84 - Geographic)</option>
            <option value="EPSG:3857 (Web Mercator)">EPSG:3857 (Web Mercator)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Target coordinate system pre-selected in Export Center download modal.</p>
        </div>

        {/* Default Point Cloud Format */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8] flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-[#818CF8]" />
            Default 3D Point Cloud Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['.LAZ', '.LAS', '.PLY'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onChange({ defaultPointCloudFormat: fmt })}
                className={`py-2 px-3 rounded font-mono text-xs border text-center transition-colors ${
                  settings.defaultPointCloudFormat === fmt
                    ? 'bg-[#818CF8]/20 border-[#818CF8] text-[#818CF8] font-bold'
                    : 'bg-[#07090E] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">.LAZ provides lossless compression; .LAS offers universal GIS software compatibility.</p>
        </div>

        {/* Default Raster Format */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">Default Raster Orthophoto Format</label>
          <div className="grid grid-cols-2 gap-2">
            {(['.GeoTIFF', '.PNG'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onChange({ defaultRasterFormat: fmt })}
                className={`py-2 px-3 rounded font-mono text-xs border text-center transition-colors ${
                  settings.defaultRasterFormat === fmt
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold'
                    : 'bg-[#07090E] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">.GeoTIFF embeds geo-referencing tags; .PNG is lightweight for quick preview.</p>
        </div>

        {/* Compression Preference */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[#94A3B8]">GeoTIFF Compression Preference</label>
          <select
            value={settings.compressionPreference}
            onChange={(e) => onChange({ compressionPreference: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#07090E] border border-[#1E293B] rounded-lg text-[#F8FAFC] font-mono focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="LZW">LZW Lossless Compression (Recommended)</option>
            <option value="DEFLATE">DEFLATE High Compression Ratio</option>
            <option value="NONE">Uncompressed Raw File (Fastest Export)</option>
          </select>
          <p className="text-[11px] text-[#64748B]">Compression algorithm applied during orthomosaic and DEM export building.</p>
        </div>

        {/* Auto Product Validation Switch */}
        <div className="space-y-1.5 flex flex-col justify-end">
          <div className="flex items-center justify-between p-3 bg-[#07090E] rounded-lg border border-[#1E293B]">
            <div className="space-y-0.5">
              <span className="font-mono font-semibold text-[#F8FAFC] text-xs">Automatic Checksum Validation</span>
              <p className="text-[10px] text-[#64748B]">Calculate SHA-256 checksums on all exported files.</p>
            </div>
            <button
              onClick={() => onChange({ autoProductValidation: !settings.autoProductValidation })}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                settings.autoProductValidation ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#07090E] transition-transform transform ${
                  settings.autoProductValidation ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
