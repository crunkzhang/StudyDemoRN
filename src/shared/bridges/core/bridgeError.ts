/**
 * 桥接错误码枚举 —— 所有桥接 Promise reject 都使用这里的 code。
 * 原生侧 NSError.domain 使用 "BridgeError"，.code 字段与此对齐。
 */

export const BridgeError = {
  InvalidParams: 'INVALID_PARAMS',
  Cancelled: 'CANCELLED',
  PermissionDenied: 'PERMISSION_DENIED',
  NotAvailable: 'NOT_AVAILABLE',
  Internal: 'INTERNAL',
} as const;

export type BridgeErrorCode = (typeof BridgeError)[keyof typeof BridgeError];

export interface BridgeErrorLike {
  code: string;
  message: string;
  userInfo?: Record<string, unknown>;
}

export function isBridgeError(e: unknown): e is BridgeErrorLike {
  return typeof e === 'object' && e !== null && 'code' in e && 'message' in e;
}

/**
 * 业务错误 reject code 前缀。任何桥都可使用（来自哪个桥由 JS 调用点隐式区分）。
 * 必须与 iOS BridgeError.businessPrefix 保持一致。
 */
export const BUSINESS_PREFIX = 'BIZ_';

/** 非业务错误返回 null；业务错误返回数字 bizCode（非法数字也返回 null） */
export function parseBusinessCode(code: string): number | null {
  if (!code.startsWith(BUSINESS_PREFIX)) return null;
  const n = Number(code.slice(BUSINESS_PREFIX.length));
  return Number.isFinite(n) ? n : null;
}

/** 业务错误通用基类。所有桥的业务错误类型都继承它。 */
export class BridgeBizError extends Error {
  bizCode: number;
  constructor(bizCode: number, message: string) {
    super(message);
    this.bizCode = bizCode;
    this.name = 'BridgeBizError';
  }
}
