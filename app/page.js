'use client'
import HeroSection from './components/HeroSection'
import VideoSection from './components/VideoSection'
import FeaturesSection from './components/FeaturesSection'
import AnimatedStats from './components/AnimatedStats'
import Testimonials from './components/Testimonials'
import PricingPlans from './components/PricingPlans'
import CTASection from './components/CTASection'
import FooterSection from './components/FooterSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Video Tutorials Section */}
      <VideoSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Animated Statistics */}
      <AnimatedStats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}