import { regions, users } from "@/lib/data";

type Region = (typeof regions)[number];

type User = (typeof users)[number];

export const statusLabels: Record<string, string> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  PENDING_ACKNOWLEDGMENT: "Pending",
  DRAFT: "Draft"
};

export const statusTone: Record<string, string> = {
  ACTIVE: "badge-info",
  COMPLETED: "badge-success",
  PENDING_ACKNOWLEDGMENT: "badge-warning",
  DRAFT: "badge"
};

export const complexityTone = (score?: number | null) => {
  if (!score && score !== 0) return "text-[var(--text-muted)]";
  if (score >= 7) return "text-[var(--warning)]";
  if (score >= 5) return "text-[var(--accent-secondary)]";
  return "text-[var(--success)]";
};

export const getRegionById = (id: string): Region | undefined =>
  regions.find((region: Region) => region.id === id);

export const getUserById = (id: string): User | undefined =>
  users.find((user: User) => user.id === id);

export const formatDateTime = (iso: string, timeZone = "UTC") => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

export const formatDate = (iso: string, timeZone = "UTC") => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
};

export const getTimeInZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);

const parseTimeToMinutes = (value: string) => {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
};

export const getRegionStatus = (region: Region, date = new Date()) => {
  const localTime = getTimeInZone(date, region.timezone);
  const minutes = parseTimeToMinutes(localTime);
  const workStart = parseTimeToMinutes(region.workStart);
  const workEnd = parseTimeToMinutes(region.workEnd);
  const handoverStart = parseTimeToMinutes(region.handoverStart);
  const handoverEnd = parseTimeToMinutes(region.handoverEnd);

  if (minutes >= handoverStart && minutes <= handoverEnd) {
    return { label: "In Handover", tone: "badge-info" };
  }
  if (minutes >= workStart && minutes <= workEnd) {
    return { label: "Active", tone: "badge-success" };
  }
  return { label: "Offline", tone: "badge" };
};

export const getRegionAccent = (regionId: string) => {
  switch (regionId) {
    case "SYD":
      return "var(--region-sydney)";
    case "SGP":
      return "var(--region-singapore)";
    case "BLR":
      return "var(--region-bangalore)";
    case "LON":
      return "var(--region-london)";
    case "NYC":
      return "var(--region-newyork)";
    default:
      return "var(--accent-secondary)";
  }
};

export const formatMinutes = (minutes?: number | null) => {
  if (!minutes && minutes !== 0) return "--";
  return `${minutes}m`;
};

export const getProgressPercent = (completed: number, total: number) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};
