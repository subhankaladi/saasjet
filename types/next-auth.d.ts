import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Extend the default Session interface.
   * We include `id` because we return it in the JWT.
   * `name` and `email` can be optional for OAuth users.
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
    } & DefaultSession["user"]
  }

  /**
   * Extend the default User interface.
   * This is what we return from authorize() or OAuth providers.
   */
  interface User extends DefaultUser {
    id: string
    name?: string | null
    email?: string | null
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend JWT interface to include the `id`.
   * This ensures TypeScript knows about `id` in the token.
   */
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
  }
}
