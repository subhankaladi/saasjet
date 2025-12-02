import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-11-17.clover",
});

export async function POST(req: NextRequest) {
    const { userId, plan } = await req.json();

    if (!userId || !plan) {
        return NextResponse.json(
            { error: "Missing params" },
            { status: 400 }
        )
    }

    // Get user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // handle user not found
    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }

    // Create Stripe customer if not exists
    let customerId = user.stripeCustomerId;
    if (!customerId) {
        const customer = await stripe.customers.create({ email: user.email });
        customerId = customer.id;
        await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
    }

    // Map plan to Stripe price ID
    const priceMap: Record<string, string> = {
        pro: process.env.STRIPE_PRICE_PRO!,
        lifetime: process.env.STRIPE_PRICE_LIFETIME!,
    };

    // Validate plan and get price ID
    const lineItemPriceId = priceMap[plan];
    if (!lineItemPriceId) {
        return NextResponse.json(
            { error: "Invalid plan" },
            { status: 400 }
        );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        mode: plan === "lifetime" ? "payment" : "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: lineItemPriceId, quantity: 1 }], // you can extend line items as per needs like for a ecommerce cart etc
        customer: customerId,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`, // you can redirect users where ever you want like /success page
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`, // home route or maybe cancel page as per your needs
    });

    return NextResponse.json({ url: session.url });
}
