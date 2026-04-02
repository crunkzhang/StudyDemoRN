import * as navbar from '../native/navbarBridge';
import * as toast from '../native/toastBridge';
import * as scan from '../native/scanBridge';

const RNBridge = {
  navbar: {
    isSupported: navbar.isNavbarSupported,
    setOptions: navbar.setOptions,
    goBack: navbar.goBack,
    addRightItemPressListener: navbar.addRightItemPressListener,
  },
  toast: {
    show: toast.showToast,
    addDidShowListener: toast.addToastDidShowListener,
  },
  scan: {
    openAlbum: scan.openScanAlbum,
    addAlbumResultListener: scan.addScanAlbumResultListener,
  },
};

export {RNBridge};
export type {
  NavbarAppearance,
  NavbarMode,
  NavbarOptions,
  NavbarRightItem,
} from '../native/navbarBridge';
