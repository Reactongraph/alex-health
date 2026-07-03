import type { IconName } from "@/components/ui";

export interface DashboardUser {
  greeting: string;
  avatarUri: string;
  online: boolean;
  hasNotifications: boolean;
}

export interface Protocol {
  medication: string;
  doseLabel: string;
  dayCurrent: number;
  dayTotal: number;
  nextDoseLabel: string;
  /** Fraction active, 0..1. */
  activeFraction: number;
}

export interface DoseState {
  currentMg: number;
  stepMg: number;
  minMg: number;
  maxMg: number;
  nextDoseDay: string;
  nextDoseTime: string;
}

export type QuickActionId = "log-dose" | "calculator" | "inventory" | "history";

export interface QuickAction {
  id: QuickActionId;
  label: string;
  icon: IconName;
  color: string;
}
