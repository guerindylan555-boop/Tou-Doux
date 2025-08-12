import { NextResponse } from "next/server";
import { z } from "zod";
import { callOpenRouterRoadmap } from "@/lib/openrouter";
import { generatePlaceholderRoadmap } from "@/lib/placeholderRoadmap";

const bodySchema = z.object({
  goal: z.string().min(20),
  desiredTaskCount: z.number().int().min(5).max(200).optional(),
});

export async function POST(req: Request) {
  try {
    const input = bodySchema.parse(await req.json());

    const apiKey = req.headers.get("x-user-api-key") || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      const roadmap = generatePlaceholderRoadmap(input.goal);
      return NextResponse.json(roadmap);
    }

    try {
      const roadmap = await callOpenRouterRoadmap(apiKey, input);
      return NextResponse.json(roadmap);
    } catch (e) {
      const roadmap = generatePlaceholderRoadmap(input.goal);
      return NextResponse.json(roadmap);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
