"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/plan";
import { useRouter } from "next/navigation";
import { generatePlaceholderPlan } from "@/lib/placeholderPlanner";
import { useSettingsStore } from "@/store/settings";

const MIN_GOAL_CHARS = 100;

export default function QuickStart() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState<string>("");
  const { setGoal: setStoreGoal, setDeadline: setStoreDeadline, setTasks, setDesiredTaskCount } = usePlanStore();
  const { apiKey } = useSettingsStore();
  const router = useRouter();

  const remaining = useMemo(() => Math.max(0, MIN_GOAL_CHARS - goal.trim().length), [goal]);
  const canGenerate = remaining === 0;

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
              setStoreGoal(goal);
              setStoreDeadline(deadline || undefined);
              setDesiredTaskCount(20);
              // Call API to generate plan (uses OpenRouter if key present)
              fetch("/api/plan/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(apiKey ? { "x-user-api-key": apiKey } : {}),
                },
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
                .then(async (r) => {
                  if (!r.ok) throw new Error(await r.text());
                  return r.json();
                })
                .then((data) => {
                  setTasks(data.tasks ?? generatePlaceholderPlan(goal, 20));
                  router.push("/plan");
                })
                .catch(() => {
                  setTasks(generatePlaceholderPlan(goal, 20));
                  router.push("/plan");
                });
            }}
          >
            Generate plan
          </Button>
        </div>
      </div>
    </div>
  );
}
