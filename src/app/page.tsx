"use client";

import { useState, useEffect, useCallback } from "react";
import { RoadmapData, Phase, WeekDetail } from "@/types";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import WeekView from "@/components/WeekView";

export default function Home() {
  const [data, setData] = useState<RoadmapData | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setError("Failed to load roadmap data"));
  }, []);

  const handleToggleTask = useCallback(
    async (taskId: string, done: boolean) => {
      // Optimistic update
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          phases: prev.phases.map((phase) => ({
            ...phase,
            weeks_detail: phase.weeks_detail.map((week) => ({
              ...week,
              tasks: week.tasks.map((task) =>
                task.id === taskId ? { ...task, done } : task
              ),
            })),
          })),
        };
      });

      try {
        const res = await fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, done }),
        });
        if (!res.ok) throw new Error("Save failed");
      } catch {
        // Revert on failure
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            phases: prev.phases.map((phase) => ({
              ...phase,
              weeks_detail: phase.weeks_detail.map((week) => ({
                ...week,
                tasks: week.tasks.map((task) =>
                  task.id === taskId ? { ...task, done: !done } : task
                ),
              })),
            })),
          };
        });
      }
    },
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Loading roadmap...</span>
        </div>
      </div>
    );
  }

  let activeWeek: WeekDetail | null = null;
  let activePhase: Phase | null = null;
  if (selectedWeek) {
    for (const phase of data.phases) {
      const week = phase.weeks_detail.find((w) => w.id === selectedWeek);
      if (week) {
        activeWeek = week;
        activePhase = phase;
        break;
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        phases={data.phases}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
      />
      <main className="flex-1 overflow-y-auto">
        {activeWeek && activePhase ? (
          <WeekView
            week={activeWeek}
            phase={activePhase}
            onToggleTask={handleToggleTask}
          />
        ) : (
          <Dashboard phases={data.phases} />
        )}
      </main>
    </div>
  );
}
