import { Section } from '@/components/layout';
import SectionTitle from '@/components/shared/sedtion-title';
import { getTranslations } from 'next-intl/server';
import ProductSliderList from '../../../(home-page)/_components/best-selling/_components/product-slider-list';

type RelatedProductsProps = {
  params: {
    id: string;
  };
};

export default async function RelatedProducts({
  params,
}: RelatedProductsProps) {
  // Params
  const { id } = params;

  // Translate
  const t = await getTranslations();

  // Fetch
  const response = await fetch(`${process.env.BASE_URL}/related/similar/${id}`);

  // Data
  const payload: ApiResponse<RelatedProducts> = await response.json();
  if (payload.message != 'success') {
    throw new Error(payload.message);
  }
  return (
    <Section>
      <SectionTitle title={t('related-products-header')} />
      {/* <ProductSliderList products={payload} /> */}
    </Section>
  );
}
