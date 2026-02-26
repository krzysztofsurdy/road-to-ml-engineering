"use client";

import { WeekDetail, Phase } from "@/types";
import TaskItem from "./TaskItem";
import MigrationTabs from "./MigrationTabs";
import {
  BookOpen,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Target,
  Languages,
} from "lucide-react";
import { useState } from "react";

interface WeekViewProps {
  week: WeekDetail;
  phase: Phase;
  onToggleTask: (taskId: string, done: boolean) => void;
}

const resourceTypeColors: Record<string, string> = {
  book: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  course: "bg-green-500/10 text-green-400 border-green-500/20",
  video: "bg-red-500/10 text-red-400 border-red-500/20",
  paper: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  docs: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  blog: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  code: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  practice: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  tool: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  interactive: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  conference: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function WeekView({ week, phase, onToggleTask }: WeekViewProps) {
  const [showTerms, setShowTerms] = useState(false);
  const completedTasks = week.tasks.filter((t) => t.done).length;
  const progress =
    week.tasks.length > 0
      ? Math.round((completedTasks / week.tasks.length) * 100)
      : 0;

  return (
    <div className="px-8 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: phase.color + "20",
              color: phase.color,
            }}
          >
            {phase.title} — Week {week.week}
          </span>
          <span className="text-xs text-slate-500">
            {completedTasks}/{week.tasks.length} tasks
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{week.title}</h2>
        <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden w-64">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: phase.color }}
          />
        </div>
      </div>

      {/* Objectives */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-accent-light" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Learning Objectives
          </h3>
        </div>
        <ul className="space-y-2">
          {week.objectives.map((obj, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <span className="text-accent mt-1 shrink-0">→</span>
              {obj}
            </li>
          ))}
        </ul>
      </section>

      {/* Tasks */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap size={16} className="text-accent-light" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Tasks
          </h3>
        </div>
        <div className="space-y-2">
          {week.tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
          ))}
        </div>
      </section>

      {/* Developer Translator */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Languages size={16} className="text-accent-light" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Developer Translator
          </h3>
        </div>
        <MigrationTabs tips={week.migration_tips} />
      </section>

      {/* Resources */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-accent-light" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Resources
          </h3>
        </div>
        <div className="grid gap-2">
          {week.resources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors group border border-transparent hover:border-surface-3"
            >
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  resourceTypeColors[res.type] || "bg-slate-500/10 text-slate-400 border-slate-500/20"
                }`}
              >
                {res.type}
              </span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1">
                {res.title}
              </span>
              <ExternalLink
                size={14}
                className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Terminology */}
      <section className="mb-8">
        <button
          onClick={() => setShowTerms(!showTerms)}
          className="flex items-center gap-2 mb-3 group"
        >
          <ChevronDown
            size={16}
            className={`text-accent-light transition-transform ${
              showTerms ? "" : "-rotate-90"
            }`}
          />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider group-hover:text-white transition-colors">
            Key Terminology
          </h3>
        </button>
        {showTerms && (
          <div className="space-y-3">
            {Object.entries(week.terminology).map(([term, definition]) => (
              <div
                key={term}
                className="px-4 py-3 rounded-lg bg-surface-2 border border-surface-3"
              >
                <dt className="text-sm font-semibold text-accent-light mb-1">
                  {term}
                </dt>
                <dd className="text-sm text-slate-400 leading-relaxed">
                  {definition}
                </dd>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
