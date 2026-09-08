// ============================================================
// AERIS — Phase 8 Primary Flight Map Viewport Component
// Real-time flight trajectory, UAV position, heading arrow, & survey boundary
// ============================================================

import React, { useState } from 'react';
import { Target } from '@phosphor-icons/react';
import type { LiveTelemetryData } from '../types';
import { SURVEY_WAYPOINTS } from '../data/mockTelemetry';

interface FlightMapViewportProps {
  telemetry: LiveTelemetryData;
}

export const FlightMapViewport: React.FC<FlightMapViewportProps> = ({ telemetry }) => {
  const [followUav, setFollowUav] = useState<boolean>(true);
  const [showCoverage, setShowCoverage] = useState<boolean>(true);
  const [showTrajectory, setShowTrajectory] = useState<boolean>(true);

  // Normalize waypoints for SVG rendering
  const minLat = 22.568;
  const maxLat = 22.577;
  const minLon = 88.355;
  const maxLon = 88.373;

  const project = (lat: number, lon: number) => {
    const x = ((lon - minLon) / (maxLon - minLon)) * 600 + 40;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 280 + 30;
    return { x, y };
  };

  const uavPos = project(telemetry.latitude, telemetry.longitude);

  const completedPointsStr = SURVEY_WAYPOINTS.filter((w) => w.isCompleted)
    .map((w) => {
      const p = project(w.lat, w.lon);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(' ');

  const plannedPointsStr = SURVEY_WAYPOINTS.map((w) => {
    const p = project(w.lat, w.lon);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '360px',
        background: '#06090F',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-panel)',
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Trajectory Map Container */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 680 340"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Survey Boundary Polygon */}
        {showCoverage && (
          <rect
            x="40"
            y="30"
            width="600"
            height="280"
            fill="rgba(14,165,233,0.05)"
            stroke="rgba(14,165,233,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Planned Flight Path Line */}
        {showTrajectory && (
          <polyline
            points={plannedPointsStr}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Completed Trajectory Line */}
        {showTrajectory && (
          <polyline
            points={completedPointsStr}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2.5"
          />
        )}

        {/* Waypoint Dots */}
        {SURVEY_WAYPOINTS.map((w) => {
          const pt = project(w.lat, w.lon);
          return (
            <circle
              key={w.seq}
              cx={pt.x}
              cy={pt.y}
              r={w.isCompleted ? 3 : 2}
              fill={w.isCompleted ? 'var(--accent-primary)' : 'var(--text-muted)'}
            />
          );
        })}

        {/* Moving UAV Position Marker with Heading Vector */}
        <g transform={`translate(${uavPos.x}, ${uavPos.y})`}>
          {/* Animated Pulsing Ring */}
          <circle r="16" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.4)" strokeWidth="1">
            <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Orientation Heading Arrow */}
          <g transform={`rotate(${telemetry.heading})`}>
            <polygon points="0,-12 7,8 0,4 -7,8" fill="var(--accent-primary)" stroke="#07090E" strokeWidth="1" />
          </g>
        </g>
      </svg>

      {/* Top Left: Map Controls */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          background: 'rgba(12, 16, 24, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          display: 'flex',
          gap: 6,
        }}
      >
        <button
          onClick={() => setFollowUav(!followUav)}
          style={{
            padding: '5px 10px',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            borderRadius: 'var(--radius-xs)',
            border: followUav ? '1px solid var(--accent-primary)' : '1px solid transparent',
            background: followUav ? 'rgba(14,165,233,0.18)' : 'transparent',
            color: followUav ? 'var(--text-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Target size={13} />
          <span>FOLLOW UAV</span>
        </button>

        <button
          onClick={() => setShowTrajectory(!showTrajectory)}
          style={{
            padding: '5px 10px',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            borderRadius: 'var(--radius-xs)',
            border: showTrajectory ? '1px solid var(--border-accent)' : '1px solid transparent',
            background: showTrajectory ? 'rgba(14,165,233,0.1)' : 'transparent',
            color: showTrajectory ? 'var(--text-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          TRAJECTORY
        </button>

        <button
          onClick={() => setShowCoverage(!showCoverage)}
          style={{
            padding: '5px 10px',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            borderRadius: 'var(--radius-xs)',
            border: showCoverage ? '1px solid var(--border-accent)' : '1px solid transparent',
            background: showCoverage ? 'rgba(14,165,233,0.1)' : 'transparent',
            color: showCoverage ? 'var(--text-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          COVERAGE
        </button>
      </div>

      {/* Top Right: Real-time Coordinates Badge */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          background: 'rgba(12, 16, 24, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 12px',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-primary)',
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>POSITION: </span>
        <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>
          {telemetry.latitude.toFixed(4)}° N, {telemetry.longitude.toFixed(4)}° E
        </span>
      </div>

      {/* Bottom Overlay Info Strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          right: 12,
          zIndex: 10,
          background: 'rgba(12, 16, 24, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <span>
            <span style={{ color: 'var(--text-muted)' }}>SURVEY CORRIDOR: </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>12.8 ha</span>
          </span>
          <span>
            <span style={{ color: 'var(--text-muted)' }}>CRS: </span>
            <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>EPSG:32643 (UTM 43N)</span>
          </span>
        </div>

        <div style={{ color: 'var(--text-muted)' }}>
          SURVEY PATTERN: LAWNMOWER GRID (CROSS-OVERLAP 80%)
        </div>
      </div>
    </div>
  );
};
