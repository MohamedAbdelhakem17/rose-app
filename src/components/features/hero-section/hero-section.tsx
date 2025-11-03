import SpecialGift from './components/special-gift';
import Carousel from './components/hero-carousel';

type HeroSectionProps = {
  params: { locale: string };
};

export default function HeroSection({ params }: HeroSectionProps) {
  return (
    <section className='mb-6 flex gap-6  h-[440px]'>
      <SpecialGift locale={params.locale} />
      <div className=' h-full rounded-lg flex justify-center items-center flex-1'>
        <Carousel />
      </div>
    </section>
  );
}
