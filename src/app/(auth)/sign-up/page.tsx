import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-md space-y-8 bg-neutral-900 p-10 rounded-2xl border border-neutral-800">
                <h1 className="text-3xl font-bold text-center">Create Account</h1>
                <OAuthButtons />
                <div className="text-center text-neutral-500">OR</div>
                <SignUpForm />
                <p className="text-sm text-neutral-500 text-center">
                    Already have an account? <Link href="/sign-in" className="text-white underline">Sign in</Link>
                </p>
            </div>
        </section>
    );
}