'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  signIn('auth0', {
    callbackUrl: callbackUrl ?? '/dashboard/raffles',
  });
}
