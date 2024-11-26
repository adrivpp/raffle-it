import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import RaffleViewPage from '../_components/raffle-view-page';

export const metadata = {
  title: 'Dashboard : Raffle View',
};

type PageProps = { params: { raffleId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <RaffleViewPage raffleId={params.raffleId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
