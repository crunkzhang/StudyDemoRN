import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  show(payload: Object): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ToastBridge');
