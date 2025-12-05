import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { DeleteProduct } from './delete-product';
import { cn } from '@/lib/utils/utils';

interface Iprops {
  products: ProductType[];
}
export async function ProductList({ products }: Iprops) {
  return (
    <Table className='mt-0.5'>
      <TableHeader>
        <TableRow className='bg-zinc-50 text-zinc-900 font-medium text-sm'>
          <TableHead className='w-40'>Name</TableHead>
          <TableHead className='w-40'>price</TableHead>
          <TableHead className='w-40'>Stock</TableHead>
          <TableHead className='w-40'>Sales</TableHead>
          <TableHead className='w-40'>Ratings</TableHead>
          <TableHead className=''></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow
            className=' h-16 hover:bg-maroon-50 text-sm text-zinc-800 '
            key={product._id}
          >
            <TableCell className='font-semibold '>{product.title}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className={cn(
              product.quantity <= 5 ? 'text-red-500' : '',
            )}>
              {product.quantity <= 0 ? 0 : product.quantity}
            </TableCell>
            <TableCell>{product.sold}</TableCell>
            <TableCell className=''>{product.rateAvg}</TableCell>
            <TableCell className=' h-16 flex items-center justify-center text-end gap-2.5'>
              <Link
                href='#'
                className='text-blue-600 w-14 h-7 bg-[#0063D01A] font-medium flex items-center justify-center gap-1 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-200'
              >
                <Pencil size={14} />
                Edit
              </Link>
              <DeleteProduct productId={product._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
