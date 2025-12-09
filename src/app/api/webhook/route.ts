import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const maxDuration = 60;
export const bodyParser = false;  // IMPORTANT for Stripe signature validation


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-11-17.clover" });

function isSubscriptionInvoice(data: any) {
    return !!data.subscription;
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed.", err.message);
        return new NextResponse("Invalid signature", { status: 400 });
    }

    const data = event.data.object as any;

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                if (data.mode === "subscription") {
                    const subscription = await stripe.subscriptions.retrieve(data.subscription);
                    await updateUserSubscription(subscription.customer as string, subscription);
                } else if (data.mode === "payment") {
                    await prisma.user.update({
                        where: { stripeCustomerId: data.customer },
                        data: {
                            subscriptionStatus: "active",
                            subscriptionPlan: "lifetime",
                            currentPeriodEnd: null,
                        },
                    });
                }
                break;
            }

            case "invoice.paid": {
                if (!isSubscriptionInvoice(data)) break;
                const subscription = await stripe.subscriptions.retrieve(data.subscription);
                await updateUserSubscription(subscription.customer as string, subscription);
                break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.created":
            case "customer.subscription.deleted": {
                const subscription = data;
                await updateUserSubscription(subscription.customer as string, subscription);
                break;
            }
        }
    } catch (err) {
        console.error("Webhook handling error:", err);
        return new NextResponse("Webhook error", { status: 500 });
    }

    return new NextResponse("OK", { status: 200 });
}

async function updateUserSubscription(customerId: string, subscription: any) {
    const plan = subscription.items.data[0].price.id === process.env.STRIPE_PRICE_PRO
        ? "pro"
        : "unknown";

    const periodEnd = subscription.current_period_end
        ? new Date(Number(subscription.current_period_end) * 1000)
        : null;

    await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: {
            subscriptionStatus: subscription.status,
            subscriptionPlan: plan,
            currentPeriodEnd: periodEnd,
        },
    });
}
