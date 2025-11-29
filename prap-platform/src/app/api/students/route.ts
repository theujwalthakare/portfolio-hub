import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      include: { portfolio: true },
      orderBy: { name: "asc" },
    });
    
    console.log('Students API - Found:', students.length, 'users');
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json([], { status: 500 });
  }
}