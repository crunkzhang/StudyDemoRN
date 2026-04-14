import {navigationBridge} from '../../shared/bridges/native/navigationBridge';
import type {NavigationAPI, ParamsArg, RouteName} from './types';

export const Navigation: NavigationAPI = {
  push<K extends RouteName>(name: K, ...args: ParamsArg<K>) {
    const params = (args[0] ?? null) as Record<string, unknown> | null;
    navigationBridge.push({pageName: name, params});
  },
  pop(result?: unknown) {
    navigationBridge.pop({result});
  },
  replace<K extends RouteName>(name: K, ...args: ParamsArg<K>) {
    const params = (args[0] ?? null) as Record<string, unknown> | null;
    navigationBridge.replace({pageName: name, params});
  },
  pushURL(url: string) {
    navigationBridge.pushURL(url);
  },
  replaceURL(url: string) {
    navigationBridge.replaceURL(url);
  },
};
