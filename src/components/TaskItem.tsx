"use client";

import { Task } from "@/types";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string, done: boolean) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const [saving, setSaving] = useState(false);

  const handleToggle = async () => {
    setSaving(true);
    await onToggle(task.id, !task.done);
    setSaving(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={saving}
      className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all text-left group ${
        task.done
          ? "bg-success/5 hover:bg-success/10"
          : "bg-surface-2 hover:bg-surface-3"
      }`}
    >
      <span className="mt-0.5 shrink-0">
        {saving ? (
          <Loader2 size={18} className="text-accent animate-spin" />
        ) : task.done ? (
          <CheckCircle2 size={18} className="text-success" />
        ) : (
          <Circle
            size={18}
            className="text-slate-500 group-hover:text-accent-light transition-colors"
          />
        )}
      </span>
      <span
        className={`text-sm leading-relaxed ${
          task.done ? "text-slate-500 line-through" : "text-slate-300"
        }`}
      >
        {task.text}
      </span>
    </button>
  );
}
