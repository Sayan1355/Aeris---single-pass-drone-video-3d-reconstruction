// ============================================================
// AERIS — Phase 6 Export Modal / Dialog Component
// Premium aerospace export dialog with configuration & progress simulation
// ============================================================

import React, { useState } from 'react';
import { X, DownloadSimple, CheckCircle, Spinner } from '@phosphor-icons/react';
import type { ProductAsset } from '../types';

interface ExportModalProps {
  asset: ProductAsset | null;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  const [selectedFormat, setSelectedFormat] = useState<string>(asset.availableFormats[0] || asset.format);
  const [selectedCrs, setSelectedCrs] = useState<string>('EPSG:32643 (UTM Zone 43N)');
  const [selectedRes, setSelectedRes] = useState<string>('Native Full Resolution (2.1 cm/px)');
  const [compression, setCompression] = useState<string>('deflate');
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(true);

  const [exporting, setExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleStartExport = () => {
    setExporting(true);
    setProgress(0);
    setCompleted(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setExporting(false);
        setCompleted(true);
      }
      setProgress(current);
    }, 180);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 0 30px rgba(14,165,233,0.15), var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'var(--bg-header)',
            borderBottom: '1px solid var(--border-base)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <DownloadSimple size={20} color="var(--accent-primary)" />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                EXPORT PRODUCT ASSET
              </h3>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {asset.name} ({asset.shortCode})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Form */}
        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Target Format */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
              EXPORT FORMAT
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              disabled={exporting}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                outline: 'none',
              }}
            >
              {asset.availableFormats.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt}
                </option>
              ))}
            </select>
          </div>

          {/* Coordinate Reference System */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
              COORDINATE REFERENCE SYSTEM (CRS)
            </label>
            <select
              value={selectedCrs}
              onChange={(e) => setSelectedCrs(e.target.value)}
              disabled={exporting}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                outline: 'none',
              }}
            >
              <option value="EPSG:32643 (UTM Zone 43N)">EPSG:32643 — UTM Zone 43N (Native Mission)</option>
              <option value="EPSG:4326 (WGS 84)">EPSG:4326 — WGS 84 (Global Geographic)</option>
              <option value="EPSG:3857 (Web Mercator)">EPSG:3857 — Web Mercator Auxiliary</option>
            </select>
          </div>

          {/* Resolution / Quality Sampling */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
              SAMPLING / RESOLUTION LEVEL
            </label>
            <select
              value={selectedRes}
              onChange={(e) => setSelectedRes(e.target.value)}
              disabled={exporting}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                outline: 'none',
              }}
            >
              <option value="Native Full Resolution (2.1 cm/px)">Native Full Resolution ({asset.size})</option>
              <option value="50% Resampled (~4.2 cm/px)">50% Resampled (~{Math.round(asset.sizeBytes / 2000000)} MB)</option>
              <option value="25% Lightweight Preview">25% Preview Grid</option>
            </select>
          </div>

          {/* Compression & Checkboxes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                COMPRESSION
              </label>
              <select
                value={compression}
                onChange={(e) => setCompression(e.target.value)}
                disabled={exporting}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-base)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 10px',
                  color: 'var(--text-primary)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
              >
                <option value="deflate">DEFLATE / LZW</option>
                <option value="draco">Draco 3D Mesh</option>
                <option value="none">Uncompressed</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 18 }}>
              <input
                type="checkbox"
                id="incMeta"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                disabled={exporting}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="incMeta" style={{ fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                Include XML / JSON metadata
              </label>
            </div>
          </div>

          {/* Progress / Completed State Banner */}
          {exporting && (
            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                <span style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Spinner size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  PACKAGING &amp; CHECKSUM VERIFICATION...
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{progress}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--accent-primary)',
                    transition: 'width 0.15s ease-out',
                  }}
                />
              </div>
            </div>
          )}

          {completed && (
            <div
              style={{
                background: 'rgba(5,150,105,0.12)',
                border: '1px solid rgba(5,150,105,0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--status-success)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={18} weight="fill" />
                <span>EXPORT COMPLETE — READY FOR LOCAL DOWNLOAD</span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>sha256 verified</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-base)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 16px',
              fontSize: 12,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {completed ? 'CLOSE' : 'CANCEL'}
          </button>

          {!completed ? (
            <button
              onClick={handleStartExport}
              disabled={exporting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                color: '#07090E',
                cursor: exporting ? 'not-allowed' : 'pointer',
                opacity: exporting ? 0.7 : 1,
              }}
            >
              <DownloadSimple size={16} weight="bold" />
              <span>{exporting ? 'EXPORTING...' : 'EXPORT ASSET'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                alert(`Simulated download for ${asset.name} (${selectedFormat}) complete.`);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--status-success)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <DownloadSimple size={16} weight="bold" />
              <span>SAVE FILE TO DISK</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
