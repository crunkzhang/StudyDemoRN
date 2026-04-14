import * as navbar from '../common/navbar/navbarBridge';
import * as toast from '../common/toast/toastBridge';
import * as scan from '../business/scan/scanBridge';

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
} from '../common/navbar/navbarBridge';
