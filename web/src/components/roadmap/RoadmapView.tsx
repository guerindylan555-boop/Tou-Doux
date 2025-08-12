"use client";

import { useMemo, useState, useEffect } from "react";
import { generatePlaceholderRoadmap } from "@/lib/placeholderRoadmap";
import { usePlanStore } from "@/store/plan";
import { useSettingsStore } from "@/store/settings";
import PhaseCard from "@/components/roadmap/PhaseCard";
import Spinner from "@/components/ui/spinner";

export default function RoadmapView() {
  const { goal, roadmap, setRoadmap } = usePlanStore();
  const { apiKey } = useSettingsStore();
  const [showAssumptions, setShowAssumptions] = useState(false);

  const computed = useMemo(() => roadmap ?? generatePlaceholderRoadmap(goal), [roadmap, goal]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    // If we have a goal but no roadmap (e.g., navigated too early), fetch it now
    if (hydrated && goal && !roadmap) {
      const controller = new AbortController();
      (async () => {
        try {
          const resp = await fetch("/api/roadmap/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(apiKey ? { "x-user-api-key": apiKey } : {}),
            },
            body: JSON.stringify({ goal, desiredTaskCount: 20 }),
            signal: controller.signal,
          });
          if (!resp.ok) return;
          const rm = await resp.json();
          if (rm?.phases) setRoadmap(rm);
        } catch {}
      })();
      return () => controller.abort();
    }
  }, [hydrated, goal, roadmap, apiKey, setRoadmap]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">5‑phase roadmap</h1>
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={showAssumptions}
            onChange={(e) => setShowAssumptions(e.target.checked)}
          />
          Explain assumptions
        </label>
      </div>

      {showAssumptions && (
        <div className="rounded-lg border border-foreground/10 p-3 text-sm text-foreground/80">
          {computed.assumptions}
        </div>
      )}

      {!hydrated ? (
        <div className="py-10">
          <Spinner label="Loading roadmap..." />
        </div>
      ) : (
      <div className="grid gap-3">
        {computed.phases.map((p) => (
          <PhaseCard key={p.index} phase={p} />
        ))}
      </div>
      )}
    </div>
  );
}
