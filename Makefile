.PHONY: install dev build start clean reset progress

# Install dependencies and initialize roadmap data if missing
install:
	npm install
	@test -f roadmap-data.json || cp roadmap-data.template.json roadmap-data.json && echo "Initialized roadmap-data.json from template."

# Run development server
dev:
	npx next dev

# Run development server on custom port
dev-port:
	npx next dev -p $(PORT)

# Build for production
build:
	npx next build

# Start production server
start: build
	npx next start

# Clean build artifacts
clean:
	rm -rf .next node_modules

# Reset all progress (set all tasks to done: false) and show clean state
reset:
	@python3 -c "\
	import json; \
	d = json.load(open('roadmap-data.json')); \
	count = sum(1 for p in d['phases'] for w in p['weeks_detail'] for t in w['tasks'] if t['done']); \
	[t.update(done=False) for p in d['phases'] for w in p['weeks_detail'] for t in w['tasks']]; \
	json.dump(d, open('roadmap-data.json', 'w'), indent=2); \
	total = sum(1 for p in d['phases'] for w in p['weeks_detail'] for t in w['tasks']); \
	print(f'\n  Reset complete. Cleared {count} completed tasks.'); \
	print(f'  Fresh start: 0/{total} tasks (0%)\n')"

# Show progress summary
progress:
	@python3 -c "\
	import json; \
	d = json.load(open('roadmap-data.json')); \
	total = sum(1 for p in d['phases'] for w in p['weeks_detail'] for t in w['tasks']); \
	done = sum(1 for p in d['phases'] for w in p['weeks_detail'] for t in w['tasks'] if t['done']); \
	pct = round(done/total*100) if total else 0; \
	print(f'\n  Progress: {done}/{total} tasks ({pct}%)\n'); \
	[print(f'  {p[\"title\"]}: {sum(1 for w in p[\"weeks_detail\"] for t in w[\"tasks\"] if t[\"done\"])}/{sum(1 for w in p[\"weeks_detail\"] for t in w[\"tasks\"])} tasks') for p in d['phases']]; \
	print()"
