"use client";

import TimelineClient from "@/components/TimelineClient";

export default function TimelinePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Timeline</h1>
          <div className="text-sm text-foreground/70">Drag to move, resize to adjust durations</div>
        </div>
        <div className="rounded-xl border border-foreground/10 p-2 shadow-sm bg-background">
          <TimelineClient />
        </div>
      </div>
    </div>
  );
}
