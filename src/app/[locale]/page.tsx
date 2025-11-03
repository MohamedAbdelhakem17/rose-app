
import { Section } from '@/components/layout';
import SectionTitle from '@/components/shared/sedtion-title';
import AutoSlider from './_components/testimonials/auto-slider';
import SectionName from '@/components/shared/section-name';
import About from '@/components/features/about/about-component';
import Gallery from '@/components/features/Gallery/gallery-component';
import Companies from '@/components/features/Companies/companies-component';

export default async function Home() {
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
