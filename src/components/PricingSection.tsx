"use client";
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { pricingPlans } from '@/app/constants/constant'
import { useSession } from '@/lib/auth-client'

// we're extending the Session user type to include stripeCustomerId
interface UserWithStripe {
    stripeCustomerId?: string;
}


const PricingSection = () => {
    const { data: session } = useSession()

    console.log(session?.user);

    // Check if user is a paid customer
    const isPaidUser = (session?.user as UserWithStripe)?.stripeCustomerId ? true : false;

    async function handleCheckout(plan: string) {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session?.user.id, plan: plan.toLowerCase() }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
    }

    async function handleManageSubscription() {
        const res = await fetch("/api/manage-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session?.user.id }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            <h2 className="text-3xl font-semibold text-center mb-16">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => {
                    const isFree = plan.name === "Free";
                    const isDisabled = isFree || isPaidUser;

                    return (
                        <Card key={index} className={`${plan.cardStyle} backdrop-blur-xl rounded-2xl`}>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-semibold mb-4 text-white">{plan.name}</h3>
                                <p className="text-4xl font-bold mb-6 text-white/90">{plan.price}</p>
                                <ul className="space-y-3 text-white/70 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>✔ {feature}</li>
                                    ))}
                                </ul>
                                {isPaidUser && !isFree ? (
                                    <Button
                                        onClick={handleManageSubscription}
                                        className="w-full bg-white text-black hover:bg-white/90 rounded-xl cursor-pointer"
                                    >
                                        Manage Subscription
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleCheckout(plan.name)}
                                        disabled={isDisabled}
                                        className="w-full bg-white text-black hover:bg-white/90 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {plan.buttonText}
                                    </Button>
                                )}
                                {isPaidUser && !isFree && (
                                    <p className="text-white/60 text-sm text-center mt-2">
                                        Cancel or change your plan
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    )
}

export default PricingSection