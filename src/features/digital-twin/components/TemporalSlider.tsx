// ============================================================
// AERIS — Digital Twin Temporal / Mission Timeline Slider
// Bottom controls for mission timeline scrub, UAV position, and playback
// ============================================================

import { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Clock } from '@phosphor-icons/react';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';

export function TemporalSlider() {
  const { timelineProgress, setTimelineProgress, isPlaying, togglePlaying } = useDigitalTwinStore();
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto playback interval
  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        const current = useDigitalTwinStore.getState().timelineProgress;
        if (current >= 100) {
          useDigitalTwinStore.getState().setPlaying(false);
        } else {
          useDigitalTwinStore.getState().setTimelineProgress(current + 0.5);
        }
      }, 100);
    }
    return () => {
      if (playRef.current) clearInterval(playRef.current);
    };
  }, [isPlaying]);

  // Derived mission timestamp
  const totalSec = Math.floor((timelineProgress / 100) * 514); // 8m 34s total
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
      aria-label="Temporal mission timeline"
    >
      {/* Playback Controls */}
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

      {/* Timecode & Frame */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        <Clock size={13} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>00:{mins}:{secs}</span>
        <span style={{ color: 'var(--text-muted)' }}>/ 00:08:34</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
          FRAME: <span style={{ color: 'var(--accent-primary)' }}>{frameNum.toLocaleString()}</span> / 18,400
        </span>
      </div>

      {/* Timeline Range Scrubber */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={timelineProgress}
          onChange={(e) => setTimelineProgress(Number(e.target.value))}
          aria-label="Mission timeline slider"
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

      {/* Timeline Percentage */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', minWidth: 42, textAlign: 'right' }}>
        {timelineProgress.toFixed(0)}%
      </div>
    </div>
  );
}
