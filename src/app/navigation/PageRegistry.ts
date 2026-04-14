import type {ComponentType} from 'react';
import {routes} from './routes';
import type {RouteName} from './types';

const cache = new Map<RouteName, ComponentType<any>>();

export const PageRegistry = {
  resolve(name: RouteName): ComponentType<any> | null {
    const entry = routes[name];
    if (!entry) {
      const msg = `[PageRegistry] unknown pageName: ${String(name)}`;
      if (__DEV__) {
        throw new Error(msg);
      }
      console.error(msg);
      return null;
    }
    let C = cache.get(name);
    if (!C) {
      C = entry.component();
      cache.set(name, C);
    }
    return C;
  },
  has(name: string): name is RouteName {
    return Object.prototype.hasOwnProperty.call(routes, name);
  },
};
