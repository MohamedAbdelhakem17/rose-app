import { Section } from '@/components/layout';
import FeaturesSection from '@/components/features/FeaturesSection';
import HeroSection from '@/components/features/hero-section/hero-section';
import OccasionsSection from '@/components/features/OccasionsSection';

export default function Home() {
  return (
    <main className='py-8'>
      <Section>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Welcome to Rose App
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            A modern Next.js application with a comprehensive design system and
            reusable UI components.
          </p>
        </div>
      </Section>

      {/* Occasions & Features Sections */}

      <Section className='w-[1279px] mx-auto mt-10 '>
        <HeroSection />
        <OccasionsSection />
        <FeaturesSection />
      </Section>
    </main>
  );
}
