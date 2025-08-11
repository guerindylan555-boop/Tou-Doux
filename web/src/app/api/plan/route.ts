import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db/client";
import { plans, tasks as tasksTable } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

const createSchema = z.object({
  goal: z.string().min(10),
  deadline: z.string().optional(),
  desiredTaskCount: z.number().int().min(5).max(200),
  timezone: z.string().default("UTC"),
  tasks: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string(),
      estimateHours: z.number().int().min(1),
      dependsOnIds: z.array(z.string()).default([]),
      phase: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
    })
  ).min(1),
});

export async function POST(req: Request) {
  try {
    const input = createSchema.parse(await req.json());
    const db = getDb();

    const planId = createId();

    await db.insert(plans).values({
      id: planId,
      goal: input.goal,
      deadline: input.deadline ? new Date(input.deadline) : null,
      timezone: input.timezone,
      desiredTaskCount: input.desiredTaskCount,
    });

    const taskRows = input.tasks.map((t) => ({
      id: t.id || createId(),
      planId,
      title: t.title,
      estimateHours: t.estimateHours,
      dependsOnIds: t.dependsOnIds,
      phase: t.phase,
    }));

    if (taskRows.length > 0) {
      await db.insert(tasksTable).values(taskRows);
    }

    return NextResponse.json({ planId }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(_req: Request) {
  // Optional: list plans (minimal metadata). Could be restricted later.
  try {
    const db = getDb();
    const allPlans = await db.select({ id: plans.id, goal: plans.goal, createdAt: plans.createdAt }).from(plans);
    return NextResponse.json({ plans: allPlans });
  } catch {
    return NextResponse.json({ error: "Failed to list plans" }, { status: 500 });
  }
}
