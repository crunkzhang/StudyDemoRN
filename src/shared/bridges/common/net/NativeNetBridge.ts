import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * Native 层接收 Object，类型约束由上层 netBridge.ts 的 HttpConfig 保证。
 * 这样 Codegen 不会生成 C++ 结构体，原生 Swift 端可直接用 NSDictionary 接收。
 */
export interface Spec extends TurboModule {
  request(params: Object): Promise<Object>;
  cancel(requestId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetBridge');
