import { NextResponse } from "next/server";
import { z } from "zod";
import { callOpenRouterChat, type ChatMessage } from "@/lib/openrouter";

const bodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.union([z.literal("system"), z.literal("user"), z.literal("assistant")]),
      content: z.string(),
    })
  ).min(1),
  model: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const input = bodySchema.parse(await req.json());

    const apiKey = req.headers.get("x-user-api-key") || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }

    const result = await callOpenRouterChat(apiKey, input.messages as ChatMessage[], { model: input.model });
    return NextResponse.json({ content: result.content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
