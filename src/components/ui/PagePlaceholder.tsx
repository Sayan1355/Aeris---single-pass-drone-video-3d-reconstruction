// ============================================================
// AERIS — Page Placeholder Component
// Used for pages not yet implemented in Phase 1
// ============================================================

import {
  Cube,
  Wrench,
  ArrowRight,
} from '@phosphor-icons/react';

interface PagePlaceholderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  module: string;
}

export function PagePlaceholder({ icon, title, subtitle, module }: PagePlaceholderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 20,
        userSelect: 'none',
      }}
      role="main"
      aria-label={`${title} — Coming in next phase`}
    >
      {/* Icon container */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(14,165,233,0.08)',
          border: '1px solid rgba(14,165,233,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-primary)',
          opacity: 0.8,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div
          style={{
            fontSize: 9,
            color: 'var(--text-muted)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          MODULE — {module}
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Phase label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
        }}
        aria-label="Planned for Phase 2"
      >
        <Wrench size={14} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          Planned for Phase 2 implementation
        </span>
        <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
      </div>

      {/* Grid lines — purely decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(30,40,58,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,40,58,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </div>
  );
}

// ---- Page exports ----

export function MissionHubPage() {
  return (
    <PagePlaceholder
      icon={<Cube size={28} />}
      title="Mission Hub"
      subtitle="Launch new missions, review active operations, and access quick-start tools for your UAV reconstruction workflow."
      module="01 — MISSION HUB"
    />
  );
}
