import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getString(key: string): string | null;
  getBool(key: string): boolean;
  getNumber(key: string): number;
  setString(key: string, value: string): void;
  setBool(key: string, value: boolean): void;
  setNumber(key: string, value: number): void;
  remove(key: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CacheBridge');
