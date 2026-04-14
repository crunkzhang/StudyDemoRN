/**
 * 桥接错误码枚举 —— 所有桥接 Promise reject 都使用这里的 code。
 * 原生侧 NSError.domain 使用 "BridgeError"，.code 字段与此对齐。
 */

export const BridgeError = {
  InvalidParams: 'E_INVALID_PARAMS',
  Cancelled: 'E_CANCELLED',
  PermissionDenied: 'E_PERMISSION_DENIED',
  NotAvailable: 'E_NOT_AVAILABLE',
  Internal: 'E_INTERNAL',
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
