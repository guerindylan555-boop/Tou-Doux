"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/plan";
import { useRouter } from "next/navigation";
import { generatePlaceholderPlan } from "@/lib/placeholderPlanner";
import { useSettingsStore } from "@/store/settings";
import Spinner from "@/components/ui/spinner";
import { useUiStore } from "@/store/ui";

const MIN_GOAL_CHARS = 100;

export default function QuickStart() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState<string>("");
  const { setGoal: setStoreGoal, setDeadline: setStoreDeadline, setTasks, setDesiredTaskCount, setRoadmap } = usePlanStore();
  const { apiKey } = useSettingsStore();
  const router = useRouter();
  const { setLoading: setGlobalLoading } = useUiStore();

  const remaining = useMemo(() => Math.max(0, MIN_GOAL_CHARS - goal.trim().length), [goal]);
  const canGenerate = remaining === 0;
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-xl border border-foreground/10 p-6 md:p-8">
      <h2 className="text-base font-medium mb-4">Quick start</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-xs text-foreground/70">Goal (min {MIN_GOAL_CHARS} characters)</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={6}
            placeholder="Describe your goal in detail so we can plan it well..."
            className="w-full rounded-lg border border-foreground/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <div className="text-xs text-foreground/60">
            {canGenerate ? "Looks good." : `${remaining} more characters required`}
          </div>
        </div>
        <div className="grid gap-2 md:max-w-xs">
          <label className="text-xs text-foreground/70">Deadline (optional)</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div>
          <Button
            disabled={!canGenerate}
            aria-disabled={!canGenerate}
            title={!canGenerate ? `Please add ${remaining} more characters` : "Generate plan"}
            onClick={() => {
              if (!canGenerate) return;
              setLoading(true);
              setStoreGoal(goal);
              setStoreDeadline(deadline || undefined);
              setDesiredTaskCount(20);
              // Call API to generate plan (uses OpenRouter if key present)
              // Fire both roadmap and tasks generation; roadmap drives the Roadmap page
              const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(apiKey ? { "x-user-api-key": apiKey } : {}),
              };

              // Roadmap request
              const roadmapPromise = fetch("/api/roadmap/generate", {
                method: "POST",
                headers,
                body: JSON.stringify({ goal, desiredTaskCount: 20 }),
              })
                .then(async (r) => (r.ok ? r.json() : undefined))
                .then((rm) => {
                  if (rm?.phases) setRoadmap(rm);
                  return rm;
                })
                .catch(() => undefined);

              // Tasks request
              const tasksPromise = fetch("/api/plan/generate", {
                method: "POST",
                headers,
                body: JSON.stringify({
                  goal,
                  desiredTaskCount: 20,
                  windows: [
                    { day: 1, start: "09:00", end: "17:00" },
                    { day: 2, start: "09:00", end: "17:00" },
                    { day: 3, start: "09:00", end: "17:00" },
                    { day: 4, start: "09:00", end: "17:00" },
                    { day: 5, start: "09:00", end: "17:00" },
                  ],
                }),
              })
                .then(async (r) => (r.ok ? r.json() : undefined))
                .catch(() => undefined);

              setGlobalLoading(true, "Generating roadmap and tasks...");
              Promise.all([roadmapPromise, tasksPromise])
                .then(([rm, data]) => {
                  if (data?.tasks) setTasks(data.tasks);
                  if (!rm?.phases) {
                    // ensure we always have something to show
                    setRoadmap(undefined);
                  }
                })
                .finally(() => {
                  setGlobalLoading(false);
                  router.push("/roadmap");
                });
            }}
          >
            {loading ? <Spinner label="Generating plan..." /> : "Generate plan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
