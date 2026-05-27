import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { Role } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Alle felt er påkrevd" }, { status: 400 });
    }

    const validRoles: Role[] = ["SENDER", "DRIVER"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Ugyldig rolle" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "E-postadressen er allerede i bruk" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: { name, email, password: hashed, role },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunne ikke opprette bruker" }, { status: 500 });
  }
}
