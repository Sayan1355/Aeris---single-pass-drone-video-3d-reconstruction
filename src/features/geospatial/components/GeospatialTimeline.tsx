// ============================================================
// AERIS — Geospatial Temporal Timeline Control
// Timeline slider for tracking mission flight trajectory and position
// ============================================================

import { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Clock } from '@phosphor-icons/react';
import { useGeospatialStore } from '../hooks/useGeospatialStore';

export function GeospatialTimeline() {
  const { timelineProgress, setTimelineProgress, isPlaying, togglePlaying } = useGeospatialStore();
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        const cur = useGeospatialStore.getState().timelineProgress;
        if (cur >= 100) {
          useGeospatialStore.getState().togglePlaying();
        } else {
          useGeospatialStore.getState().setTimelineProgress(cur + 0.5);
        }
      }, 100);
    }
    return () => {
      if (playRef.current) clearInterval(playRef.current);
    };
  }, [isPlaying]);

  const totalSec = Math.floor((timelineProgress / 100) * 514);
  const mins = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const secs = (totalSec % 60).toString().padStart(2, '0');
  const frameNum = Math.floor((timelineProgress / 100) * 18400);

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border-base)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexShrink: 0,
        height: 48,
      }}
      role="region"
      aria-label="Geospatial flight timeline"
    >
      {/* Playback buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          className="btn btn-ghost"
          onClick={() => setTimelineProgress(Math.max(0, timelineProgress - 10))}
          style={{ padding: '4px 6px', minWidth: 0 }}
          aria-label="Skip back 10%"
        >
          <SkipBack size={14} />
        </button>
        <button
          className="btn btn-secondary"
          onClick={togglePlaying}
          style={{ padding: '5px 10px', minWidth: 0 }}
          aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
        >
          {isPlaying ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setTimelineProgress(Math.min(100, timelineProgress + 10))}
          style={{ padding: '4px 6px', minWidth: 0 }}
          aria-label="Skip forward 10%"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Timecode & frame */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        <Clock size={13} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>00:{mins}:{secs}</span>
        <span style={{ color: 'var(--text-muted)' }}>/ 00:08:34</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
          FRAME: <span style={{ color: 'var(--accent-primary)' }}>{frameNum.toLocaleString()}</span> / 18,400
        </span>
      </div>

      {/* Timeline Slider */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={timelineProgress}
          onChange={(e) => setTimelineProgress(Number(e.target.value))}
          aria-label="Geospatial timeline slider"
          style={{
            width: '100%',
            appearance: 'none',
            height: 4,
            background: `linear-gradient(to right, var(--accent-primary) ${timelineProgress}%, var(--border-strong) ${timelineProgress}%)`,
            borderRadius: 2,
            outline: 'none',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Percentage */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', minWidth: 42, textAlign: 'right' }}>
        {timelineProgress.toFixed(0)}%
      </div>
    </div>
  );
}
