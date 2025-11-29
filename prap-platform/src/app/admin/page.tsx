import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminClient from "@/components/AdminClient";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch all users and portfolios for admin view
  const students = await prisma.user.findMany({
    include: { portfolio: true },
    orderBy: { name: "asc" },
  });

  // Get system stats
  const totalUsers = await prisma.user.count();
  const totalPortfolios = await prisma.portfolio.count();
  const livePortfolios = await prisma.portfolio.count({
    where: { lastStatus: 200 }
  });

  const systemStats = {
    totalUsers,
    totalPortfolios,
    livePortfolios,
    errorPortfolios: totalPortfolios - livePortfolios
  };

  return <AdminClient session={session} students={students} systemStats={systemStats} />;
}