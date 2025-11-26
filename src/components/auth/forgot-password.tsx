"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    async function handleReset(e: React.FormEvent) {
        e.preventDefault();

        // Validate with Zod
        const result = ForgotPasswordSchema.safeParse({ email });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError("");

        await fetch("/api/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        setSent(true);
    }

    return (
        <form onSubmit={handleReset} className="space-y-5">
            {!sent ? (
                <>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border-neutral-500"
                    />

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <Button
                        type="submit"
                        variant={"secondary"}
                        className="w-full rounded-xl cursor-pointer"
                    >
                        Send Reset Link
                    </Button>
                </>
            ) : (
                <p className="text-center text-green-400">
                    A password reset link has been sent!
                </p>
            )}
        </form>
    );
}
