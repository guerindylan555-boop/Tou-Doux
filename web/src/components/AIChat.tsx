"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settings";

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I can help turn your goal into a realistic plan. What are we building?" },
  ]);
  const [input, setInput] = useState("");
  const { apiKey } = useSettingsStore();

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
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
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "(AI error; check API key or try again)" }]);
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
        />
        <Button onClick={send}>Send</Button>
      </div>
    </aside>
  );
}
