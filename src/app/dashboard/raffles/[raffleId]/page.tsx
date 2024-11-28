import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import FormCardSkeleton from '@/components/custom/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import RaffleForm from '../_components/raffle-form';
import { Raffle } from '@/types';

export const metadata = {
  title: 'Dashboard : Raffle View',
};

type PageProps = { params: { raffleId: string } };

const getRaffle = (): Promise<Raffle> => {
  return Promise.resolve({
    photo_url: '',
    name: 'string',
    description: 'string',
    created_at: 'string',
    price: 123,
    id: 1,
    category: 'string',
    updated_at: 'string',
  });
};

export default async function Page({ params }: PageProps) {
  const { raffleId } = params;
  let raffle: Raffle | null = null;

  let pageTitle = 'Create New Raffle';

  if (raffleId !== 'new') {
    raffle = await getRaffle();

    if (!raffle) {
      notFound();
    }
    pageTitle = 'Edit Raffle';
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <RaffleForm initialData={raffle} pageTitle={pageTitle} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
