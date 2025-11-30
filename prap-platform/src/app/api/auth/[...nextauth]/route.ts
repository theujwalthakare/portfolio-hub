import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Extend NextAuth types for session and JWT to include id and role
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
    github?: string;
  }
}

// Validate required environment variables
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error('Missing required GitHub OAuth environment variables');
}

if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_SECRET) {
  throw new Error('Missing required NextAuth environment variables');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        if (token.github) {
          (session.user as { id: string; role: string; name?: string | null; email?: string | null; image?: string | null; github?: string }).github = token.github;
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account && profile && account.provider === "github") {
        const githubUsername = (profile as { login?: string }).login;
        token.github = githubUsername;
        token.role = "student";
      }
      if (user) {
        token.role = "student";
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  events: {
    async signIn({ user, account }: { user: import("next-auth").User; account: import("next-auth").Account | null; profile?: import("next-auth").Profile; isNewUser?: boolean }) {
      console.log('Sign in event:', { user: user?.email, account: account?.provider ?? null });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };