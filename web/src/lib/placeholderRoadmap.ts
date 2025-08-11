export type RoadmapPhase = {
  index: 1 | 2 | 3 | 4 | 5;
  title: string;
  objectives: string[];
  acceptanceCriteria: string[];
  risks: string[];
};

export type Roadmap = {
  phases: RoadmapPhase[];
  assumptions: string;
};

export function generatePlaceholderRoadmap(goal: string): Roadmap {
  const goalShort = (goal || "Your goal").slice(0, 60);
  const phases: RoadmapPhase[] = [
    {
      index: 1,
      title: "Discover",
      objectives: [
        `Clarify scope and constraints for: ${goalShort}`,
        "Identify stakeholders and success criteria",
      ],
      acceptanceCriteria: [
        "Documented scope and non-goals",
        "List of measurable success criteria",
      ],
      risks: [
        "Scope creep from unclear requirements",
        "Hidden constraints affecting feasibility",
      ],
    },
    {
      index: 2,
      title: "Plan",
      objectives: [
        "Design approach and architecture",
        "Break work into phases and tasks",
      ],
      acceptanceCriteria: [
        "High-level architecture diagram",
        "Prioritized task list with estimates",
      ],
      risks: [
        "Over-optimistic estimates",
        "Blocked by external dependencies",
      ],
    },
    {
      index: 3,
      title: "Build",
      objectives: [
        "Implement core functionality",
        "Integrate and iterate with feedback",
      ],
      acceptanceCriteria: [
        "Feature-complete against scope",
        "Core flows tested end-to-end",
      ],
      risks: [
        "Integration issues",
        "Underestimated complexity",
      ],
    },
    {
      index: 4,
      title: "Validate",
      objectives: [
        "Test against acceptance criteria",
        "Fix defects and polish UX",
      ],
      acceptanceCriteria: [
        "All critical bugs resolved",
        "Meets performance and accessibility targets",
      ],
      risks: [
        "Quality gaps discovered late",
        "Timeline pressure reduces test depth",
      ],
    },
    {
      index: 5,
      title: "Launch",
      objectives: [
        "Finalize docs and rollout plan",
        "Ship and monitor",
      ],
      acceptanceCriteria: [
        "Release checklist complete",
        "Telemetry/alerts configured",
      ],
      risks: [
        "Post-launch incidents",
        "Adoption slower than expected",
      ],
    },
  ];

  const assumptions = [
    "Availability follows your configured working windows.",
    "Estimates represent focused work hours and exclude meetings.",
    "Dependencies are linear within phases unless noted.",
  ].join(" ");

  return { phases, assumptions };
}
