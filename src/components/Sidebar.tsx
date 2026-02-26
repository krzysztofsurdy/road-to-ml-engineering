"use client";

import { Phase, WeekDetail } from "@/types";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Cpu,
  Wrench,
  Rocket,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const phaseIcons: Record<string, React.ReactNode> = {
  "phase-1": <BookOpen size={16} />,
  "phase-2": <Cpu size={16} />,
  "phase-3": <Wrench size={16} />,
  "phase-4": <Rocket size={16} />,
  "phase-5": <Trophy size={16} />,
};

function getPhaseProgress(phase: Phase): number {
  const tasks = phase.weeks_detail.flatMap((w) => w.tasks);
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);
}

function getWeekProgress(week: WeekDetail): number {
  if (week.tasks.length === 0) return 0;
  return Math.round(
    (week.tasks.filter((t) => t.done).length / week.tasks.length) * 100
  );
}

interface SidebarProps {
  phases: Phase[];
  selectedWeek: string | null;
  onSelectWeek: (weekId: string) => void;
}

export default function Sidebar({
  phases,
  selectedWeek,
  onSelectWeek,
}: SidebarProps) {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set(phases.map((p) => p.id))
  );

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  };

  return (
    <aside className="w-80 min-w-[320px] bg-surface-1 border-r border-surface-3 flex flex-col h-screen overflow-hidden">
      <div className="p-5 border-b border-surface-3">
        <h1 className="text-lg font-bold text-white tracking-tight">
          AI Engineering
        </h1>
        <p className="text-xs text-slate-400 mt-1">6-Month Roadmap Tracker</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {phases.map((phase) => {
          const progress = getPhaseProgress(phase);
          const isExpanded = expandedPhases.has(phase.id);

          return (
            <div key={phase.id} className="timeline-connector mb-1">
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-surface-2 transition-colors text-left group"
              >
                <span
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full shrink-0"
                  style={{ backgroundColor: phase.color + "20", color: phase.color }}
                >
                  {phaseIcons[phase.id]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-200 truncate">
                      {phase.title}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      Wk {phase.weeks}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-surface-3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: phase.color,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 w-8 text-right">
                      {progress}%
                    </span>
                  </div>
                </div>
                <span className="text-slate-500 shrink-0">
                  {isExpanded ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </span>
              </button>

              {isExpanded && (
                <div className="ml-6 pl-4 border-l border-surface-3 mt-1 mb-2">
                  {phase.weeks_detail.map((week) => {
                    const wp = getWeekProgress(week);
                    const isSelected = selectedWeek === week.id;

                    return (
                      <button
                        key={week.id}
                        onClick={() => onSelectWeek(week.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors mb-0.5 ${
                          isSelected
                            ? "bg-accent/10 text-accent-light border border-accent/20"
                            : "hover:bg-surface-2 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">
                            <span className="text-slate-500 text-xs mr-1.5">
                              W{week.week}
                            </span>
                            {week.title}
                          </span>
                          {wp === 100 && (
                            <span className="text-success text-xs ml-1">
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
