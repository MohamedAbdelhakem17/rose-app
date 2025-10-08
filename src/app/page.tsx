import About from '@/components/features/About/About';
import Companies from '@/components/features/Companies/Companies';
import Gallery from '@/components/features/Gallery/Gallery';
import { Section } from '@/components/layout';
import SectionTitle from '@/components/shared/sedtion-title';

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
          <SectionTitle title='Welcome to Rose App' />
        </div>
      </Section>
      <About />
      <Gallery />
      <Companies />
    </main>
  );
}
