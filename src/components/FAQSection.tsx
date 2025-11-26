import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQSection = () => {
    return (
        <>
            {/* FAQ */}
            <section className="max-w-5xl mx-auto px-6 py-24">
                <h2 className="text-3xl font-semibold text-center mb-16">Frequently Asked Questions</h2>

                <Accordion type="single" collapsible className="space-y-6 cursor-pointer">
                    {[
                        ["Is SaasJet free?", "Yes. The core is fully open-source and forever free."],
                        ["Can I use it for commercial SaaS?", "Yes, that's exactly what it's made for."],
                        ["Does it include authentication?", "Yes — Google, GitHub, and email login included."],
                        ["Will more features be added?", "Yes — billing, teams, analytics, emails, and more."],
                    ].map(([q, a], i) => (
                        <AccordionItem key={i} value={`item-${i}`} className='border-[#151515] cursor-pointer'>
                            <AccordionTrigger>{q}</AccordionTrigger>
                            <AccordionContent className="text-white/60">
                                {a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </>
    )
}

export default FAQSection