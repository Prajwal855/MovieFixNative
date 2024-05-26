import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const DEFAULT_RETRY_COUNT = 3;
export const DEFAULT_STALE_TIME = 0;
export const DEFAULT_CACHE_TIME = 300000; // 5 mins

export const queryClient = new QueryClient();

export const QueryStore = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
