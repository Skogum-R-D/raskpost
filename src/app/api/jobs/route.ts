import { NextRequest, NextResponse } from "next/server";
import { auth } from "@auth";
import { db } from "@/lib/db";
import { PackageSize } from "@/types";

export async function GET() {
  try {
    const jobs = await db.job.findMany({
      where: { status: "OPEN" },
      include: { sender: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunne ikke hente oppdrag" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, pickupAddress, pickupLat, pickupLng, dropoffAddress, dropoffLat, dropoffLng, packageSize, weightKg, pricNok } = body;

    if (!title || !pickupAddress || !dropoffAddress || !packageSize || !pricNok) {
      return NextResponse.json({ error: "Mangler påkrevde felter" }, { status: 400 });
    }

    const validSizes: PackageSize[] = ["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"];
    if (!validSizes.includes(packageSize)) {
      return NextResponse.json({ error: "Ugyldig pakkestørrelse" }, { status: 400 });
    }

    const job = await db.job.create({
      data: {
        title,
        description: description || null,
        pickupAddress,
        pickupLat: pickupLat ?? 0,
        pickupLng: pickupLng ?? 0,
        dropoffAddress,
        dropoffLat: dropoffLat ?? 0,
        dropoffLng: dropoffLng ?? 0,
        packageSize,
        weightKg: weightKg ?? null,
        pricNok: Number(pricNok),
        senderId: session.user.id,
      },
    });

    return NextResponse.json({ id: job.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunne ikke opprette oppdrag" }, { status: 500 });
  }
}
