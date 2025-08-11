import { z } from "zod";

export const generatedTaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  estimateHours: z.number().int().min(1),
  dependsOnIds: z.array(z.string()).default([]),
  phase: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
});

export const aiPlanResponseSchema = z.object({
  tasks: z.array(generatedTaskSchema).min(1),
});

export type AiPlanResponse = z.infer<typeof aiPlanResponseSchema>;

export async function callOpenRouterPlan(
  apiKey: string,
  input: {
    goal: string;
    desiredTaskCount: number;
    windows: Array<{ day: number; start: string; end: string }>;
    timezone?: string;
  }
): Promise<AiPlanResponse> {
  const baseUrl = "https://openrouter.ai/api/v1";

  const system = `You are a planning assistant. Return strict JSON only. Do not include markdown fences.
Output schema:
{
  "tasks": [
    {
      "title": string,
      "estimateHours": integer (1-8),
      "dependsOnIds": string[],
      "phase": 1|2|3|4|5
    }, ...
  ]
}
Guidelines:
- Exactly ${input.desiredTaskCount} tasks total, split sensibly across 5 phases (1..5).
- Provide realistic estimates; phase 3 (build) may have slightly larger estimates.
- dependencies should reference previous tasks by id within the same phase when needed.
- Assign phase for each task using integers 1..5.`;

  const user = {
    goal: input.goal,
    desiredTaskCount: input.desiredTaskCount,
    windows: input.windows,
    timezone: input.timezone ?? "UTC",
  };

  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional but recommended by OpenRouter
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "Tou doux",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openrouter/auto",
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(user) },
      ],
      temperature: 0.2,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenRouter error: ${resp.status} ${text}`);
  }

  const json = await resp.json();
  const content: string = json?.choices?.[0]?.message?.content ?? "";

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Attempt to extract JSON block if model added extra text
    const match = content.match(/\{[\s\S]*\}$/);
    if (!match) {
      throw new Error("Failed to parse AI response as JSON");
    }
    parsed = JSON.parse(match[0]);
  }

  const result = aiPlanResponseSchema.parse(parsed);
  // assign ids if missing
  result.tasks = result.tasks.map((t, idx) => ({
    id: t.id ?? String(idx + 1),
    ...t,
  }));
  return result;
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callOpenRouterChat(
  apiKey: string,
  messages: ChatMessage[],
  opts?: { model?: string; temperature?: number }
): Promise<{ content: string }> {
  const baseUrl = "https://openrouter.ai/api/v1";
  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "Tou doux",
    },
    body: JSON.stringify({
      model: opts?.model || process.env.OPENROUTER_MODEL || "openrouter/auto",
      messages,
      temperature: opts?.temperature ?? 0.3,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenRouter error: ${resp.status} ${text}`);
  }
  const json = await resp.json();
  const content: string = json?.choices?.[0]?.message?.content ?? "";
  return { content };
}
