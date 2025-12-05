import ProductDetails from './_components';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <ProductDetails productId={id} />
    </div>
  );
}
