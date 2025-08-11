import TimelineClient from "@/components/TimelineClient";
import Roadmap from "@/components/Roadmap";
import AIChat from "@/components/AIChat";
import QuickStart from "@/components/QuickStart";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="flex flex-col gap-10">
        <section className="mt-2">
          <h1 className="text-3xl font-semibold tracking-tight">Tou doux</h1>
          <p className="text-foreground/70 mt-2">
            Turn any goal into a realistic plan you can actually follow.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <QuickStart />
          </div>
          <AIChat />
        </section>

        <Roadmap />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-1">
            <label className="text-xs text-foreground/70">Desired task count</label>
            <input
              type="number"
              min={5}
              max={200}
              defaultValue={20}
              className="h-10 w-full rounded-md border border-foreground/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
        </div>

        <section className="w-full">
          <h2 className="text-base font-medium mb-2">Timeline</h2>
          <div className="w-full max-w-[1000px]">
            <TimelineClient />
          </div>
        </section>
      </main>
    </div>
  );
}
