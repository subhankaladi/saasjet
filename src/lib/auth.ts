import { betterAuth } from "better-auth";
import prisma from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { compare } from "bcryptjs";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,

  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true,

    // CUSTOM CREDENTIALS LOGIC HERE
    async validate({ email, password }: { email: string; password: string }) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) return null;

      const isValid = await compare(password, user.password);
      if (!isValid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },

})