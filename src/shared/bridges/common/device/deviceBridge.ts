import NativeDeviceBridge from './NativeDeviceBridge';

export const deviceBridge = {
  getAppVersion: () => NativeDeviceBridge.getAppVersion(),
  getBuildNumber: () => NativeDeviceBridge.getBuildNumber(),
  getSystemVersion: () => NativeDeviceBridge.getSystemVersion(),
  isTorchSupported: () => NativeDeviceBridge.isTorchSupported(),
};
