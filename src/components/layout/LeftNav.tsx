// ============================================================
// AERIS — Left Navigation Rail
// Fixed sidebar with primary + secondary nav sections
// ============================================================

import { NavLink } from 'react-router-dom';
import {
  SquaresFour,
  PaperPlaneTilt,
  Waves,
  Cpu,
  Cube,
  Globe,
  Package,
  CheckSquare,
  ClockCounterClockwise,
  GearSix,
  CaretDoubleLeft,
  CaretDoubleRight,
} from '@phosphor-icons/react';
import { useAppStore } from '../../stores/useAppStore';
import { MOCK_PIPELINE_STAGES } from '../../data/pipeline';

// Nav item definition
interface NavItemDef {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const PRIMARY_NAV: NavItemDef[] = [
  { to: '/hub',         label: 'Mission Hub',     icon: <SquaresFour size={18} weight="regular" /> },
  { to: '/missions',    label: 'Missions',         icon: <PaperPlaneTilt size={18} weight="regular" /> },
  { to: '/telemetry',   label: 'Live Telemetry',   icon: <Waves size={18} weight="regular" /> },
  { to: '/pipeline',    label: 'Reconstruction',   icon: <Cpu size={18} weight="regular" />, badge: 'LIVE' },
  { to: '/digital-twin', label: '3D Digital Twin', icon: <Cube size={18} weight="regular" /> },
  { to: '/geospatial',  label: 'Geospatial',       icon: <Globe size={18} weight="regular" /> },
  { to: '/products',    label: 'Products',          icon: <Package size={18} weight="regular" /> },
  { to: '/qa',          label: 'QA / Accuracy',    icon: <CheckSquare size={18} weight="regular" /> },
];

const SECONDARY_NAV: NavItemDef[] = [
  { to: '/history',  label: 'Mission History', icon: <ClockCounterClockwise size={16} weight="regular" /> },
  { to: '/settings', label: 'Settings',         icon: <GearSix size={16} weight="regular" /> },
];

// Reusable nav item component
function NavItem({ item, collapsed }: { item: NavItemDef; collapsed: boolean }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        [
          'nav-link',
          isActive ? 'nav-item-active' : '',
        ].filter(Boolean).join(' ')
      }
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: collapsed ? '9px 0' : '9px 14px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        transition: 'background var(--transition-fast), color var(--transition-fast)',
        position: 'relative',
        borderLeft: isActive && !collapsed ? '2px solid var(--accent-primary)' : '2px solid transparent',
        marginLeft: collapsed ? 0 : -2,
        paddingLeft: isActive && !collapsed ? 12 : collapsed ? 0 : 14,
        background: isActive ? 'rgba(14,165,233,0.09)' : 'transparent',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      })}
      title={collapsed ? item.label : undefined}
      aria-label={item.label}
    >
      {({ isActive }) => (
        <>
          <span
            style={{
              color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            {item.icon}
          </span>
          {!collapsed && (
            <>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--status-active)',
                    border: '1px solid rgba(14,165,233,0.35)',
                    borderRadius: 2,
                    padding: '1px 5px',
                    lineHeight: 1.4,
                  }}
                  aria-label={`Status: ${item.badge}`}
                >
                  {item.badge}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
}

export function LeftNav() {
  const { navCollapsed, toggleNav } = useAppStore();

  // Overall pipeline progress indicator
  const completedStages = MOCK_PIPELINE_STAGES.filter((s) => s.status === 'completed').length;
  const totalStages = MOCK_PIPELINE_STAGES.length;

  return (
    <nav
      aria-label="Primary navigation"
      role="navigation"
      style={{
        gridArea: 'nav',
        width: navCollapsed ? 'var(--nav-collapsed)' : 'var(--nav-width)',
        background: 'var(--bg-nav)',
        borderRight: '1px solid var(--border-base)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width var(--transition-slow)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* Primary nav items */}
      <div style={{ flex: 1, padding: navCollapsed ? '8px 8px' : '8px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Section label */}
        {!navCollapsed && (
          <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 600, padding: '8px 14px 4px', textTransform: 'uppercase' }}>
            Workspace
          </div>
        )}

        {PRIMARY_NAV.map((item) => (
          <NavItem key={item.to} item={item} collapsed={navCollapsed} />
        ))}
      </div>

      {/* Pipeline mini-progress */}
      {!navCollapsed && (
        <div
          style={{
            margin: '0 10px 8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-base)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Pipeline
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {completedStages}/{totalStages}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 3, background: 'var(--border-base)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(completedStages / totalStages) * 100}%`,
                background: 'var(--accent-primary)',
                borderRadius: 2,
                transition: 'width 0.4s ease-out',
              }}
              aria-hidden="true"
            />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
            Stage 5 — 3DGS &amp; Dense Recon
          </div>
        </div>
      )}

      {/* Separator */}
      <div style={{ height: 1, background: 'var(--border-base)', margin: '0 10px' }} role="separator" />

      {/* Secondary nav items */}
      <div style={{ padding: navCollapsed ? '8px 8px' : '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!navCollapsed && (
          <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 600, padding: '6px 14px 2px', textTransform: 'uppercase' }}>
            System
          </div>
        )}
        {SECONDARY_NAV.map((item) => (
          <NavItem key={item.to} item={item} collapsed={navCollapsed} />
        ))}
      </div>

      {/* Collapse toggle */}
      <div style={{ padding: '8px 10px', borderTop: '1px solid var(--border-base)' }}>
        <button
          onClick={toggleNav}
          className="btn btn-ghost"
          style={{
            width: '100%',
            justifyContent: navCollapsed ? 'center' : 'flex-start',
            gap: 8,
            padding: '7px 10px',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
          aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          title={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {navCollapsed
            ? <CaretDoubleRight size={15} aria-hidden="true" />
            : <>
                <CaretDoubleLeft size={15} aria-hidden="true" />
                <span>Collapse</span>
              </>
          }
        </button>
      </div>
    </nav>
  );
}
