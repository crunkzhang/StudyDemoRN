import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

interface OpenAlbumOptions {
  title?: string;
}

interface ScanAlbumResult {
  content?: string;
  source?: string;
}

const {ScanBridge} = NativeModules;

const isSupported = Platform.OS === 'ios' && !!ScanBridge;
const scanEmitter =
  isSupported && ScanBridge ? new NativeEventEmitter(ScanBridge) : null;

function openScanAlbum(options: OpenAlbumOptions = {}) {
  if (!isSupported || !ScanBridge?.openAlbum) {
    return;
  }

  ScanBridge.openAlbum({
    title: options.title ?? '从相册选取',
  });
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
