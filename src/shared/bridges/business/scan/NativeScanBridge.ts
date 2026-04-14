import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  openAlbum(payload: Object): Promise<Object>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ScanBridge');
