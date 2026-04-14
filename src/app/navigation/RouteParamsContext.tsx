import React, {createContext} from 'react';
import type {RouteName} from './types';

export interface RouteParamsContextValue {
  name: RouteName;
  params: Record<string, unknown>;
}

export const RouteParamsContext = createContext<RouteParamsContextValue | null>(null);

export const RouteParamsProvider: React.FC<{
  value: RouteParamsContextValue;
  children: React.ReactNode;
}> = ({value, children}) => (
  <RouteParamsContext.Provider value={value}>{children}</RouteParamsContext.Provider>
);
