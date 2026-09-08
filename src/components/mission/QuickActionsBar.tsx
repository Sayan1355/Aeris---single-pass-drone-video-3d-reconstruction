// ============================================================
// AERIS — QuickActionsBar
// Module-access shortcuts for the Mission Hub
// ============================================================

import { useNavigate } from 'react-router-dom';
import {
  Waves,
  Cpu,
  Cube,
  Globe,
  Package,
  CheckSquare,
  ArrowRight,
} from '@phosphor-icons/react';

interface Action {
  to: string;
  icon: React.ReactNode;
  label: string;
  shortDesc: string;
  highlight?: boolean;
}

const ACTIONS: Action[] = [
  {
    to: '/telemetry',
    icon: <Waves size={18} />,
    label: 'Live Telemetry',
    shortDesc: 'GPS, IMU, battery, video',
  },
  {
    to: '/pipeline',
    icon: <Cpu size={18} />,
    label: 'Reconstruction',
    shortDesc: '8-stage pipeline · Stage 5 LIVE',
    highlight: true,
  },
  {
    to: '/digital-twin',
    icon: <Cube size={18} />,
    label: '3D Digital Twin',
    shortDesc: 'Mesh · point cloud · splats',
  },
  {
    to: '/geospatial',
    icon: <Globe size={18} />,
    label: 'Geospatial',
    shortDesc: 'Cesium globe · GIS layers',
  },
  {
    to: '/products',
    icon: <Package size={18} />,
    label: 'Products',
    shortDesc: 'OBJ · LAS · GeoTIFF · PDF',
  },
  {
    to: '/qa',
    icon: <CheckSquare size={18} />,
    label: 'QA / Accuracy',
    shortDesc: 'Reprojection · GSD · heatmaps',
  },
];

export function QuickActionsBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 8,
      }}
      role="navigation"
      aria-label="Quick access to modules"
    >
      {ACTIONS.map((action) => (
        <button
          key={action.to}
          onClick={() => navigate(action.to)}
          aria-label={`Open ${action.label}`}
          style={{
            background: action.highlight ? 'rgba(14,165,233,0.08)' : 'var(--bg-card)',
            border: `1px solid ${action.highlight ? 'rgba(14,165,233,0.22)' : 'var(--border-base)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 6,
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast), background var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = action.highlight ? 'rgba(14,165,233,0.22)' : 'var(--border-base)';
            (e.currentTarget as HTMLElement).style.background = action.highlight ? 'rgba(14,165,233,0.08)' : 'var(--bg-card)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span
              style={{ color: action.highlight ? 'var(--accent-primary)' : 'var(--text-muted)', display: 'flex' }}
              aria-hidden="true"
            >
              {action.icon}
            </span>
            <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
            {action.label}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {action.shortDesc}
          </div>
        </button>
      ))}
    </div>
  );
}
