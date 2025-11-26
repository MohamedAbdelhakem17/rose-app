import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import { Plus } from 'lucide-react';

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  // Convert dynamic route to number
  const currentPage = Number(page) || 1;

  // Fetch data
  const data = await getOccasions({ page: currentPage });
  if (!data) return null;

  console.log(data.metadata.totalPages);

  const TABLE_HEADERS = ['Name', 'Products'];

  return (
    <main className='bg-zinc-50 p-5 min-h-screen'>
      <section className='bg-white rounded-lg p-6 h-full'>
        {/* Page header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='font-semibold text-2xl'>All Occasions</h1>

          <Button className='flex items-center gap-2'>
            <Plus />
            Add a new occasion
          </Button>
        </div>

        {/* Table */}
        <Table className='table-auto w-full border-separate border-spacing-x-[30px]'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-max whitespace-nowrap'>Name</TableHead>
              <TableHead className='w-max whitespace-nowrap'>
                Products
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.occasions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className='text-center py-6 text-muted-foreground'
                >
                  No occasions found.
                </TableCell>
              </TableRow>
            ) : (
              data.occasions.map(occasion => (
                <TableRow key={occasion._id}>
                  <TableCell className='w-max whitespace-nowrap'>
                    {occasion.name}
                  </TableCell>

                  <TableCell className='w-max whitespace-nowrap'>
                    {occasion.productsCount}
                  </TableCell>

                  <TableCell className='w-full text-center'>
                    Delete | Edit
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          totalPages={data.metadata.totalPages}
          pathname='occasions'
        />
      </section>
    </main>
  );
}
