import NativeCacheBridge from './NativeCacheBridge';

export const cacheBridge = {
  getString: (key: string) => NativeCacheBridge.getString(key),
  getBool: (key: string) => NativeCacheBridge.getBool(key),
  getNumber: (key: string) => NativeCacheBridge.getNumber(key),
  setString: (key: string, value: string) => NativeCacheBridge.setString(key, value),
  setBool: (key: string, value: boolean) => NativeCacheBridge.setBool(key, value),
  setNumber: (key: string, value: number) => NativeCacheBridge.setNumber(key, value),
  remove: (key: string) => NativeCacheBridge.remove(key),
};
