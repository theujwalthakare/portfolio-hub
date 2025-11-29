import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId, domain, url, resumeUrl } = await req.json();
  if (!userId || !domain || !url || !resumeUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const portfolio = await prisma.portfolio.create({
      data: { userId, domain, url, resumeUrl, lastStatus: 200 },
    });
    return NextResponse.json({ portfolio });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 });
  }
}
