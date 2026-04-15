import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface NativeHttpConfig {
  method: string;
  domain: string;
  path: string;
  query?: {[k: string]: unknown};
  body?: {[k: string]: unknown};
  headers?: {[k: string]: string};
  timeout?: number;
  requestId?: string;
}

export interface Spec extends TurboModule {
  request(params: NativeHttpConfig): Promise<unknown>;
  cancel(requestId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetBridge');
