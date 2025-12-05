import Pagination from '@/components/shared/pagination';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import OccasionsSearch from './occasions-search';
import OccasionsTable from './occasions-table';

export default async function OccasionsContent({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  // Fetch data
  const data: GetOccasionsTypeResponse = await getOccasions({
    page: page,
    search: search,
  });

  console.log(search);

  if ('error' in data) return null;
  return (
    <>
      {/* Search */}
      <OccasionsSearch search={search} />

      {/* Table */}
      <OccasionsTable occasions={data.occasions} />

      {/* Pagination */}
      <Pagination totalPages={data.metadata.totalPages} pathname='occasions' />
    </>
  );
}
