import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
});


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name, email, password} = RegisterSchema.parse(body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User registered", userId: newUser.id },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("REGISTER ERROR:", err);
        return NextResponse.json(
            { error: err.message || "Registration failed" },
            { status: 500 }
        );
    }
}
