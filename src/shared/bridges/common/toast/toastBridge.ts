import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {getNativeModule, warnMissing} from '../../core/bridgeUtils';

interface ToastOptions {
  message: string;
  duration?: number;
}

interface Spec {
  show?: (payload: ToastOptions) => void;
}

const MODULE = 'ToastBridge';
const m = getNativeModule<Spec>(MODULE);

const isSupported = Platform.OS === 'ios' && !!m;
const toastEmitter =
  isSupported && m ? new NativeEventEmitter(NativeModules[MODULE]) : null;

function showToast(options: ToastOptions) {
  if (!isSupported) return;
  if (!m?.show) return warnMissing(MODULE, 'show');
  m.show({message: options.message, duration: options.duration ?? 1.8});
}

function addToastDidShowListener(listener: (message: string) => void) {
  if (!toastEmitter) {
    return {remove: () => {}};
  }
  return toastEmitter.addListener(
    'toastBridge:didShow',
    (event: {message?: string}) => {
      if (event?.message) listener(event.message);
    },
  );
}

export {addToastDidShowListener, showToast};
