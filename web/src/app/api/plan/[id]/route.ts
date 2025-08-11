import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { plans, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_req: Request, context: unknown) {
  try {
    const paramsContainer = (context as { params?: unknown })?.params ?? context;
    const params = paramsContainer as { id: string };
    const db = getDb();
    const [plan] = await db.select().from(plans).where(eq(plans.id, params.id as string));
    if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const planTasks = await db.select().from(tasks).where(eq(tasks.planId, params.id as string));
    return NextResponse.json({ plan, tasks: planTasks });
  } catch {
    return NextResponse.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}
