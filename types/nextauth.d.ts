import "better-auth";

//🔴 Most important don't forgot to customize these types it depends on what are you building!
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
