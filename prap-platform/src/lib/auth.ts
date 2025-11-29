import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  
  if (session.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  
  return session;
}

export function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}