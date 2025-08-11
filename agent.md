You are an AI agent. Your goal is to build this app: Tou doux.

What the app is


Tou doux — what it is and everything it does

One‑liner


- Turn any goal into a realistic plan you can actually follow.
Overview


- Tou doux is an AI‑powered planning and note‑taking app. It converts a goal into a 5‑phase roadmap, breaks it down into exactly the number of tasks you want, and schedules those tasks across your real availability so you always know what to do next and when you’ll finish.
What Tou doux does


- 
Captures your inputs


	- Goal and optional deadline.
	- Working capacity: days, daily time windows, exceptions/time off, and time zone.
	- Desired task count: you choose how coarse or fine‑grained the plan should be.
- 
Generates a 5‑phase roadmap


	- Exactly five phases that structure the work from start to finish.
	- Each phase includes objectives, acceptance criteria, and key risks.
	- An “Explain assumptions” toggle shows the rationale behind the plan.
- 
Breaks goals into actionable tasks


	- Decomposes your goal into the exact number of tasks you requested.
	- Assigns realistic time estimates and sensible dependencies.
	- Highlights outliers (tasks that are too tiny or too large) and suggests merge/split.
- 
Schedules to your real availability


	- Builds a timeline that respects your working days, daily time windows, time off, and time zone.
	- Places tasks without overlaps and honors dependencies.
	- Predicts a finish date and shows when you’ll be done under current capacity.
- 
Detects infeasible plans and proposes fixes


	- If capacity is too tight, Tou doux flags the issue and offers options:
		- Reduce scope (drop the lowest‑priority tasks)
		- Push the deadline
		- Increase granularity (split long tasks to improve fit)
- 
Lets you edit and re‑plan in seconds


	- Drag tasks on the timeline, resize durations, or edit estimates and dependencies.
	- Lock manual placements when you want them preserved.
	- Re‑plan with one click; the schedule updates to stay realistic.
- 
Shows clear “what changed?” diffs


	- Every re‑plan produces a version with a diff:
		- Which tasks moved, how dates shifted, estimate/ dependency changes
		- Whether the critical path changed
	- Provides a concise narrative explaining the changes.
- 
Keeps notes where they belong


	- Notes are linked to tasks and phases for context.
	- Write in markdown; search and reference items quickly.
- 
Exports your plan (privacy‑first)


	- Export anytime without giving up your data:
		- JSON (full plan), Markdown (summary), CSV (tasks), ICS (calendar blocks)
	- Designed so exports can be generated client‑side.
- 
Delivers a modern, calm UI


	- Glass‑inspired interface with dark mode.
	- Accessible components with keyboard‑friendly interactions.
	- Mobile‑aware timeline with zoom presets and quick edit sheets.
- 
Puts you in control


	- Adjust task granularity at any time; regenerate tasks to match your preferred detail level.
	- Tune estimates, dependencies, capacity windows, and deadlines.
	- See assumptions and risks clearly so you can make informed trade‑offs.


- Realism over hype: plans respect working days, time windows, and real capacity.
- Control and clarity: you pick task granularity; the app explains assumptions.
- Fast iteration: tweak inputs and re‑plan in seconds with “what changed?” diffs.
Core features


- 5‑phase AI roadmap with objectives, acceptance criteria, and risks.
- Adjustable task count (you choose the number of tasks).
- Realistic time estimates and sensible dependencies.
- Capacity‑aware schedule that fits working days, daily windows, time off, and time zone.
- Re‑plan on edits with clear diffs of moved/changed tasks and critical path shifts.
- Notes linked to tasks and phases.
- Privacy‑first exports: JSON, Markdown, CSV, ICS.
How it works (user journey)


1. Define goal, capacity (days/hours, time off), time zone, and optional deadline.
2. Choose desired task count (coarse → fine).
3. AI generates 5 phases, tasks, estimates, and dependencies.
4. Scheduler fits tasks into availability and flags infeasible plans.
5. If tight, propose: reduce scope, push deadline, or increase granularity.
6. Drag tasks, edit estimates, or adjust capacity; re‑plan and review diffs.
7. Keep notes tied to phases/tasks; export anytime.

House rule for contributors and agents


- When you finish any change, append a brief entry to change.md (date, scope, summary, key files, migrations/env if any) so others know what changed and why.


- App: Next.js App Router + React, shadcn/ui + Tailwind.
- Data: Neon Postgres (Free) with Drizzle ORM.
- AI: GPT-5 mini (default) and GPT-5 (escalation for longer/nicer explanations).
- Timeline: FullCalendar (default). Switch via env TIMELINE_LIB=react-flow if needed.
- Hosting: Vercel
