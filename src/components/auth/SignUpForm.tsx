"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const SignUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpValues>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignUpValues) => {
        try {
            setLoading(true);
            setErrorMessage("");

            // Use Better Auth sign-up method
            const { data: authData, error } = await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            });

            if (error) {
                setErrorMessage(error.message || "Sign up failed");
                console.error("Sign up error:", error);
                return;
            }

            // Success! User is created and automatically logged in
            console.log("Registered successfully!", authData.user);
            router.push("/sign-in");

        } catch (error: any) {
            console.error("Signup Error:", error);
            setErrorMessage(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
                <Input
                    placeholder="Name"
                    className="rounded-xl border-neutral-500"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-xl border-neutral-500"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* PASSWORD */}
            <div>
                <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-xl border-neutral-500"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={loading}
                variant="secondary"
                className="w-full rounded-xl cursor-pointer"
            >
                {loading ? "Creating..." : "Create Account"}
            </Button>
            {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
        </form>
    );
}