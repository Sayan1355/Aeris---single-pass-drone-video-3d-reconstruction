// ============================================================
// AERIS — App State Store (Zustand)
// ============================================================

import { create } from 'zustand';
import type { Mission, ActivityEntry } from '../types/mission';
import type { TelemetrySnapshot, TrajectoryPoint, SystemHealth } from '../types/telemetry';
import type { PipelineStage } from '../types/reconstruction';

import { MOCK_ACTIVE_MISSION, MOCK_MISSIONS, MOCK_ACTIVITY } from '../data/missions';
import { MOCK_TELEMETRY, MOCK_TRAJECTORY, MOCK_CURRENT_POSITION } from '../data/telemetry';
import { MOCK_PIPELINE_STAGES } from '../data/pipeline';
import { MOCK_SYSTEM_HEALTH } from '../data/system';

interface AppState {
  // Navigation
  navCollapsed: boolean;
  setNavCollapsed: (v: boolean) => void;
  toggleNav: () => void;

  // Missions
  activeMission: Mission | null;
  setActiveMission: (m: Mission | null) => void;
  missions: Mission[];
  setMissions: (m: Mission[]) => void;

  // Activity
  activity: ActivityEntry[];
  setActivity: (a: ActivityEntry[]) => void;

  // Telemetry
  telemetry: TelemetrySnapshot;
  setTelemetry: (t: TelemetrySnapshot) => void;
  trajectory: TrajectoryPoint[];
  setTrajectory: (t: TrajectoryPoint[]) => void;
  currentPosition: TrajectoryPoint;
  setCurrentPosition: (p: TrajectoryPoint) => void;

  // Pipeline
  pipelineStages: PipelineStage[];
  setPipelineStages: (s: PipelineStage[]) => void;

  // System Health
  systemHealth: SystemHealth;
  setSystemHealth: (h: Partial<SystemHealth>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  navCollapsed: false,
  setNavCollapsed: (v) => set({ navCollapsed: v }),
  toggleNav: () => set((s) => ({ navCollapsed: !s.navCollapsed })),

  // Missions
  activeMission: MOCK_ACTIVE_MISSION,
  setActiveMission: (m) => set({ activeMission: m }),
  missions: MOCK_MISSIONS,
  setMissions: (m) => set({ missions: m }),

  // Activity
  activity: MOCK_ACTIVITY,
  setActivity: (a) => set({ activity: a }),

  // Telemetry
  telemetry: MOCK_TELEMETRY,
  setTelemetry: (t) => set({ telemetry: t }),
  trajectory: MOCK_TRAJECTORY,
  setTrajectory: (t) => set({ trajectory: t }),
  currentPosition: MOCK_CURRENT_POSITION,
  setCurrentPosition: (p) => set({ currentPosition: p }),

  // Pipeline
  pipelineStages: MOCK_PIPELINE_STAGES,
  setPipelineStages: (s) => set({ pipelineStages: s }),

  // System Health
  systemHealth: MOCK_SYSTEM_HEALTH,
  setSystemHealth: (h) => set((prev) => ({ systemHealth: { ...prev.systemHealth, ...h } })),
}));

// ---- Convenience selector hooks ---------------------------

/** Shorthand for the active mission (safe to use in any component) */
export const useActiveMission = () => useAppStore((s) => s.activeMission);
export const useTelemetry = () => useAppStore((s) => s.telemetry);
export const usePipelineStages = () => useAppStore((s) => s.pipelineStages);
export const useSystemHealth = () => useAppStore((s) => s.systemHealth);
export const useActivity = () => useAppStore((s) => s.activity);
export const useTrajectory = () => useAppStore((s) => ({ trajectory: s.trajectory, currentPosition: s.currentPosition }));
