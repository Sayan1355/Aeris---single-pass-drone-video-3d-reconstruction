// ============================================================
// AERIS — System Health Mock Data
// ============================================================

import type { SystemHealth } from '../types/telemetry';

export const MOCK_SYSTEM_HEALTH: SystemHealth = {
  gps:         'connected',
  rtk:         'connected',
  telemetry:   'connected',
  videoStream: 'connected',
  processing:  'connected',
  storage:     'connected',
  api:         'connected',
  // values
  storageUsedGB:   1847.4,
  storageTotalGB:  4096.0,
  apiLatencyMs:    18,
  videoLatencyMs:  110,
  processingCpuPct: 74,
};
