import {BridgeBizError} from '../bridges/core/bridgeError';

/**
 * 域名枚举 —— 与原生 APIService 的 rawValue 逐一对应（common/user/discover/petMock）。
 * 新增域名需在 iOS WeChatNetAPI/APIService.swift 与此处同步添加。
 */
export enum NetDomain {
  Common = 'common',
  User = 'user',
  Discover = 'discover',
  PetMock = 'petMock',
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpConfig {
  method: HttpMethod;
  domain: NetDomain;
  path: string;
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
  requestId?: string;
  /** 未设置时使用该域的默认鉴权策略（iOS APIService.defaultRequiresAuth） */
  auth?: boolean;
}

/** 网络层错误：传输 / HTTP 状态 / 解析等非业务错误 */
export class NetError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'NetError';
  }
}

/** 业务错误：APIResp.code !== 0 */
export class NetBizError extends BridgeBizError {
  constructor(bizCode: number, message: string) {
    super(bizCode, message);
    this.name = 'NetBizError';
  }
}
