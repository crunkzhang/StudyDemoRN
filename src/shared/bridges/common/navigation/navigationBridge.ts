import NativeNavigationBridge from './NativeNavigationBridge';

interface PushPayload {
  pageName: string;
  params: Record<string, unknown> | null;
  animated?: boolean;
}

export type PresentationStyle = 'fullScreen' | 'sheet';

interface PresentPayload extends PushPayload {
  presentationStyle?: PresentationStyle;
}

interface PopPayload {
  animated?: boolean;
  result?: unknown;
}

export const navigationBridge = {
  push(payload: PushPayload) {
    NativeNavigationBridge.push(payload);
  },
  pop(payload: PopPayload = {}) {
    NativeNavigationBridge.pop(payload);
  },
  goBack(animated = true) {
    NativeNavigationBridge.goBack({animated});
  },
  present(payload: PresentPayload) {
    NativeNavigationBridge.present(payload);
  },
  dismiss(animated = true) {
    NativeNavigationBridge.dismiss({animated});
  },
  replace(payload: PushPayload) {
    NativeNavigationBridge.replace(payload);
  },
  pushURL(url: string) {
    NativeNavigationBridge.pushURL(url);
  },
  replaceURL(url: string) {
    NativeNavigationBridge.replaceURL(url);
  },
};
