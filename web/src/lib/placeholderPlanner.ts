import type { PlanTask } from "@/store/plan";

export function generatePlaceholderPlan(goal: string, desiredTaskCount: number): PlanTask[] {
  const total = Math.max(5, Math.min(200, Math.round(desiredTaskCount || 20)));
  const phases: Array<1 | 2 | 3 | 4 | 5> = [1, 2, 3, 4, 5];
  const tasks: PlanTask[] = [];
  const perPhaseBase = Math.floor(total / 5);
  let remainder = total % 5;

  for (const phase of phases) {
    const countForPhase = perPhaseBase + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
    for (let i = 0; i < countForPhase; i++) {
      const id = `${phase}-${i + 1}`;
      const estimateHours = phase === 3 ? randInt(2, 5) : randInt(1, 3);
      const dependsOnIds: string[] = i > 0 ? [`${phase}-${i}`] : [];
      const title = phaseTitle(phase, goal, i + 1);
      tasks.push({ id, title, estimateHours, dependsOnIds, phase });
    }
  }
  return tasks;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function phaseTitle(phase: 1 | 2 | 3 | 4 | 5, goal: string, idx: number) {
  switch (phase) {
    case 1:
      return `Discover: clarify scope (${idx})`;
    case 2:
      return `Plan: outline approach (${idx})`;
    case 3:
      return `Build: implement core (${idx})`;
    case 4:
      return `Validate: test against criteria (${idx})`;
    case 5:
      return `Launch: finalize & ship (${idx})`;
  }
}
