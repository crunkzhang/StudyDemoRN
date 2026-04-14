/**
 * 全局事件聚合入口 —— 所有业务模块的 EventMap / Topic 在这里汇总。
 * 新增模块事件：在对应 common/xxx/events.ts 定义，然后到这里 extends + 合并。
 */
import {NavbarTopic} from '../common/navbar/events';
import type {NavbarEventMap} from '../common/navbar/events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppEventMap extends NavbarEventMap {}

export const EventTopic = {
  ...NavbarTopic,
} as const;

export type AppEventName = keyof AppEventMap;
