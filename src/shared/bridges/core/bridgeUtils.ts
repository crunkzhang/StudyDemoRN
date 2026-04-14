import {NativeModules} from 'react-native';

/**
 * 桥接调用语义约定（暂未全部落地，仅记录规范）：
 * - void：命令式副作用（push / toast / navbar 设置 / scan 跳转）—— 使用本文件的 invokeVoid 风格
 * - Promise<T>：需要结果或失败（alert 按钮、权限查询、读剪贴板）—— 未来增加 invokePromise
 * - sync：常量 / 本地缓存读取 —— 未来随 TurboModule 接入
 */

export function getNativeModule<T>(name: string): T | undefined {
  return (NativeModules as Record<string, unknown>)[name] as T | undefined;
}

export function warnMissing(moduleName: string, method: string) {
  if (__DEV__) {
    console.warn(
      `[${moduleName}] NativeModules.${moduleName}.${method} 未实现，已降级为 no-op`,
    );
  }
}

export function assertSerializable(payload: unknown) {
  if (!__DEV__ || payload == null) return;
  try {
    JSON.stringify(payload);
  } catch (e) {
    console.warn('[bridge] payload 无法 JSON 序列化', e);
  }
}
