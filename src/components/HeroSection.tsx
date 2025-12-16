import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'


const HeroSection = () => {
  return (
    <section className="relative mx-auto px-6 pt-32 pb-24 text-center mt-20 overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold leading-[1.20] tracking-tight mb-6 ">
        Build SaaS Apps Faster <br />
        <span className="bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
          with SaaSJet
        </span>
      </h1>

      <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
        A modern, open-source SaaS starter kit with authentication,
        dashboard UI, billing, and everything you need to launch your micro-SaaS.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="https://github.com/hasnainxdev/saasjet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-white text-black hover:bg-white/90 font-medium px-6 py-5 rounded-xl">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection