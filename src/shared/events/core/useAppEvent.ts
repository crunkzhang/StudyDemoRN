import {useEffect, useRef} from 'react';
import {EventBus} from './EventBus';
import type {AppEventMap} from './registry';

/**
 * React Hook：组件挂载时订阅指定事件，卸载时自动取消。
 * handler 用 ref 包裹，避免每次函数引用变化都重新订阅。
 */
export function useAppEvent<K extends keyof AppEventMap>(
  topic: K,
  handler: (event: AppEventMap[K]) => void,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const sub = EventBus.on(topic, (event: AppEventMap[K]) => {
      handlerRef.current(event);
    });
    return () => sub.remove();
  }, [topic]);
}
