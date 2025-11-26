import { TableCell, TableRow } from '@/components/ui/table';

export default async function OccasionsList({
  occasion,
}: {
  occasion: OccasionsType;
}) {
  return (
    <>
      <TableRow>
        {/* Occasion Name */}
        <TableCell className='whitespace-nowrap'>{occasion.name}</TableCell>

        {/* Occasions product count */}
        <TableCell className='w-full whitespace-nowrap '>
          {occasion.productsCount}
        </TableCell>

        {/* Actions */}
        <TableCell className='w-max whitespace-nowrap text-center'>
          <div className='flex items-center justify-center gap-4'>
            <span className='text-red-500 cursor-pointer'>Delete</span>
            <span className='text-blue-500 cursor-pointer'>Edit</span>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
