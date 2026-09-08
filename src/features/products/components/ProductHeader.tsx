// ============================================================
// AERIS — Phase 6 Product Header Component
// Mission context, status badge, compact selector & telemetry meta
// ============================================================

import React from 'react';
import { Package, CheckCircle, Clock, ShieldCheck, CaretDown } from '@phosphor-icons/react';
import { useAppStore } from '../../../stores/useAppStore';

export const ProductHeader: React.FC = () => {
  const { activeMission, missions, setActiveMission } = useAppStore();

  const currentMission = activeMission || {
    id: 'AERIS-MSN-0247',
    name: 'Industrial Harbor Facility Survey',
    site: 'Sector 4B — Coastal Terminal',
    date: '2026-09-08',
  };

  return (
    <header
      style={{
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-base)',
        padding: '14px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Title & Subtitle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(14,165,233,0.12)',
            border: '1px solid rgba(14,165,233,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(14,165,233,0.15)',
          }}
        >
          <Package size={24} weight="duotone" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              MISSION PRODUCTS
            </h1>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
                background: 'rgba(14,165,233,0.12)',
                border: '1px solid rgba(14,165,233,0.3)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              EXPORT CENTER
            </span>
          </div>
          <p
            style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              margin: '3px 0 0 0',
              fontWeight: 400,
            }}
          >
            Generated spatial intelligence from the AERIS reconstruction pipeline.
          </p>
        </div>
      </div>

      {/* Mission Meta & Selectors */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {/* Mission Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            MISSION ID
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={currentMission.id}
              onChange={(e) => {
                const found = missions.find((m) => m.id === e.target.value);
                if (found) setActiveMission(found);
              }}
              style={{
                appearance: 'none',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '5px 28px 5px 10px',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {missions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id} — {m.name}
                </option>
              ))}
            </select>
            <CaretDown
              size={12}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            STATUS
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(5,150,105,0.12)',
              border: '1px solid rgba(5,150,105,0.3)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--status-success)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <CheckCircle size={14} weight="fill" />
            <span>PRODUCTS READY</span>
          </div>
        </div>

        {/* Processing State */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            PROCESSING
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-primary)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={14} />
            <span>COMPLETE</span>
          </div>
        </div>

        {/* Timestamp */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            LAST UPDATED
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Clock size={13} />
            <span>2026-09-08 21:30:00 UTC</span>
          </div>
        </div>
      </div>
    </header>
  );
};
