"use client";

import dynamic from "next/dynamic";

const TimelineNoSSR = dynamic(() => import("./Timeline"), { ssr: false });

export default function TimelineClient() {
  return <TimelineNoSSR />;
}
