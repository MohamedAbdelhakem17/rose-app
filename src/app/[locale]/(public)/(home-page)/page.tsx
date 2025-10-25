import About from '@/components/features/about/about-component';
import Companies from '@/components/features/Companies/companies-component';
import Gallery from '@/components/features/Gallery/gallery-component';
import { Section } from '@/components/layout';
import SectionTitle from '@/components/shared/sedtion-title';
import AutoSlider from '../../../../components/features/testimonials/auto-slider';
import SectionName from '@/components/shared/section-name';
import HeroSection from '@/components/features/hero-section/hero-section';
import OccasionsSection from '@/components/features/OccasionsSection';
import FeaturesSection from '@/components/features/FeaturesSection';

export default async function Home() {
  return (
    <main className=''>
      {/* Occasions & Features Sections */}

      <Section className='max-w-7xl mx-auto '>
        <HeroSection />
        <OccasionsSection />
        <FeaturesSection />
      </Section>
      <About />
      <Gallery />
      <Companies />

      {/* Testimonials Section */}
      <Section fullScreen={true}>
        <SectionName title='Testimonials' />
        <SectionTitle title='Real Words from Happy Customers' />
        <section className=' mt-10 flex justify-center items-center w-full bg-maroon-50 dark:bg-zinc-700 py-16'>
          <AutoSlider />
        </section>
      </Section>
    </main>
  );
}
