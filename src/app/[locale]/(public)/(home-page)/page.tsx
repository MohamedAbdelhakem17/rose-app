import About from '@/components/features/about/about-component';
import Companies from '@/components/features/Companies/companies-component';
import FeaturesSection from '@/components/features/FeaturesSection';
import Gallery from '@/components/features/Gallery/gallery-component';
import HeroSection from '@/components/features/hero-section/hero-section';
import OccasionsSection from '@/components/features/OccasionsSection';
import { Section } from '@/components/layout';
import SectionName from '@/components/shared/section-name';
import SectionTitle from '@/components/shared/sedtion-title';
import AutoSlider from '../../../../components/features/testimonials/auto-slider';
import BestSelling from './_components/best-selling';
import MostPopular from './_components/most-popular/index';

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  return (
    <main>
      <Section className='max-w-7xl mx-auto '>
        <HeroSection />
        <OccasionsSection />
        <FeaturesSection />

        {/* Best selling section */}
        <BestSelling />

        {/* Most popular section */}
        <MostPopular searchParams={searchParams} />
      </Section>

      <About />
      <Gallery />

      <Section fullScreen className=' justify-center items-center'>
        <SectionName title='Testimonials' />
        <SectionTitle title='Real Words from Happy Customers' />
        <section className='mt-10 flex justify-center items-center w-full bg-maroon-50 dark:bg-zinc-700 py-16'>
          <AutoSlider />
        </section>
      </Section>

      <Companies />
    </main>
  );
}
