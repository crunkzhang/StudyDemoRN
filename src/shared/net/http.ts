import {parseBusinessCode} from '../bridges/core/bridgeError';
import {netBridge} from '../bridges/common/net/netBridge';
import {
  HttpConfig,
  HttpMethod,
  NetBizError,
  NetDomain,
  NetError,
} from './types';

interface SendOptions {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
  requestId?: string;
  auth?: boolean;
}

const send = async <T>(
  method: HttpMethod,
  domain: NetDomain,
  path: string,
  opts: SendOptions = {},
): Promise<T> => {
  const config: HttpConfig = {method, domain, path, ...opts};
  try {
    const data = await netBridge.request(config);
    return data as T;
  } catch (e: unknown) {
    const err = e as {code?: string; message?: string};
    const code = err?.code ?? 'UNKNOWN';
    const message = err?.message ?? 'Unknown error';
    const bizCode = parseBusinessCode(code);
    if (bizCode !== null) throw new NetBizError(bizCode, message);
    throw new NetError(code, message);
  }
};

export const http = {
  get: <T>(domain: NetDomain, path: string, opts?: Omit<SendOptions, 'body'>) =>
    send<T>('GET', domain, path, opts),
  post: <T>(domain: NetDomain, path: string, opts?: SendOptions) =>
    send<T>('POST', domain, path, opts),
  put: <T>(domain: NetDomain, path: string, opts?: SendOptions) =>
    send<T>('PUT', domain, path, opts),
  del: <T>(domain: NetDomain, path: string, opts?: SendOptions) =>
    send<T>('DELETE', domain, path, opts),
  cancel: (requestId: string) => netBridge.cancel(requestId),
};
