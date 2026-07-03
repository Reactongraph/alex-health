import { color } from "@/hooks/useTailwind";

import type { DashboardUser, DoseState, Protocol, QuickAction } from "../types";

/** Mock dashboard data (replace with an API/store later). */

/** Stagger delay (ms) between the dashboard's entering sections. */
export const SECTION_DELAY = 120;

export const DASHBOARD_USER: DashboardUser = {
  greeting: "Good Morning,",
  avatarUri: "https://i.pravatar.cc/160?img=12",
  online: true,
  hasNotifications: true,
};

export const PROTOCOL: Protocol = {
  medication: "Tirzepatide",
  doseLabel: "5 mg",
  dayCurrent: 12,
  dayTotal: 28,
  nextDoseLabel: "Next dose tomorrow",
  activeFraction: 0.78,
};

export const DOSE: DoseState = {
  currentMg: 5.0,
  stepMg: 0.5,
  minMg: 0,
  maxMg: 15,
  nextDoseDay: "Tomorrow",
  nextDoseTime: "8:00 AM",
};

/** Medication-level chart: values (%) + optional per-point callout tags. */
export const MED_LEVEL_VALUES = [62, 48, 55, 70, 82, 64, 58, 68, 52, 60];
export const MED_LEVEL_TAGS: (string | undefined)[] = [
  "5mg",
  undefined,
  undefined,
  undefined,
  "5mg",
  undefined,
  undefined,
  undefined,
  undefined,
  "Next",
];
export const MED_LEVEL_Y_LABELS = ["100%", "75%", "50%", "25%", "0%"];
export const MED_LEVEL_X_LABELS = ["May 1", "May 8", "May 15", "May 22", "May 29"];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "log-dose", label: "Log Dose", icon: "syringe", color: color.actionLogDose },
  { id: "calculator", label: "Calculator", icon: "calculator", color: color.actionCalculator },
  { id: "inventory", label: "Inventory", icon: "inventory", color: color.actionInventory },
  { id: "history", label: "History", icon: "history", color: color.actionHistory },
];
