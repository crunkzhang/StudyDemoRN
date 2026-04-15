import NativeNetBridge, {NativeHttpConfig} from './NativeNetBridge';

export const netBridge = {
  request: (config: NativeHttpConfig): Promise<unknown> =>
    NativeNetBridge.request(config),
  cancel: (requestId: string): void => NativeNetBridge.cancel(requestId),
};
