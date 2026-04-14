import {useContext} from 'react';
import {RouteParamsContext} from './RouteParamsContext';
import type {RouteName, RouteParamsMap} from './types';

export function useRouteParams<K extends RouteName>(name: K): RouteParamsMap[K] {
  const ctx = useContext(RouteParamsContext);
  if (!ctx) {
    if (__DEV__) {
      throw new Error(
        `[useRouteParams] 未找到 RouteParamsProvider。调用页: ${String(name)}`,
      );
    }
    return {} as RouteParamsMap[K];
  }
  if (__DEV__ && ctx.name !== name) {
    console.warn(
      `[useRouteParams] 请求 "${String(name)}" 但当前页是 "${String(ctx.name)}"`,
    );
  }
  return ctx.params as RouteParamsMap[K];
}
