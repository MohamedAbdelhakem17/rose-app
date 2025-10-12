'use client';

import { getQueryClient } from '@/lib/utils/Query';
import { QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
