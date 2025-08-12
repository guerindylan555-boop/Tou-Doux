import { z } from "zod";

// Target shape
export const stageSchema = z.object({
  index: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  title: z.string(),
  items: z.array(z.string()).length(7),
});
export const roadmapSchema = z.object({
  stages: z.array(stageSchema).length(5),
  assumptions: z.string().default(""),
});

// Legacy/alternate shapes
const legacyPhaseSchema = z.object({
  index: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  title: z.string(),
  objectives: z.array(z.string()).optional(),
  acceptanceCriteria: z.array(z.string()).optional(),
  risks: z.array(z.string()).optional(),
});
const legacyRoadmapSchema = z.object({
  phases: z.array(legacyPhaseSchema).length(5),
  assumptions: z.string().optional(),
});

export function normalizeRoadmap(input: unknown): z.infer<typeof roadmapSchema> | undefined {
  const parsedStages = roadmapSchema.safeParse(input);
  if (parsedStages.success) return parsedStages.data;

  const parsedLegacy = legacyRoadmapSchema.safeParse(input);
  if (parsedLegacy.success) {
    const stages = parsedLegacy.data.phases.map((p) => {
      const merged = [
        ...(p.objectives || []),
        ...(p.acceptanceCriteria || []),
        ...(p.risks || []),
      ].filter(Boolean);
      const items = merged.length >= 7 ? merged.slice(0, 7) : [...merged, ...Array.from({ length: 7 - merged.length }, (_, i) => `Item ${i + 1}`)];
      return { index: p.index, title: p.title, items };
    });
    return { stages, assumptions: parsedLegacy.data.assumptions || "" };
  }

  return undefined;
}
