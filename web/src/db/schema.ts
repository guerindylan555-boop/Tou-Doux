import { pgTable, text, integer, timestamp, smallint } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Plans represent a single goal and its configuration
export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  goal: text("goal").notNull(),
  deadline: timestamp("deadline", { mode: "date" }),
  timezone: text("timezone").notNull(),
  desiredTaskCount: integer("desired_task_count").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

// Tasks belong to a plan; dependencies are stored as string ids for simplicity
export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  planId: text("plan_id").notNull().references(() => plans.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  estimateHours: integer("estimate_hours").notNull(),
  dependsOnIds: text("depends_on_ids").array(),
  phase: smallint("phase").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

// Notes can be attached to a plan or a specific task
export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  planId: text("plan_id").notNull().references(() => plans.id, { onDelete: "cascade" }),
  taskId: text("task_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});
