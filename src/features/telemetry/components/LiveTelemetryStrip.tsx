// ============================================================
// AERIS — Phase 8 Live Telemetry Strip Component
// High-visibility operational metrics strip for Altitude, Speed, Heading & Distance
// ============================================================

import React from 'react';
import { NavigationArrow, Compass, Mountains, Gauge, Path } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';

interface LiveTelemetryStripProps {
  telemetry: LiveTelemetryData;
}

export const LiveTelemetryStrip: React.FC<LiveTelemetryStripProps> = ({ telemetry }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 12,
      }}
    >
      {/* 1. Altitude AGL */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
            ALTITUDE AGL
          </span>
          <Mountains size={16} color="var(--accent-primary)" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          {telemetry.altitudeAgl.toFixed(1)} <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>m</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          MSL: {telemetry.altitudeMsl.toFixed(1)} m
        </span>
      </div>

      {/* 2. Ground Speed */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
            GROUND SPEED
          </span>
          <Gauge size={16} color="#38BDF8" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
          {telemetry.groundSpeed.toFixed(1)} <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>m/s</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          { (telemetry.groundSpeed * 3.6).toFixed(1) } km/h
        </span>
      </div>

      {/* 3. Heading */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
            HEADING
          </span>
          <Compass size={16} color="#34D399" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#34D399' }}>
          {telemetry.heading.toString().padStart(3, '0')}°
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          BEARING: EAST-NE
        </span>
      </div>

      {/* 4. Vertical Speed */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
            VERTICAL SPEED
          </span>
          <NavigationArrow size={16} color="#FBBF24" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#FBBF24' }}>
          +{telemetry.verticalSpeed.toFixed(1)} <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>m/s</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--status-success)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          STABLE CLIMB / CRUISE
        </span>
      </div>

      {/* 5. Distance Flown */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
            DISTANCE FLOWN
          </span>
          <Path size={16} color="#A855F7" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          {telemetry.distanceFlownKm.toFixed(2)} <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>km</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          REMAINING: {telemetry.distanceRemainingKm.toFixed(2)} km
        </span>
      </div>
    </div>
  );
};
