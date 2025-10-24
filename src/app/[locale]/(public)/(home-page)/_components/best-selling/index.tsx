import BestSellingContent from './_components/best-selling-content';
import ProductSlider from './_components/product-slider';

export default function BestSelling() {
  return (
    <section className='grid grid-cols-4 my-24 gap-x-8'>
      {/* info  */}
      <div className='col-span-1 flex justify-between flex-col pb-2.5'>
        <BestSellingContent />
      </div>

      {/* Slider */}
      <ProductSlider />
    </section>
  );
}
