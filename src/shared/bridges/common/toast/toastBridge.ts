import NativeToastBridge from './NativeToastBridge';

interface ToastOptions {
  message: string;
  duration?: number;
}

export const toastBridge = {
  show(options: ToastOptions) {
    if (!options.message) return;
    NativeToastBridge.show({
      message: options.message,
      duration: options.duration ?? 1.8,
    });
  },
};
