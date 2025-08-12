"use client";

import { create } from "zustand";

export type CapacityWindow = {
  day: number; // 0-6, Sun-Sat
  start: string; // HH:mm
  end: string; // HH:mm
};

export type PlanTask = {
  id: string;
  title: string;
  estimateHours: number;
  dependsOnIds: string[];
  phase: 1 | 2 | 3 | 4 | 5;
};

export type PlanState = {
  goal: string;
  deadline?: string;
  desiredTaskCount: number;
  windows: CapacityWindow[];
  timeOff: string[]; // ISO dates
  timezone: string;
  tasks: PlanTask[];
  roadmap?: {
    phases: Array<{
      index: 1 | 2 | 3 | 4 | 5;
      title: string;
      objectives: string[];
      acceptanceCriteria: string[];
      risks: string[];
    }>;
    assumptions: string;
  };
  setGoal: (goal: string) => void;
  setDeadline: (deadline?: string) => void;
  setDesiredTaskCount: (count: number) => void;
  setWindows: (windows: CapacityWindow[]) => void;
  setTimeOff: (dates: string[]) => void;
  setTimezone: (tz: string) => void;
  setTasks: (tasks: PlanTask[]) => void;
  setRoadmap: (roadmap: PlanState["roadmap"]) => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  goal: "",
  deadline: undefined,
  desiredTaskCount: 20,
  windows: [
    { day: 1, start: "09:00", end: "12:00" },
    { day: 1, start: "13:00", end: "17:00" },
    { day: 2, start: "09:00", end: "12:00" },
    { day: 2, start: "13:00", end: "17:00" },
    { day: 3, start: "09:00", end: "12:00" },
    { day: 3, start: "13:00", end: "17:00" },
    { day: 4, start: "09:00", end: "12:00" },
    { day: 4, start: "13:00", end: "17:00" },
    { day: 5, start: "09:00", end: "12:00" },
    { day: 5, start: "13:00", end: "17:00" },
  ],
  timeOff: [],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  tasks: [],
  roadmap: undefined,
  setGoal: (goal) => set({ goal }),
  setDeadline: (deadline) => set({ deadline }),
  setDesiredTaskCount: (desiredTaskCount) => set({ desiredTaskCount }),
  setWindows: (windows) => set({ windows }),
  setTimeOff: (timeOff) => set({ timeOff }),
  setTimezone: (timezone) => set({ timezone }),
  setTasks: (tasks) => set({ tasks }),
  setRoadmap: (roadmap) => set({ roadmap }),
}));
