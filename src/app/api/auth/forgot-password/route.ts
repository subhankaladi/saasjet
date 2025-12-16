import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import crypto from "crypto";

const ForgotSchema = z.object({
    email: z.string().email("Invalid email"),
});


//🟢 It is Not Coomplete Yet but it is Coming Soon if you want to add own functionlity its up to you!
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = ForgotSchema.parse(body);

        const user = await prisma.user.findUnique({ where: { email } });

        // Always respond success — no email enumeration
        if (!user) {
            return NextResponse.json(
                { message: "If this email exists, reset link is sent." },
                { status: 200 }
            );
        }

        const token = crypto.randomUUID();

        // 🔴 TODO: Store token in database and send reset email
        // await prisma.passwordResetToken.create({
        //     data: {
        //         email,
        //         token,
        //     },
        // });

        // TODO: Send Email — Will implement later
        console.log("Reset Token:", token);

        return NextResponse.json(
            { message: "Reset link sent to email." },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("FORGOT PASSWORD ERROR:", err);
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
