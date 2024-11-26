import { fakeRaffles, Raffle } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import RaffleForm from './raffle-form';

type TRaffleViewPageProps = {
  raffleId: string;
};

export default async function RaffleViewPage({
  raffleId,
}: TRaffleViewPageProps) {
  let raffle = null;
  let pageTitle = 'Create New Raffle';

  if (raffleId !== 'new') {
    const data = await fakeRaffles.getRaffleById(Number(raffleId));
    raffle = data.raffle as Raffle;
    if (!raffle) {
      notFound();
    }
    pageTitle = `Edit Raffle`;
  }

  return <RaffleForm initialData={raffle} pageTitle={pageTitle} />;
}
