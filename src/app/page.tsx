"use client"

import FAQSection from "@/components/FAQSection"
import FeaturesSection from "@/components/FeaturesSection"
import HeroSection from "@/components/HeroSection"
import PricingSection from "@/components/PricingSection"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
    </main>
  )
}
