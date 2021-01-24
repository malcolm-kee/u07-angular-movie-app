import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterContext } from 'src/react/modules/routing/context';
import type { ReactAdapterService } from './react-adapter.service';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});
export interface ReactAdapterProviderProps {
  children: React.ReactNode;
  adapter: ReactAdapterService;
}

export const ReactAdapterProvider = (props: ReactAdapterProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterContext.Provider value={props.adapter.router}>
        {props.children}
      </RouterContext.Provider>
    </QueryClientProvider>
  );
};
