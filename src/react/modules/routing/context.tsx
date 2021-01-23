import * as React from 'react';
import type { Router } from '@angular/router';

export const RouterContext = React.createContext<Router>(null);

export const useRouter = () => React.useContext(RouterContext);
