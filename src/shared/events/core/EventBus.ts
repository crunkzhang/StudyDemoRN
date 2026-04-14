import {NativeEventEmitter, NativeModules} from 'react-native';
import type {AppEventMap} from './registry';

/**
 * 统一事件总线 —— 原生侧唯一一个 RCTEventEmitter 子类 EventBridge，
 * 所有模块事件都经它 emit；JS 侧通过本模块订阅。
 */

const nativeModule = NativeModules.EventBridge;
const emitter = nativeModule ? new NativeEventEmitter(nativeModule) : null;

export const EventBus = {
  on<K extends keyof AppEventMap>(
    topic: K,
    handler: (event: AppEventMap[K]) => void,
  ) {
    if (!emitter) {
      if (__DEV__) {
        console.warn('[EventBus] NativeModules.EventBridge 未实现');
      }
      return {remove: () => {}};
    }
    return emitter.addListener(topic as string, handler);
  },
};
