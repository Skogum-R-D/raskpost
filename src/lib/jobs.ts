import { db } from "@/lib/db";
import { JobStatus } from "@/types";

export async function getOpenJobs() {
  return db.job.findMany({
    where: { status: "OPEN" },
    include: { sender: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobById(id: string) {
  return db.job.findUnique({
    where: { id },
    include: {
      sender: { select: { name: true, email: true } },
      driver: { select: { name: true, email: true } },
      tracking: { orderBy: { timestamp: "desc" }, take: 1 },
    },
  });
}

export async function createJob(data: {
  title: string;
  description?: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
  packageSize: string;
  weightKg?: number;
  pricNok: number;
  senderId: string;
}) {
  return db.job.create({ data: data as Parameters<typeof db.job.create>[0]["data"] });
}

export async function claimJob(jobId: string, driverId: string) {
  return db.job.update({
    where: { id: jobId, status: "OPEN" },
    data: { driverId, status: "CLAIMED" as JobStatus, claimedAt: new Date() },
  });
}
