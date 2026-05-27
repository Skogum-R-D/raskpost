import Redis from "ioredis";

const globalForValkey = globalThis as unknown as { valkey: Redis };

export const valkey =
  globalForValkey.valkey ?? new Redis(process.env.VALKEY_URL!);

if (process.env.NODE_ENV !== "production") globalForValkey.valkey = valkey;

export function trackingChannel(jobId: string) {
  return `tracking:${jobId}`;
}
