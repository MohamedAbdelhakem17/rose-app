import Pagination from '@/components/shared/pagination';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import OccasionsTable from './occasions-table';

export default async function OccasionsContent({ page }: { page: number }) {
  // Fetch data
  const data: GetOccasionsTypeResponse = await getOccasions({
    page: page,
  });

  if ('error' in data) return null;
  return (
    <>
      {/* Table */}
      <OccasionsTable occasions={data.occasions} />

      {/* Pagination */}
      <Pagination totalPages={data.metadata.totalPages} pathname='occasions' />
    </>
  );
}
