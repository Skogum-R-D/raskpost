import { NextRequest, NextResponse } from "next/server";
import { auth } from "@auth";
import { db } from "@/lib/db";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  if (session.user.role !== "DRIVER") {
    return NextResponse.json({ error: "Kun sjåfører kan ta oppdrag" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const job = await db.job.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: "Oppdrag ikke funnet" }, { status: 404 });
    if (job.status !== "OPEN") return NextResponse.json({ error: "Oppdraget er allerede reservert" }, { status: 409 });
    if (job.senderId === session.user.id) return NextResponse.json({ error: "Du kan ikke ta ditt eget oppdrag" }, { status: 403 });

    const updated = await db.job.update({
      where: { id },
      data: { driverId: session.user.id, status: "CLAIMED", claimedAt: new Date() },
    });

    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunne ikke reservere oppdrag" }, { status: 500 });
  }
}
