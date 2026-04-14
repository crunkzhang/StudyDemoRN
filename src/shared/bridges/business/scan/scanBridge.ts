import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {getNativeModule, warnMissing} from '../../core/bridgeUtils';

interface OpenAlbumOptions {
  title?: string;
}

interface ScanAlbumResult {
  content?: string;
  source?: string;
}

interface Spec {
  openAlbum?: (payload: {title: string}) => void;
}

const MODULE = 'ScanBridge';
const m = getNativeModule<Spec>(MODULE);

const isSupported = Platform.OS === 'ios' && !!m;
const scanEmitter =
  isSupported && m ? new NativeEventEmitter(NativeModules[MODULE]) : null;

function openScanAlbum(options: OpenAlbumOptions = {}) {
  if (!isSupported) return;
  if (!m?.openAlbum) return warnMissing(MODULE, 'openAlbum');
  m.openAlbum({title: options.title ?? '从相册选取'});
}

function addScanAlbumResultListener(
  listener: (result: ScanAlbumResult) => void,
) {
  if (!scanEmitter) {
    return {remove: () => {}};
  }
  return scanEmitter.addListener(
    'scanBridge:albumResult',
    (event: ScanAlbumResult) => {
      listener(event ?? {});
    },
  );
}

export {addScanAlbumResultListener, openScanAlbum};
