import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // TODO: replace with session user id once auth is wired up
    let driver = await db.user.findFirst({ where: { email: "driver@raskpost.no" } });
    if (!driver) {
      driver = await db.user.create({
        data: { name: "Demo sjåfør", email: "driver@raskpost.no", role: "DRIVER" },
      });
    }

    const job = await db.job.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: "Oppdrag ikke funnet" }, { status: 404 });
    if (job.status !== "OPEN") return NextResponse.json({ error: "Oppdraget er allerede reservert" }, { status: 409 });

    const updated = await db.job.update({
      where: { id },
      data: { driverId: driver.id, status: "CLAIMED", claimedAt: new Date() },
    });

    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunne ikke reservere oppdrag" }, { status: 500 });
  }
}
