
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// Extend NextAuth types for session and JWT to include id and role
import NextAuthDefault, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    role: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
  }
}


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        // Add github username to session if available
        if (token.github) {
          (session.user as any).github = token.github;
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // On first sign in, persist GitHub username to User.github
      if (account && profile && account.provider === "github") {
        // Typecast profile to GithubProfile to access login
        const githubUsername = (profile as { login?: string }).login;
        token.github = githubUsername;
        // Persist to DB if user exists and github is not set
        if (user && githubUsername) {
          try {
            // @ts-ignore
            const existing = await prisma.user.findUnique({ where: { id: user.id } });
            if (existing && !existing.github) {
              await prisma.user.update({ where: { id: user.id }, data: { github: githubUsername } });
            }
          } catch (e) {
            // Ignore DB errors here
          }
        }
      }
      if (user) {
        token.role = (user as any).role;
        // Add github to token if present
        if ((user as any).github) {
          token.github = (user as any).github;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
