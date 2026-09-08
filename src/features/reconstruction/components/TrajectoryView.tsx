// ============================================================
// AERIS — Camera Trajectory / Pose View
// SVG-based compact flight path + camera pose visualization
// Clean component boundary — future Cesium replaces this
// ============================================================

import { useMemo } from 'react';
import { CAMERA_POSES } from '../data';
import { useReconStore } from '../hooks/useReconStore';

const W = 300, H = 180;

// Lawnmower waypoints (normalised to SVG canvas)
const TRAJECTORY_PTS = Array.from({ length: 12 }, (_, i) => {
  const row = Math.floor(i / 2);
  const goRight = row % 2 === 0;
  const x = goRight ? (i % 2 === 0 ? 16 : W - 16) : (i % 2 === 0 ? W - 16 : 16);
  const y = 16 + row * ((H - 32) / 5);
  return { x, y };
});

// Build smooth path string
function buildPath(pts: { x: number; y: number }[]) {
  return pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    return `${acc} L ${p.x} ${p.y}`;
  }, '');
}

// Camera pose icon (simplified frustum)
function CamIcon({ x, y, accepted }: { x: number; y: number; accepted: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <polygon
        points="0,-3 -3,3 3,3"
        fill={accepted ? 'rgba(14,165,233,0.7)' : 'rgba(220,38,38,0.5)'}
        stroke={accepted ? 'rgba(14,165,233,0.3)' : 'rgba(220,38,38,0.3)'}
        strokeWidth={0.5}
      />
    </g>
  );
}

export function TrajectoryView() {
  const { showCameraPoses, toggleCameraPoses, currentFrame, totalFrames } = useReconStore();

  // UAV position on trajectory (based on frame progress)
  const progress = currentFrame / totalFrames;
  const segCount = TRAJECTORY_PTS.length - 1;
  const segIdx = Math.min(Math.floor(progress * segCount), segCount - 1);
  const segT = (progress * segCount) - segIdx;
  const p0 = TRAJECTORY_PTS[segIdx];
  const p1 = TRAJECTORY_PTS[Math.min(segIdx + 1, TRAJECTORY_PTS.length - 1)];
  const uavX = p0.x + (p1.x - p0.x) * segT;
  const uavY = p0.y + (p1.y - p0.y) * segT;

  const pathD = useMemo(() => buildPath(TRAJECTORY_PTS), []);

  // Coverage fill — completed portion
  const completedPts = TRAJECTORY_PTS.slice(0, segIdx + 2);
  const completedPath = buildPath(completedPts);

  // Accepted poses subset
  const acceptedCount = CAMERA_POSES.filter(p => p.accepted).length;
  const totalCount = CAMERA_POSES.length;

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="region"
      aria-label="Camera trajectory and pose view — schematic SVG. Future Cesium integration replaces this."
    >
      {/* Header */}
      <div style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-base)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Camera Trajectory
        </span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border-base)', borderRadius: 2, padding: '1px 5px', letterSpacing: '0.06em' }}>
            SCHEMATIC
          </span>
          <button
            className="btn btn-ghost"
            onClick={toggleCameraPoses}
            aria-pressed={showCameraPoses}
            style={{ fontSize: 10, padding: '2px 7px' }}
          >
            {showCameraPoses ? 'Hide' : 'Show'} Poses
          </button>
        </div>
      </div>

      {/* SVG map */}
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ background: '#0A0F18', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="tgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30,40,58,0.7)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#tgrid)" />

        {/* Survey boundary */}
        <rect x={10} y={10} width={W - 20} height={H - 20}
          fill="rgba(14,165,233,0.03)"
          stroke="rgba(217,119,6,0.3)"
          strokeWidth={1}
          strokeDasharray="5 4"
        />

        {/* Camera poses (triangles) */}
        {showCameraPoses && CAMERA_POSES.map((p) => (
          <CamIcon key={p.id} x={p.x} y={p.y} accepted={p.accepted} />
        ))}

        {/* Full trajectory (grey) */}
        <path d={pathD} fill="none" stroke="rgba(74,97,128,0.3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Completed portion (cyan) */}
        <path d={completedPath} fill="none" stroke="rgba(5,150,105,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* Waypoint dots */}
        {TRAJECTORY_PTS.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r={2.5}
            fill={i <= segIdx ? 'var(--status-success)' : 'rgba(74,97,128,0.4)'}
            stroke="none"
          />
        ))}

        {/* UAV position */}
        <circle cx={uavX} cy={uavY} r={7} fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.4)" strokeWidth={1}>
          <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={uavX} cy={uavY} r={3.5} fill="var(--accent-primary)" />
        <text x={uavX + 8} y={uavY - 4} fill="rgba(14,165,233,0.9)" fontSize={8} fontFamily="JetBrains Mono, monospace" fontWeight="600">
          UAV
        </text>

        {/* Cardinal marks */}
        <text x={W/2 - 4} y={9} fill="rgba(74,97,128,0.5)" fontSize={7} fontFamily="JetBrains Mono, monospace">N</text>
        <text x={W/2 - 4} y={H - 2} fill="rgba(74,97,128,0.5)" fontSize={7} fontFamily="JetBrains Mono, monospace">S</text>
        <text x={2} y={H/2 + 3} fill="rgba(74,97,128,0.5)" fontSize={7} fontFamily="JetBrains Mono, monospace">W</text>
        <text x={W - 10} y={H/2 + 3} fill="rgba(74,97,128,0.5)" fontSize={7} fontFamily="JetBrains Mono, monospace">E</text>
      </svg>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: 14, padding: '6px 10px', borderTop: '1px solid var(--border-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: 'var(--text-muted)' }}>Poses: <span style={{ color: 'var(--accent-primary)' }}>{acceptedCount}</span><span style={{ color: 'var(--text-muted)' }}>/{totalCount}</span></span>
        <span style={{ color: 'var(--text-muted)' }}>Rejected: <span style={{ color: 'var(--status-error)' }}>{totalCount - acceptedCount}</span></span>
        <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {((currentFrame / totalFrames) * 100).toFixed(0)}% complete
        </span>
      </div>
    </div>
  );
}
