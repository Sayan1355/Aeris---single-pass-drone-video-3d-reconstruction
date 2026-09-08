import React from 'react';
import type { KeyboardShortcutItem } from '../types';
import { Keyboard, Info } from '@phosphor-icons/react';

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcutItem[];
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ shortcuts }) => {
  return (
    <div className="bg-[#0C1018] border border-[#1E293B] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="text-base font-bold text-[#F8FAFC]">Operator Keyboard Shortcuts Reference</h2>
            <p className="text-xs text-[#64748B]">Global hotkeys for rapid workspace navigation and module switching.</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-mono text-[#64748B]">
          <Info className="w-3.5 h-3.5 text-[#38BDF8]" />
          Informational Reference
        </span>
      </div>

      {/* Grid of Hotkey Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {shortcuts.map((sc) => (
          <div key={sc.key} className="flex items-center justify-between p-3 rounded-lg bg-[#07090E] border border-[#1E293B]">
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-xs text-[#F8FAFC]">{sc.label}</span>
              <p className="text-[10px] text-[#64748B]">{sc.description}</p>
            </div>
            <kbd className="px-2.5 py-1 rounded bg-[#1E293B] border border-[#38BDF8]/40 text-[#38BDF8] font-mono text-xs font-bold shadow-sm">
              {sc.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
};
