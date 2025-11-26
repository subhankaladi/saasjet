import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { SignInForm } from "@/components/auth/SignInForm";
import Link from "next/link";


export default function SignInPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md space-y-8 bg-neutral-900 p-10 rounded-2xl border border-neutral-800">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        <OAuthButtons />
        <div className="text-center text-neutral-500">OR</div>
        <SignInForm />
        <p className="text-sm text-neutral-500 text-center">
          <Link href="/sign-up" className="text-white underline">Create account</Link> ·
          <Link href="/forgot-password" className="text-white underline ml-1">Forgot password?</Link>
        </p>
      </div>
    </section>
  );
}