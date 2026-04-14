import NativePermissionBridge from './NativePermissionBridge';

export type PermissionStatus = 'granted' | 'denied' | 'restricted' | 'notDetermined';

export const permissionBridge = {
  requestCamera: () =>
    NativePermissionBridge.requestCameraPermission() as Promise<PermissionStatus>,
  requestAlbum: () =>
    NativePermissionBridge.requestAlbumPermission() as Promise<PermissionStatus>,
};
