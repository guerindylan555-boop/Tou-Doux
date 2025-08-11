export default function Roadmap() {
  const phases = [
    { title: "Phase 1: Discover", summary: "Clarify scope, constraints, and success criteria." },
    { title: "Phase 2: Plan", summary: "Outline approach, risks, and acceptance criteria." },
    { title: "Phase 3: Build", summary: "Implement core tasks with sensible dependencies." },
    { title: "Phase 4: Validate", summary: "Test against criteria; address issues and risks." },
    { title: "Phase 5: Launch", summary: "Finalize, document, and ship." },
  ];

  return (
    <div className="rounded-xl border border-foreground/10 p-4">
      <h2 className="text-sm font-medium mb-3">5‑phase roadmap</h2>
      <ol className="space-y-2">
        {phases.map((p, idx) => (
          <li key={idx} className="rounded-lg border border-foreground/10 p-3">
            <div className="text-sm font-medium">{p.title}</div>
            <div className="text-xs text-foreground/70 mt-1">{p.summary}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
