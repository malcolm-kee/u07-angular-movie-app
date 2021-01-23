import * as React from 'react';
import { RouterContext } from 'src/react/modules/routing/context';
import type { ReactAdapterService } from './react-adapter.service';

export interface ReactAdapterProviderProps {
  children: React.ReactNode;
  adapter: ReactAdapterService;
}

export const ReactAdapterProvider = (props: ReactAdapterProviderProps) => {
  return (
    <RouterContext.Provider value={props.adapter.router}>
      {props.children}
    </RouterContext.Provider>
  );
};
