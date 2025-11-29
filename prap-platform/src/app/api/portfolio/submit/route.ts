import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, domain, url, resumeUrl } = await req.json();
    
    if (!userId || !url) {
      return NextResponse.json({ error: { message: "User ID and Portfolio URL are required" } }, { status: 400 });
    }

    // Check if portfolio exists for this user
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { userId }
    });

    let portfolio;
    if (existingPortfolio) {
      // Update existing portfolio
      portfolio = await prisma.portfolio.update({
        where: { userId },
        data: { 
          domain: domain || existingPortfolio.domain,
          url,
          resumeUrl: resumeUrl || existingPortfolio.resumeUrl,
          lastStatus: 200 
        },
      });
    } else {
      // Create new portfolio
      portfolio = await prisma.portfolio.create({
        data: { 
          userId, 
          domain: domain || "General", 
          url, 
          resumeUrl: resumeUrl || "",
          lastStatus: 200 
        },
      });
    }

    return NextResponse.json({ portfolio });
  } catch (err) {
    console.error("Portfolio submit error:", err);
    return NextResponse.json({ error: { message: "Failed to save portfolio" } }, { status: 500 });
  }
}