export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface WeekDetail {
  id: string;
  week: number;
  title: string;
  objectives: string[];
  tasks: Task[];
  resources: Resource[];
  terminology: Record<string, string>;
  migration_tips: MigrationTips;
}

export interface MigrationTips {
  php: string;
  java: string;
  nodejs: string;
  csharp: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  weeks: string;
  color: string;
  migration_tips: MigrationTips;
  weeks_detail: WeekDetail[];
}

export interface RoadmapData {
  title: string;
  subtitle: string;
  phases: Phase[];
}

export type DevBackground = keyof MigrationTips;
