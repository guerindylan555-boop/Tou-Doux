"use client";

import { useMemo, useState } from "react";
import { generatePlaceholderRoadmap } from "@/lib/placeholderRoadmap";
import { usePlanStore } from "@/store/plan";
import PhaseCard from "@/components/roadmap/PhaseCard";

export default function RoadmapView() {
  const { goal } = usePlanStore();
  const [showAssumptions, setShowAssumptions] = useState(false);

  const roadmap = useMemo(() => generatePlaceholderRoadmap(goal), [goal]);

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
          {roadmap.assumptions}
        </div>
      )}

      <div className="grid gap-3">
        {roadmap.phases.map((p) => (
          <PhaseCard key={p.index} phase={p} />
        ))}
      </div>
    </div>
  );
}
