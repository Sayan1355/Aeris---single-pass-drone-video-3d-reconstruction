// ============================================================
// AERIS — Phase 8 Live Telemetry Local Simulation Hook
// Periodically updates live flight state & event stream for frontend boundary
// ============================================================

import { useState, useEffect, useRef } from 'react';
import type {
  LiveTelemetryData,
  TelemetryEvent,
  TelemetryHistoryPoint,
  SubsystemHealthItem,
} from '../types';
import {
  INITIAL_TELEMETRY_DATA,
  INITIAL_EVENTS_FEED,
  INITIAL_SUBSYSTEM_HEALTH,
  INITIAL_HISTORY_TREND,
} from '../data/mockTelemetry';

export function useTelemetrySimulation() {
  const [telemetry, setTelemetry] = useState<LiveTelemetryData>(INITIAL_TELEMETRY_DATA);
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS_FEED);
  const [history, setHistory] = useState<TelemetryHistoryPoint[]>(INITIAL_HISTORY_TREND);
  const [health] = useState<SubsystemHealthItem[]>(INITIAL_SUBSYSTEM_HEALTH);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const tickCountRef = useRef<number>(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      tickCountRef.current += 1;
      const count = tickCountRef.current;

      setTelemetry((prev) => {
        const nextAlt = Number((124.6 + Math.sin(count * 0.2) * 0.8).toFixed(1));
        const nextSpeed = Number((11.8 + Math.cos(count * 0.3) * 0.4).toFixed(1));
        const nextHeading = (prev.heading + 1) % 360;
        const nextFrame = prev.currentFrame + 1;
        const nextKeyframes = nextFrame % 3 === 0 ? prev.keyframesCount + 1 : prev.keyframesCount;
        const nextDistFlown = Number((prev.distanceFlownKm + 0.005).toFixed(2));
        const nextDistRem = Number((Math.max(0.1, prev.distanceRemainingKm - 0.005)).toFixed(2));
        const nextBattery = Number(Math.max(15, prev.batteryPercent - 0.02).toFixed(1));

        return {
          ...prev,
          altitudeAgl: nextAlt,
          groundSpeed: nextSpeed,
          heading: nextHeading,
          currentFrame: nextFrame,
          keyframesCount: nextKeyframes,
          distanceFlownKm: nextDistFlown,
          distanceRemainingKm: nextDistRem,
          batteryPercent: nextBattery,
          uptimeSeconds: prev.uptimeSeconds + 1,
        };
      });

      // Update Recharts trend points
      setHistory((prevHistory) => {
        const newPoint: TelemetryHistoryPoint = {
          timeLabel: 'Now',
          altitude: Number((124.6 + Math.sin(count * 0.2) * 0.8).toFixed(1)),
          speed: Number((11.8 + Math.cos(count * 0.3) * 0.4).toFixed(1)),
          battery: Number((78 - count * 0.02).toFixed(1)),
          satellites: 19,
        };
        const updated = [...prevHistory.slice(1), newPoint];
        return updated;
      });

      // Push simulated events occasionally
      if (count % 8 === 0) {
        const nowTime = new Date().toTimeString().split(' ')[0];
        const newEvent: TelemetryEvent = {
          id: `evt-${Date.now()}`,
          timestamp: nowTime,
          severity: 'INFO',
          category: 'TELEMETRY',
          message: `KEYFRAME #${1842 + Math.floor(count / 2)} INGESTED — DEPTH CONFIDENCE 94.8%`,
        };
        setEvents((prevEvts) => [newEvent, ...prevEvts.slice(0, 15)]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePauseCapture = () => {
    setIsPaused((p) => !p);
  };

  return {
    telemetry,
    events,
    history,
    health,
    isPaused,
    togglePauseCapture,
  };
}
