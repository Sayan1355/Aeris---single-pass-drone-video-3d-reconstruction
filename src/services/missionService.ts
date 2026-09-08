// ============================================================
// AERIS — Mission Service
// Thin adapter layer — swap mock imports for real API/WS calls
// ============================================================

import type { Mission, MissionSummaryStats, ActivityEntry } from '../types/mission';
import type { TelemetrySnapshot, TrajectoryPoint, SystemHealth } from '../types/telemetry';
import type { PipelineStage } from '../types/reconstruction';

import {
  MOCK_ACTIVE_MISSION,
  MOCK_MISSIONS,
  MOCK_SUMMARY_STATS,
  MOCK_ACTIVITY,
} from '../data/missions';
import { MOCK_TELEMETRY, MOCK_TRAJECTORY, MOCK_CURRENT_POSITION } from '../data/telemetry';
import { MOCK_PIPELINE_STAGES } from '../data/pipeline';
import { MOCK_SYSTEM_HEALTH } from '../data/system';

// ---- Missions -----------------------------------------------

/** Fetch the currently active mission. Replace with GET /api/missions/active */
export async function getActiveMission(): Promise<Mission | null> {
  return MOCK_ACTIVE_MISSION;
}

/** Fetch the mission list. Replace with GET /api/missions */
export async function getMissions(): Promise<Mission[]> {
  return MOCK_MISSIONS;
}

/** Fetch summary statistics. Replace with GET /api/missions/stats */
export async function getMissionSummaryStats(): Promise<MissionSummaryStats> {
  return MOCK_SUMMARY_STATS;
}

/** Fetch activity feed. Replace with GET /api/activity */
export async function getActivityFeed(): Promise<ActivityEntry[]> {
  return MOCK_ACTIVITY;
}

// ---- Telemetry ----------------------------------------------

/** Get the latest telemetry snapshot. Replace with WebSocket subscription. */
export async function getLatestTelemetry(): Promise<TelemetrySnapshot> {
  return MOCK_TELEMETRY;
}

/** Get the flight trajectory for the active mission. Replace with GET /api/missions/:id/trajectory */
export async function getTrajectory(): Promise<TrajectoryPoint[]> {
  return MOCK_TRAJECTORY;
}

/** Get the current UAV position. Replace with WebSocket position stream. */
export async function getCurrentPosition(): Promise<TrajectoryPoint> {
  return MOCK_CURRENT_POSITION;
}

// ---- Pipeline -----------------------------------------------

/** Get pipeline stages for the active mission. Replace with GET /api/missions/:id/pipeline */
export async function getPipelineStages(): Promise<PipelineStage[]> {
  return MOCK_PIPELINE_STAGES;
}

// ---- System -------------------------------------------------

/** Get system health snapshot. Replace with GET /api/system/health */
export async function getSystemHealth(): Promise<SystemHealth> {
  return MOCK_SYSTEM_HEALTH;
}
