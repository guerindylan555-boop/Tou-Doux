import { NextResponse } from "next/server";
import { z } from "zod";
import { generatePlaceholderPlan } from "@/lib/placeholderPlanner";
import { callOpenRouterPlan } from "@/lib/openrouter";

const bodySchema = z.object({
  goal: z.string().min(10),
  deadline: z.string().optional(),
  desiredTaskCount: z.number().int().min(5).max(200),
  windows: z.array(
    z.object({
      day: z.number().int().min(0).max(6),
      start: z.string(),
      end: z.string(),
    })
  ),
  timeOff: z.array(z.string()).default([]),
  timezone: z.string().default("UTC"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { goal, desiredTaskCount, windows, timezone } = bodySchema.parse(json);

    // API key priority: header x-user-api-key, else env OPENROUTER_API_KEY
    const headerKey = req.headers.get("x-user-api-key") || undefined;
    const envKey = process.env.OPENROUTER_API_KEY || undefined;
    const apiKey = headerKey || envKey;

    let tasks;
    if (apiKey) {
      try {
        const ai = await callOpenRouterPlan(apiKey, { goal, desiredTaskCount, windows, timezone });
        tasks = ai.tasks;
      } catch (e) {
        // Fallback to placeholder on AI failure
        tasks = generatePlaceholderPlan(goal, desiredTaskCount);
      }
    } else {
      tasks = generatePlaceholderPlan(goal, desiredTaskCount);
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
