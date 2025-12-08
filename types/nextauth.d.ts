import "better-auth";

declare module "better-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            stripeCustomerId?: string;
        };
    }
}
