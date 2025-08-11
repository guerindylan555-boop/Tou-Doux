import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <AIChat />
        </div>
      </main>
    </div>
  );
}
