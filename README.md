# AI Engineering Roadmap Tracker

A 6-month interactive roadmap for Senior Software Engineers transitioning into Applied LLM Engineering. Built with Next.js 14, Tailwind CSS, and local JSON persistence.

## What's Inside

- **26-week curriculum** across 5 phases: Foundations → Architecture → Fine-Tuning → Production Engineering → Capstone
- **140 actionable tasks** with checkbox tracking saved to disk
- **Polyglot Migration Layer** — mental model translations for PHP, Java, Node.js/TypeScript, and C#/.NET developers
- **Curated resources** — books, courses, papers, and tools vetted by the ML community (Reddit, roadmap.sh, Hacker News)
- **Key terminology** definitions for every week
- **Progress dashboard** with per-phase breakdowns

## Quick Start

```bash
# Install dependencies
make install

# Start development server
make dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `make install` | Install npm dependencies |
| `make dev` | Start dev server (port 3000) |
| `make build` | Production build |
| `make start` | Build + start production server |
| `make progress` | Show progress summary in terminal |
| `make reset` | Reset all tasks to incomplete (fresh start) |
| `make clean` | Remove build artifacts and node_modules |

## How It Works

- Progress is persisted in `roadmap-data.json` via a Next.js API route (`POST /api/save`)
- Clicking a task checkbox instantly updates the UI (optimistic) and saves to disk
- The JSON file is in `.gitignore` — your progress stays local

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (dark mode default)
- **Lucide React** (icons)
- **Local JSON** (no database needed)

## Curriculum Overview

| Phase | Weeks | Focus |
|-------|-------|-------|
| 1. Foundations | 1–6 | Python, NumPy, Linear Algebra, Neural Nets from scratch |
| 2. Architecture | 7–12 | PyTorch, RNNs, Attention, Transformers, HuggingFace |
| 3. Fine-Tuning | 13–17 | LoRA, QLoRA, PEFT, Unsloth, Dataset Engineering, DPO |
| 4. Engineering | 18–22 | Embeddings, RAG, vLLM, Evaluation (Ragas), Prompt Engineering |
| 5. Capstone | 23–26 | Vertical AI Agent (end-to-end build + deploy) |

## Project Structure

```
├── roadmap-data.json          # Curriculum + progress (gitignored)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (dark mode)
│   │   ├── page.tsx           # Main app (dashboard + week view)
│   │   └── api/
│   │       ├── data/route.ts  # GET — serve roadmap data
│   │       └── save/route.ts  # POST — persist task completion
│   ├── components/
│   │   ├── Sidebar.tsx        # Phase/week navigation tree
│   │   ├── Dashboard.tsx      # Progress overview
│   │   ├── WeekView.tsx       # Week detail (tasks, resources, terms)
│   │   ├── TaskItem.tsx       # Checkbox task component
│   │   └── MigrationTabs.tsx  # "Developer Translator" language tabs
│   └── types.ts               # TypeScript interfaces
├── Makefile                   # Dev commands
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```
