"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";


export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Sign in using Better Auth's email/password
        const res = await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        });

        if (res?.data) {
            console.log("Successfully signed in!", res);
        } else {
            console.log("Sign-in failed:", res?.error);
        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleSignIn} className="space-y-5">
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-neutral-500"
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-neutral-500"
            />
            <Button type="submit" variant={"secondary"} className="w-full rounded-xl cursor-pointer" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    );
}