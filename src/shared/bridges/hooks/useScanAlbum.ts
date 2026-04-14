import {useMemo} from 'react';
import {scanBridge} from '../business/scan/scanBridge';
import type {ScanAlbumResult} from '../business/scan/scanBridge';

export type {ScanAlbumResult};

/**
 * Promise 形态：调用 openScanAlbum 直接 await 拿结果，
 * 不再需要额外订阅 listener。
 */
export function useScanAlbum() {
  return useMemo(
    () => ({
      openScanAlbum: (title?: string) => scanBridge.openAlbum({title}),
    }),
    [],
  );
}
