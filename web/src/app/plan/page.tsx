"use client";

import { usePlanStore } from "@/store/plan";
import { Button } from "@/components/ui/button";
import { generatePlaceholderPlan } from "@/lib/placeholderPlanner";

export default function PlanPage() {
  const {
    goal,
    deadline,
    desiredTaskCount,
    windows,
    timeOff,
    timezone,
    tasks,
    setGoal,
    setDeadline,
    setDesiredTaskCount,
    setWindows,
    setTimeOff,
    setTimezone,
    setTasks,
  } = usePlanStore();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-8">
        <header>
          <h1 className="text-xl font-semibold">Plan settings</h1>
          <p className="text-sm text-foreground/70">Edit inputs and re‑plan.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs text-foreground/70">Goal</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-foreground/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs text-foreground/70">Deadline</label>
            <input
              type="date"
              value={deadline || ""}
              onChange={(e) => setDeadline(e.target.value)}
              className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs text-foreground/70">Desired task count</label>
            <input
              type="number"
              min={5}
              max={200}
              value={desiredTaskCount}
              onChange={(e) => setDesiredTaskCount(Number(e.target.value))}
              className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs text-foreground/70">Time zone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm font-medium">Working windows</div>
            <div className="space-y-2">
              {windows.map((w, i) => (
                <div key={`${w.day}-${i}`} className="grid grid-cols-[1fr_1fr_1fr] gap-2">
                  <select
                    value={w.day}
                    onChange={(e) => {
                      const next = [...windows];
                      next[i] = { ...w, day: Number(e.target.value) };
                      setWindows(next);
                    }}
                    className="h-10 rounded-md border border-foreground/15 bg-transparent px-3 text-sm"
                  >
                    {"SMTWTFS".split("").map((_, idx) => (
                      <option key={idx} value={idx}>
                        {idx}
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={w.start}
                    onChange={(e) => {
                      const next = [...windows];
                      next[i] = { ...w, start: e.target.value };
                      setWindows(next);
                    }}
                    className="h-10 rounded-md border border-foreground/15 bg-transparent px-3 text-sm"
                  />
                  <input
                    type="time"
                    value={w.end}
                    onChange={(e) => {
                      const next = [...windows];
                      next[i] = { ...w, end: e.target.value };
                      setWindows(next);
                    }}
                    className="h-10 rounded-md border border-foreground/15 bg-transparent px-3 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => setWindows([...windows, { day: 1, start: "09:00", end: "12:00" }])}
              >
                Add window
              </Button>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Time off</div>
            <div className="space-y-2">
              {timeOff.map((d, i) => (
                <div key={`${d}-${i}`} className="flex items-center gap-2">
                  <input
                    type="date"
                    value={d}
                    onChange={(e) => {
                      const next = [...timeOff];
                      next[i] = e.target.value;
                      setTimeOff(next);
                    }}
                    className="h-10 rounded-md border border-foreground/15 bg-transparent px-3 text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setTimeOff(timeOff.filter((_, idx) => idx !== i))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" onClick={() => setTimeOff([...timeOff, ""]) }>
                Add day off
              </Button>
              <Button>Re‑plan</Button>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Tasks</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setTasks(generatePlaceholderPlan(goal, desiredTaskCount))}
              >
                Generate placeholder tasks
              </Button>
              <Button>Re‑plan (AI)</Button>
            </div>
          </div>
          <div className="rounded-xl border border-foreground/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-foreground/5 text-foreground/80">
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Phase</th>
                  <th className="text-left p-2">Estimate (h)</th>
                  <th className="text-left p-2">Depends on</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td className="p-3 text-foreground/60" colSpan={5}>
                      No tasks yet. Click Generate placeholder tasks.
                    </td>
                  </tr>
                ) : (
                  tasks.map((t) => (
                    <tr key={t.id} className="border-t border-foreground/10">
                      <td className="p-2 align-top text-foreground/70">{t.id}</td>
                      <td className="p-2 align-top">{t.title}</td>
                      <td className="p-2 align-top">{t.phase}</td>
                      <td className="p-2 align-top">{t.estimateHours}</td>
                      <td className="p-2 align-top text-foreground/70">{t.dependsOnIds.join(", ")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
