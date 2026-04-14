export interface RouteParamsMap {
  debugHome: void;
  chat: {chatId?: string; contactName?: string};
  userProfile: {userId: string};
  settings: void;
  moments: void;
  videoChannel: void;
  scan: void;
  shake: void;
  nearby: void;
  shopping: void;
  search: {keyword?: string};
  gameCenter: void;
  gameContainer: {gameId: string};
}

export type RouteName = keyof RouteParamsMap;

export type ParamsArg<K extends RouteName> = RouteParamsMap[K] extends void
  ? []
  : [RouteParamsMap[K]];

export interface NavigationAPI {
  push<K extends RouteName>(name: K, ...args: ParamsArg<K>): void;
  pop(result?: unknown): void;
  replace<K extends RouteName>(name: K, ...args: ParamsArg<K>): void;
  pushURL(url: string): void;
  replaceURL(url: string): void;
}

export interface PageHostProps {
  pageName?: RouteName;
  params?: Record<string, unknown>;
}
