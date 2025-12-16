import React from 'react'
import { Card, CardContent } from './ui/card'
import { Check } from 'lucide-react'

const FeaturesSection = () => {
    return (
        <>
            {/* FEATURES */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h2 className="text-3xl font-semibold text-center mb-16">Everything You Need</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        "Better-Auth (Google, GitHub, Email)",
                        "Prisma + PostgreSQL Integration",
                        "Beautiful Dashboard UI",
                        "Billing Ready (Stripe)",
                        "API Routes Boilerplate",
                        "Production-Ready Codebase",
                    ].map((feature, i) => (
                        <Card
                            key={i}
                            className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl"
                        >
                            <CardContent className="p-6">
                                <Check className="w-5 h-5 text-green-400 mb-3" />
                                <p className="text-white/80">{feature}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    )
}

export default FeaturesSection