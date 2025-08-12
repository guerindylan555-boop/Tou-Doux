export type RoadmapStage = {
  index: 1 | 2 | 3 | 4 | 5;
  title: string;
  items: string[]; // exactly 7 under-stages
};

export type Roadmap = {
  stages: RoadmapStage[];
  assumptions: string;
};

const TITLES: Record<number, string> = {
  1: "Stage 01: Concept Definition & Requirements",
  2: "Stage 02: System Architecture & Planning",
  3: "Stage 03: Core Feature Implementation",
  4: "Stage 04: Enhancement & Optimization",
  5: "Validation, Launch & Sustainability",
};

export function generatePlaceholderRoadmap(goal: string): Roadmap {
  const goalShort = (goal || "Your goal").slice(0, 80);
  const stages: RoadmapStage[] = [1, 2, 3, 4, 5].map((idx) => ({
    index: idx as 1 | 2 | 3 | 4 | 5,
    title: TITLES[idx]!,
    items: Array.from({ length: 7 }).map((_, i) => placeholderItem(idx, i + 1, goalShort)),
  }));

  const assumptions = [
    "Availability follows your configured working windows.",
    "Items represent outcomes/milestones; durations are handled in tasks.",
    "Each stage contains exactly seven under-stages for planning clarity.",
  ].join(" ");

  return { stages, assumptions };
}

function placeholderItem(stage: number, n: number, goalShort: string): string {
  switch (stage) {
    case 1:
      return `${n}. Define aspect ${n} of ${goalShort}`;
    case 2:
      return `${n}. Plan subsystem ${n} and integration boundaries`;
    case 3:
      return `${n}. Implement core feature ${n} with tests`;
    case 4:
      return `${n}. Optimize area ${n} (perf, UX, or reliability)`;
    case 5:
      return `${n}. Validate & launch step ${n}; add sustainability practice`;
    default:
      return `${n}. Item`;
  }
}
