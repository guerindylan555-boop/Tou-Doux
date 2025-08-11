"use client";

import { useState } from "react";
import type { RoadmapPhase } from "@/lib/placeholderRoadmap";

export default function PhaseCard({ phase }: { phase: RoadmapPhase }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border border-foreground/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-foreground/20 text-xs font-medium">
            {phase.index}
          </span>
          <div className="text-sm font-medium">{phase.title}</div>
        </div>
        <div className="text-xs text-foreground/60">{open ? "Hide" : "Show"}</div>
      </button>
      {open && (
        <div className="px-4 pb-4 grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-xs font-medium mb-2">Objectives</div>
            <ul className="text-sm list-disc pl-5 space-y-1 text-foreground/80">
              {phase.objectives.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium mb-2">Acceptance criteria</div>
            <ul className="text-sm list-disc pl-5 space-y-1 text-foreground/80">
              {phase.acceptanceCriteria.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium mb-2">Risks</div>
            <ul className="text-sm list-disc pl-5 space-y-1 text-foreground/80">
              {phase.risks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
