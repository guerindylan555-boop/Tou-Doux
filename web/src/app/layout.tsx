import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import { useUiStore } from "@/store/ui";
import Spinner from "@/components/ui/spinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tou doux",
  description: "Turn any goal into a realistic plan you can actually follow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-only overlay component
  const Overlay = () => {
    const { loading, message } = useUiStore();
    if (!loading) return null;
    return (
      <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur flex items-center justify-center">
        <div className="rounded-xl border border-foreground/10 bg-background px-4 py-3 shadow">
          <Spinner label={message || "Working..."} />
        </div>
      </div>
    );
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNav />
        <Overlay />
        <div className="mx-auto max-w-6xl px-4 py-8 w-full">{children}</div>
      </body>
    </html>
  );
}
