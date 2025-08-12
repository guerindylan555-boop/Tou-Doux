"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settings";
import { usePlanStore } from "@/store/plan";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUiStore } from "@/store/ui";

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I can help turn your goal into a realistic plan. What are we building?" },
  ]);
  const [input, setInput] = useState("");
  const { apiKey } = useSettingsStore();
  const { setRoadmap } = usePlanStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setLoading: setGlobalLoading } = useUiStore();

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setLoading(true);
    const looksLikeGoal = userMsg.content.length >= 100 || /deadline|tasks?|phases?|plan/i.test(userMsg.content);
    try {
      if (looksLikeGoal) {
        setGlobalLoading(true, "Generating roadmap...");
        const resp = await fetch("/api/roadmap/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-user-api-key": apiKey } : {}),
          },
          body: JSON.stringify({ goal: userMsg.content, desiredTaskCount: 20 }),
        });
        const rm = resp.ok ? await resp.json() : undefined;
        if (rm?.phases) {
          setRoadmap(rm);
          setMessages((m) => [...m, { role: "assistant", content: "Generated a roadmap. Opening the Roadmap page..." }]);
          router.push("/roadmap");
        } else {
          setMessages((m) => [...m, { role: "assistant", content: "Could not generate roadmap. Please try again." }]);
        }
        setGlobalLoading(false);
      } else {
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-user-api-key": apiKey } : {}),
          },
          body: JSON.stringify({ messages: [{ role: "system", content: "You are a helpful planning assistant." }, ...messages, userMsg] }),
        });
        if (!resp.ok) throw new Error(await resp.text());
        const data = await resp.json();
        const content = String(data.content || "(no response)");
        setMessages((m) => [...m, { role: "assistant", content }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "(AI error; check API key or try again)" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="rounded-xl border border-foreground/10 p-6 md:p-8 h-[600px] flex flex-col">
      <h1 className="text-xl font-semibold mb-3">Describe your goal</h1>
      <div className="flex-1 overflow-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "assistant" ? "text-foreground" : "text-foreground/80"}>
            <span className="text-xs font-medium mr-2">{m.role === "assistant" ? "AI" : "You"}</span>
            <span className="text-sm">{m.content}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want to achieve. Example: 'Launch a personal finance app with budgeting, bill reminders, and reports by November.'"
          className="h-10 flex-1 rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          disabled={loading}
        />
        <Button onClick={send} disabled={loading} aria-disabled={loading} title={loading ? "Sending..." : "Send"}>
          {loading ? <Spinner /> : "Send"}
        </Button>
      </div>
    </aside>
  );
}
