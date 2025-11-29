import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    
    const { userId, role } = await request.json();
    
    if (!userId || !role) {
      return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
    }
    
    if (!["STUDENT", "FACULTY", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}