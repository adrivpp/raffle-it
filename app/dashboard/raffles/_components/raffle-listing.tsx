import { Raffle } from '@/constants/data';
import { fakeRaffles } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as RaffleTable } from '@/components/ui/table/data-table';
import { columns } from './raffle-tables/columns';

export default async function RaffleListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };

  const data = await fakeRaffles.getRaffles(filters);
  const totalRaffles = data.total_raffles;
  const raffles: Raffle[] = data.raffles;

  return (
    <RaffleTable columns={columns} data={raffles} totalItems={totalRaffles} />
  );
}
