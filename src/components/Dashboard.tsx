"use client";

import { Phase } from "@/types";
import { Target, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface DashboardProps {
  phases: Phase[];
}

export default function Dashboard({ phases }: DashboardProps) {
  const allTasks = phases.flatMap((p) => p.weeks_detail.flatMap((w) => w.tasks));
  const completed = allTasks.filter((t) => t.done).length;
  const total = allTasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const totalWeeks = phases.reduce((n, p) => n + p.weeks_detail.length, 0);
  const completedWeeks = phases
    .flatMap((p) => p.weeks_detail)
    .filter((w) => w.tasks.length > 0 && w.tasks.every((t) => t.done)).length;

  const currentPhase =
    phases.find((p) =>
      p.weeks_detail.some((w) => w.tasks.some((t) => !t.done))
    ) || phases[0];

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-slate-400 mt-1">
          Track your journey from Software Engineer to Applied LLM Engineer
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Target size={18} />}
          label="Overall Progress"
          value={`${progress}%`}
          color="#6366f1"
        />
        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Tasks Completed"
          value={`${completed}/${total}`}
          color="#22c55e"
        />
        <StatCard
          icon={<Clock size={18} />}
          label="Weeks Completed"
          value={`${completedWeeks}/${totalWeeks}`}
          color="#f59e0b"
        />
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Current Phase"
          value={currentPhase.title}
          color={currentPhase.color}
        />
      </div>

      {/* Progress bar */}
      <div className="bg-surface-2 rounded-xl p-5 border border-surface-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-300">
            Roadmap Progress
          </span>
          <span className="text-sm text-slate-500">
            {progress}% complete
          </span>
        </div>
        <div className="h-3 bg-surface-3 rounded-full overflow-hidden flex">
          {phases.map((phase) => {
            const phaseTasks = phase.weeks_detail.flatMap((w) => w.tasks);
            const phaseCompleted = phaseTasks.filter((t) => t.done).length;
            const phaseWidth = (phaseTasks.length / total) * 100;
            const phaseProgress =
              phaseTasks.length > 0
                ? (phaseCompleted / phaseTasks.length) * 100
                : 0;

            return (
              <div
                key={phase.id}
                className="relative h-full"
                style={{ width: `${phaseWidth}%` }}
                title={`${phase.title}: ${Math.round(phaseProgress)}%`}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${phaseProgress}%`,
                    backgroundColor: phase.color,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex mt-3 gap-4">
          {phases.map((phase) => (
            <div key={phase.id} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-[10px] text-slate-500">{phase.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-surface-2 rounded-xl p-4 border border-surface-3">
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <span className="text-lg font-bold text-white">{value}</span>
    </div>
  );
}
