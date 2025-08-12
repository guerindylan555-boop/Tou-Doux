"use client";

import { useUiStore } from "@/store/ui";
import Spinner from "@/components/ui/spinner";

export default function GlobalOverlay() {
  const { loading, message } = useUiStore();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur flex items-center justify-center">
      <div className="rounded-xl border border-foreground/10 bg-background px-4 py-3 shadow">
        <Spinner label={message || "Working..."} />
      </div>
    </div>
  );
}
