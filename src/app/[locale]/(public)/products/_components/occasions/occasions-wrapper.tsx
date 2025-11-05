import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import OccasionsList from './occasions-list';

export default async function OccasionsWrapper() {
  // Fetch occasions data
  const { occasions } = await getOccasions();

  return <OccasionsList occasions={occasions} />;
}
