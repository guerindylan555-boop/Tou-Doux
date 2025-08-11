"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, NotebookPen } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  const linkClass = (href: string) =>
    `text-sm ${pathname === href ? "font-semibold" : "text-foreground/70 hover:text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-base font-semibold">
            Tou doux
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/roadmap" className={linkClass("/roadmap")}>Roadmap</Link>
            <Link href="/plan" className={linkClass("/plan")}>Plan</Link>
            <Link href="/notes" className={linkClass("/notes")}>Notes</Link>
            <Link href="/settings" className={linkClass("/settings")}>Settings</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href="/timeline" target="_blank" rel="noreferrer" title="Open timeline in new window">
            <Button asChild variant="outline" size="sm">
              <span>
                <Calendar className="h-4 w-4 mr-2 inline" />
                Timeline
              </span>
            </Button>
          </a>
          <Button variant="default" size="sm" title="New Note">
            <NotebookPen className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
      </div>
    </header>
  );
}
