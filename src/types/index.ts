export type Role = "SENDER" | "DRIVER" | "ADMIN";
export type JobStatus = "OPEN" | "CLAIMED" | "PICKED_UP" | "DELIVERED" | "CANCELLED";
export type PackageSize = "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";

export interface Job {
  id: string;
  title: string;
  description: string | null;
  status: JobStatus;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
  packageSize: PackageSize;
  weightKg: number | null;
  pricNok: number;
  senderId: string;
  driverId: string | null;
  createdAt: string;
  claimedAt: string | null;
  pickedUpAt: string | null;
  deliveredAt: string | null;
  sender?: { name: string; email: string };
  driver?: { name: string; email: string } | null;
}

export interface CreateJobInput {
  title: string;
  description?: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
  packageSize: PackageSize;
  weightKg?: number;
  pricNok: number;
}

export const PACKAGE_SIZE_LABELS: Record<PackageSize, string> = {
  SMALL: "Liten (opp til 2 kg)",
  MEDIUM: "Medium (2–10 kg)",
  LARGE: "Stor (10–30 kg)",
  EXTRA_LARGE: "Ekstra stor (30+ kg)",
};

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  OPEN: "Ledig",
  CLAIMED: "Reservert",
  PICKED_UP: "Hentet",
  DELIVERED: "Levert",
  CANCELLED: "Avlyst",
};
