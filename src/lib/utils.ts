// ============================================================
// AERIS — Utility Helpers
// ============================================================

import type { ConnectionState } from '../types/telemetry';
import type { MissionStatus } from '../types/mission';
import type { PipelineStageStatus } from '../types/reconstruction';

// ---- Time Formatting ----------------------------------------

/** Format a UTC ISO string to YYYY-MM-DD HH:MM UTC */
export function formatUTC(iso: string): string {
  return new Date(iso).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

/** Format elapsed milliseconds as Hh Mm Ss */
export function formatDuration(ms: number): string {
  const totalS = Math.floor(ms / 1000);
  const h = Math.floor(totalS / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, '0')}s`;
  return `${s}s`;
}

/** Format an ISO timestamp as a relative time label */
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}

/** Format a short time HH:MM from ISO */
export function formatTime(iso: string): string {
  return new Date(iso).toISOString().slice(11, 16);
}

// ---- Coordinate Formatting ----------------------------------

export function formatLat(v: number): string {
  return `${Math.abs(v).toFixed(4)}° ${v >= 0 ? 'N' : 'S'}`;
}

export function formatLon(v: number): string {
  return `${Math.abs(v).toFixed(4)}° ${v >= 0 ? 'E' : 'W'}`;
}

// ---- Numeric Formatting -------------------------------------

export function formatGB(gb: number): string {
  return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(gb * 1024).toFixed(0)} MB`;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

// ---- CSS Class Derivation -----------------------------------

/** Status dot class for a connection state */
export function connectionDotClass(state: ConnectionState): string {
  switch (state) {
    case 'connected':    return 'dot-success';
    case 'connecting':   return 'dot-active status-blink';
    case 'degraded':     return 'dot-warning status-pulse';
    case 'disconnected': return 'dot-offline';
  }
}

/** Short label for a connection state */
export function connectionLabel(state: ConnectionState): string {
  switch (state) {
    case 'connected':    return 'OK';
    case 'connecting':   return 'CONN…';
    case 'degraded':     return 'DEGRADED';
    case 'disconnected': return 'OFFLINE';
  }
}

/** Color for a connection state */
export function connectionColor(state: ConnectionState): string {
  switch (state) {
    case 'connected':    return 'var(--status-success)';
    case 'connecting':   return 'var(--status-active)';
    case 'degraded':     return 'var(--status-warning)';
    case 'disconnected': return 'var(--status-error)';
  }
}

/** Badge class for a mission status */
export function missionStatusBadgeClass(status: MissionStatus): string {
  switch (status) {
    case 'active':      return 'badge-active';
    case 'processing':  return 'badge-active';
    case 'completed':   return 'badge-success';
    case 'failed':      return 'badge-error';
    case 'planning':    return 'badge-warning';
    case 'queued':      return 'badge-warning';
    default:            return 'badge-idle';
  }
}

/** Badge class for a pipeline stage status */
export function stageStatusBadgeClass(status: PipelineStageStatus): string {
  switch (status) {
    case 'running':   return 'badge-active';
    case 'completed': return 'badge-success';
    case 'failed':    return 'badge-error';
    case 'skipped':   return 'badge-warning';
    default:          return 'badge-idle';
  }
}

/** Dot class for a pipeline stage status */
export function stageDotStyle(status: PipelineStageStatus): string {
  switch (status) {
    case 'running':   return 'dot-active status-blink';
    case 'completed': return 'dot-success';
    case 'failed':    return 'dot-error';
    case 'skipped':   return 'dot-warning';
    default:          return 'dot-idle';
  }
}

/** Background color for pipeline stage bar segment */
export function stageBarColor(status: PipelineStageStatus): string {
  switch (status) {
    case 'running':   return 'var(--status-active)';
    case 'completed': return 'var(--status-success)';
    case 'failed':    return 'var(--status-error)';
    default:          return 'var(--border-strong)';
  }
}
