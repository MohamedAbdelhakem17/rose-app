import Image from 'next/image';
import { cn } from '../../lib/utils/utils';
import Highlight from '../shared/highlight';
import { Section } from '../layout';
import companyImage1 from '../../../public/assets/images/companies/1.svg';
import companyImage2 from '../../../public/assets/images/companies/2.svg';
import companyImage3 from '../../../public/assets/images/companies/3.svg';
import companyImage4 from '../../../public/assets/images/companies/4.svg';
import companyImage5 from '../../../public/assets/images/companies/5.svg';
import companyImage6 from '../../../public/assets/images/companies/6.svg';

export default function Companies() {
  const companyImages = [
    companyImage1,
    companyImage2,
    companyImage3,
    companyImage4,
    companyImage5,
    companyImage6,
  ];
  return (
    <Section
      className={cn(
        '  flex flex-col items-center justify-center   transition-colors'
      )}
    >
      <div className='flex flex-col gap-section-xs bg-maroon-50 dark:bg-zinc-700 p-section-xs rounded-xl'>
        <h1 className='text-h-3 md:text-h-3 font-poppins font-semibold  text-maroon-700 dark:text-soft-pink-200  text-center'>
          Trusted by over <Highlight>4.5k+</Highlight> companies
        </h1>

        <div className='flex  justify-center gap-8 '>
          {companyImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Company logo ${i + 1}`}
              width={130}
              height={100}
              className='opacity-80 hover:opacity-100 transition'
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
