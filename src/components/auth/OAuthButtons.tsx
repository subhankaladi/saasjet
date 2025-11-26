"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";


export function OAuthButtons() {

    // GitHub OAuth Sign-In
    const handleGitHub = async () => {
        const res = await signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
        })

        if (res?.data) {
            console.log("Successfully signed in!", res);
        } else {
            console.log("Sign-in failed:", res?.error);
        }
    }

    // Google OAuth Sign-In
    const handleGoogle = async () => {
        const res = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        })

        if (res?.data) {
            console.log("Successfully signed in!", res);
        } else {
            console.log("Failed to sign in!", res?.error);

        }
    }

    return (
        <div className="space-y-3">
            <Button
                onClick={() => handleGitHub()}
                className="w-full rounded-xl flex gap-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
            >
                <Image src={"/github.svg"} alt="google icon" width={12} height={12} className="invert" /> Continue with GitHub
            </Button>
            <Button
                onClick={() => handleGoogle()}
                className="w-full rounded-xl flex gap-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
            >
                <Image src={"/google.svg"} alt="google icon" width={12} height={12} /> Continue with Google
            </Button>
        </div>
    );
}