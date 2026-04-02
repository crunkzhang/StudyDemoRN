import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

interface ToastOptions {
  message: string;
  duration?: number;
}

const {ToastBridge} = NativeModules;

const isSupported = Platform.OS === 'ios' && !!ToastBridge;
const toastEmitter =
  isSupported && ToastBridge ? new NativeEventEmitter(ToastBridge) : null;

function showToast(options: ToastOptions) {
  if (!isSupported || !ToastBridge?.show) {
    return;
  }

  ToastBridge.show({
    message: options.message,
    duration: options.duration ?? 1.8,
  });
}

function addToastDidShowListener(listener: (message: string) => void) {
  if (!toastEmitter) {
    return {remove: () => {}};
  }

  return toastEmitter.addListener(
    'toastBridge:didShow',
    (event: {message?: string}) => {
      if (event?.message) {
        listener(event.message);
      }
    },
  );
}

export {addToastDidShowListener, showToast};
