import {useEffect, useMemo} from 'react';
import {RNBridge} from '../core/RNBridge';

interface ScanAlbumResult {
  content?: string;
  source?: string;
}

interface UseScanAlbumOptions {
  onResult?: (result: ScanAlbumResult) => void;
}

export function useScanAlbum(options: UseScanAlbumOptions = {}) {
  const {onResult} = options;

  useEffect(() => {
    if (!onResult) {
      return;
    }

    const subscription = RNBridge.scan.addAlbumResultListener(result => {
      onResult(result);
    });

    return () => {
      subscription.remove();
    };
  }, [onResult]);

  return useMemo(
    () => ({
      openScanAlbum(title = '从相册选取') {
        RNBridge.scan.openAlbum({title});
      },
    }),
    [],
  );
}
