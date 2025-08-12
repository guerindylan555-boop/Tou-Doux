"use client";

import { useState } from "react";
import type { RoadmapStage } from "@/lib/placeholderRoadmap";

export default function PhaseCard({ phase }: { phase: RoadmapStage }) {
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
        <div className="px-4 pb-4">
          <ul className="text-sm list-disc pl-5 space-y-1 text-foreground/80">
            {phase.items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
