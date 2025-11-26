import { ForgotPasswordForm } from "@/components/auth/forgot-password";


export default function ForgotPasswordPage() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-md space-y-8 bg-neutral-900 p-10 rounded-2xl border border-neutral-800">
                <h1 className="text-3xl font-bold text-center">Reset Password</h1>
                <ForgotPasswordForm />
            </div>
        </section>
    );
}