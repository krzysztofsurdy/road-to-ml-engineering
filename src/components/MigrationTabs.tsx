"use client";

import { DevBackground, MigrationTips } from "@/types";
import { useState } from "react";
import { Code2, Coffee, Hexagon, Hash } from "lucide-react";

const backgrounds: { key: DevBackground; label: string; icon: React.ReactNode }[] = [
  { key: "php", label: "PHP", icon: <Code2 size={14} /> },
  { key: "java", label: "Java", icon: <Coffee size={14} /> },
  { key: "nodejs", label: "Node.js / TS", icon: <Hexagon size={14} /> },
  { key: "csharp", label: "C# / .NET", icon: <Hash size={14} /> },
];

interface MigrationTabsProps {
  tips: MigrationTips;
}

export default function MigrationTabs({ tips }: MigrationTabsProps) {
  const [active, setActive] = useState<DevBackground>("php");

  return (
    <div className="rounded-xl border border-surface-3 overflow-hidden">
      <div className="flex border-b border-surface-3 bg-surface-1">
        {backgrounds.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
              active === key
                ? "bg-accent/10 text-accent-light border-b-2 border-accent"
                : "text-slate-500 hover:text-slate-300 hover:bg-surface-2"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-surface-1/50">
        <p className="text-sm text-slate-300 leading-relaxed">{tips[active]}</p>
      </div>
    </div>
  );
}
