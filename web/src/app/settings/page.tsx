"use client";

import { useState, useEffect } from "react";
import { useSettingsStore } from "@/store/settings";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { apiKey, setApiKey, clearApiKey } = useSettingsStore();
  const [localKey, setLocalKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalKey(apiKey || "");
  }, [apiKey]);

  function handleSave() {
    setApiKey(localKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <header>
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-foreground/70">Manage your preferences and API key.</p>
        </header>

        <section className="rounded-xl border border-foreground/10 p-4 space-y-3">
          <h2 className="text-sm font-medium">API key</h2>
          <p className="text-xs text-foreground/70">
            Your key is stored locally in your browser and never sent to our servers by default.
          </p>
          <input
            type="password"
            placeholder="Paste your API key"
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={clearApiKey}>Clear</Button>
            {saved && <span className="text-xs text-foreground/60">Saved</span>}
          </div>
        </section>
      </div>
    </div>
  );
}
