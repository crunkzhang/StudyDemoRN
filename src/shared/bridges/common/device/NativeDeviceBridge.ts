import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getAppVersion(): string;
  getBuildNumber(): string;
  getSystemVersion(): string;
  isTorchSupported(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceBridge');
