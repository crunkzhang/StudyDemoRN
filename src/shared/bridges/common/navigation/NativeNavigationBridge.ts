import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  push(payload: Object): void;
  pop(payload: Object): void;
  goBack(payload: Object): void;
  present(payload: Object): void;
  dismiss(payload: Object): void;
  replace(payload: Object): void;
  pushURL(url: string): void;
  replaceURL(url: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NavigationBridge');
