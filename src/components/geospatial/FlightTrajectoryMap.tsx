// ============================================================
// AERIS — FlightTrajectoryMap
// SVG placeholder for the mission flight path visualisation
//
// Responsibilities (this component, SVG):
//   - Display lawnmower survey trajectory
//   - Show takeoff, current UAV position, landing
//   - Show survey coverage bounding box
//   - Animate UAV position
//
// Future (Cesium will replace this component entirely):
//   - Real geographic coordinates
//   - Terrain mesh
//   - GIS layers
//   - Full 3D flight path
// ============================================================

import type { TrajectoryPoint } from '../../types/telemetry';

interface Props {
  trajectory: TrajectoryPoint[];
  currentPosition: TrajectoryPoint;
  missionName: string;
}

function normalise(points: TrajectoryPoint[]) {
  const lats = points.map((p) => p.lat);
  const lons = points.map((p) => p.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const latSpan = maxLat - minLat || 1;
  const lonSpan = maxLon - minLon || 1;

  const pad = 24;
  const W = 340 - pad * 2;
  const H = 200 - pad * 2;

  function project(lat: number, lon: number) {
    const x = pad + ((lon - minLon) / lonSpan) * W;
    const y = pad + (1 - (lat - minLat) / latSpan) * H;
    return { x, y };
  }

  return { project, minLat, maxLat, minLon, maxLon };
}

export function FlightTrajectoryMap({ trajectory, currentPosition, missionName }: Props) {
  const { project } = normalise([...trajectory, currentPosition]);

  // Build polyline points string (skip takeoff/land alt=0 for path)
  const flightPoints = trajectory.filter((p) => p.alt > 0);
  const polylineStr = flightPoints
    .map((p) => {
      const { x, y } = project(p.lat, p.lon);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const takeoff = trajectory[0];
  const to = project(takeoff.lat, takeoff.lon);
  const cur = project(currentPosition.lat, currentPosition.lon);

  // Survey bounding box
  const surveyPts = flightPoints.map((p) => project(p.lat, p.lon));
  const bxMin = Math.min(...surveyPts.map((p) => p.x)) - 2;
  const bxMax = Math.max(...surveyPts.map((p) => p.x)) + 2;
  const byMin = Math.min(...surveyPts.map((p) => p.y)) - 2;
  const byMax = Math.max(...surveyPts.map((p) => p.y)) + 2;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
      role="img"
      aria-label={`Flight trajectory map for ${missionName}. This is a schematic SVG representation. Cesium will provide the real geographic view in the Geospatial module.`}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border-base)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Flight Trajectory
          </span>
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-base)',
              borderRadius: 2,
              padding: '1px 5px',
              letterSpacing: '0.06em',
            }}
          >
            SCHEMATIC
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          23.8765° N  70.4321° E
        </span>
      </div>

      {/* SVG canvas */}
      <svg
        width="100%"
        viewBox="0 0 340 200"
        style={{ display: 'block', background: '#0C1018' }}
        aria-hidden="true"
      >
        {/* Subtle grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30,40,58,0.8)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="340" height="200" fill="url(#grid)" />

        {/* Survey bounding box */}
        <rect
          x={bxMin} y={byMin}
          width={bxMax - bxMin} height={byMax - byMin}
          fill="rgba(14,165,233,0.04)"
          stroke="rgba(14,165,233,0.18)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />

        {/* Flight path polyline */}
        <polyline
          points={polylineStr}
          fill="none"
          stroke="rgba(14,165,233,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Completed path (first portion, up to current waypoint) */}
        <polyline
          points={flightPoints
            .slice(0, 7) // completed portion
            .map((p) => {
              const { x, y } = project(p.lat, p.lon);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ')}
          fill="none"
          stroke="rgba(5,150,105,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Takeoff marker */}
        <circle cx={to.x} cy={to.y} r="5" fill="var(--status-success)" fillOpacity="0.8" />
        <text x={to.x + 7} y={to.y + 4} fill="rgba(100,200,140,0.9)" fontSize="9" fontFamily="JetBrains Mono, monospace">TKOF</text>

        {/* Current UAV position */}
        {/* Outer pulse ring */}
        <circle cx={cur.x} cy={cur.y} r="9" fill="rgba(14,165,233,0.1)" stroke="rgba(14,165,233,0.3)" strokeWidth="1">
          <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Inner dot */}
        <circle cx={cur.x} cy={cur.y} r="4" fill="var(--accent-primary)" />
        {/* UAV icon triangle */}
        <polygon
          points={`${cur.x},${cur.y - 4} ${cur.x - 3},${cur.y + 3} ${cur.x + 3},${cur.y + 3}`}
          fill="white"
          fillOpacity="0.9"
          transform={`rotate(274, ${cur.x}, ${cur.y})`}
        />

        {/* UAV label */}
        <text x={cur.x + 8} y={cur.y - 2} fill="rgba(14,165,233,0.9)" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">UAV</text>
        <text x={cur.x + 8} y={cur.y + 8} fill="rgba(100,130,180,0.7)" fontSize="8" fontFamily="JetBrains Mono, monospace">142.5m</text>

        {/* Cardinal labels */}
        <text x="4"   y="10"  fill="rgba(74,97,128,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace">N</text>
        <text x="4"   y="196" fill="rgba(74,97,128,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace">S</text>
        <text x="327" y="10"  fill="rgba(74,97,128,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace">E</text>
        <text x="4"   y="104" fill="rgba(74,97,128,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace">W</text>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: '7px 14px',
          borderTop: '1px solid var(--border-base)',
          fontSize: 10,
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 16, height: 2, background: 'rgba(5,150,105,0.7)', borderRadius: 1 }} />
          Completed
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 16, height: 2, background: 'rgba(14,165,233,0.55)', borderRadius: 1 }} />
          Remaining
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, background: 'var(--accent-primary)', borderRadius: '50%' }} />
          UAV
        </div>
        <div style={{ marginLeft: 'auto', fontStyle: 'italic' }}>
          Schematic — Cesium replaces this in Geospatial module
        </div>
      </div>
    </div>
  );
}
