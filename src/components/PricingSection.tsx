import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

const PricingSection = () => {
    return (
        <>
            {/* PRICING */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h2 className="text-3xl font-semibold text-center mb-16">Simple Pricing</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-4">Free</h3>
                            <p className="text-4xl font-bold mb-6">$0</p>
                            <ul className="space-y-3 text-white/70 mb-6">
                                <li>✔ Basic Dashboard</li>
                                <li>✔ Authentication</li>
                                <li>✔ Open Source</li>
                            </ul>
                            <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl">
                                Start Free
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="bg-white/10 border-white/20 backdrop-blur-xl rounded-2xl">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                            <p className="text-4xl font-bold mb-6">$9/mo</p>
                            <ul className="space-y-3 text-white/70 mb-6">
                                <li>✔ Advanced Dashboard</li>
                                <li>✔ Email Automation</li>
                                <li>✔ Analytics</li>
                                <li>✔ Priority Support</li>
                            </ul>
                            <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Lifetime Plan */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-4">Lifetime</h3>
                            <p className="text-4xl font-bold mb-6">$49</p>
                            <ul className="space-y-3 text-white/70 mb-6">
                                <li>✔ One-time payment</li>
                                <li>✔ Updates forever</li>
                                <li>✔ All modules included</li>
                            </ul>
                            <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl">
                                Get Lifetime
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default PricingSection