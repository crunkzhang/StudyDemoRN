import {
  assertSerializable,
  getNativeModule,
  warnMissing,
} from '../../core/bridgeUtils';

interface PushPayload {
  pageName: string;
  params: Record<string, unknown> | null;
  animated?: boolean;
}

interface PopPayload {
  animated?: boolean;
  result?: unknown;
}

interface Spec {
  push?: (payload: PushPayload) => void;
  pop?: (payload: PopPayload) => void;
  replace?: (payload: PushPayload) => void;
  pushURL?: (url: string) => void;
  replaceURL?: (url: string) => void;
}

const MODULE = 'NavigationBridge';
const m = getNativeModule<Spec>(MODULE);

export const navigationBridge = {
  push(payload: PushPayload) {
    assertSerializable(payload.params);
    if (!m?.push) return warnMissing(MODULE, 'push');
    m.push(payload);
  },
  pop(payload: PopPayload = {}) {
    if (!m?.pop) return warnMissing(MODULE, 'pop');
    m.pop(payload);
  },
  replace(payload: PushPayload) {
    assertSerializable(payload.params);
    if (!m?.replace) return warnMissing(MODULE, 'replace');
    m.replace(payload);
  },
  pushURL(url: string) {
    if (!m?.pushURL) return warnMissing(MODULE, 'pushURL');
    m.pushURL(url);
  },
  replaceURL(url: string) {
    if (!m?.replaceURL) return warnMissing(MODULE, 'replaceURL');
    m.replaceURL(url);
  },
};
