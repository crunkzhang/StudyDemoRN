import NativeNetBridge from './NativeNetBridge';

export interface HttpConfig {
  method: string;
  domain: string;
  path: string;
  query?: {[k: string]: unknown};
  body?: {[k: string]: unknown};
  headers?: {[k: string]: string};
  timeout?: number;
  requestId?: string;
  auth?: boolean;
}

export const netBridge = {
  request: (config: HttpConfig): Promise<unknown> =>
    NativeNetBridge.request(config as Object),
  cancel: (requestId: string): void => NativeNetBridge.cancel(requestId),
};
