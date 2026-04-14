import NativeScanBridge from './NativeScanBridge';

export interface ScanAlbumResult {
  content: string;
  source?: string;
}

export const scanBridge = {
  async openAlbum(options: {title?: string} = {}): Promise<ScanAlbumResult> {
    const result = (await NativeScanBridge.openAlbum({
      title: options.title ?? '从相册选取',
    })) as ScanAlbumResult;
    return result;
  },
};
