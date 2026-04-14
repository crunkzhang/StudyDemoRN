import {NativeModules} from 'react-native';

interface PushPayload {
  pageName: string;
  params: Record<string, unknown> | null;
  animated?: boolean;
}

interface PopPayload {
  animated?: boolean;
  result?: unknown;
}

const {NavigationBridge} = NativeModules as {
  NavigationBridge?: {
    push?: (payload: PushPayload) => void;
    pop?: (payload: PopPayload) => void;
    replace?: (payload: PushPayload) => void;
    pushURL?: (url: string) => void;
    replaceURL?: (url: string) => void;
  };
};

function warnMissing(method: string) {
  if (__DEV__) {
    console.warn(
      `[navigationBridge] NativeModules.NavigationBridge.${method} 未实现，已降级为 no-op`,
    );
  }
}

function assertSerializable(params: Record<string, unknown> | null | undefined) {
  if (!__DEV__ || !params) return;
  try {
    JSON.stringify(params);
  } catch (e) {
    console.warn('[navigationBridge] params 无法 JSON 序列化', e);
  }
}

export const navigationBridge = {
  push(payload: PushPayload) {
    assertSerializable(payload.params);
    if (!NavigationBridge?.push) {
      warnMissing('push');
      return;
    }
    NavigationBridge.push(payload);
  },
  pop(payload: PopPayload = {}) {
    if (!NavigationBridge?.pop) {
      warnMissing('pop');
      return;
    }
    NavigationBridge.pop(payload);
  },
  replace(payload: PushPayload) {
    assertSerializable(payload.params);
    if (!NavigationBridge?.replace) {
      warnMissing('replace');
      return;
    }
    NavigationBridge.replace(payload);
  },
  pushURL(url: string) {
    if (!NavigationBridge?.pushURL) {
      warnMissing('pushURL');
      return;
    }
    NavigationBridge.pushURL(url);
  },
  replaceURL(url: string) {
    if (!NavigationBridge?.replaceURL) {
      warnMissing('replaceURL');
      return;
    }
    NavigationBridge.replaceURL(url);
  },
};
