import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

type NavbarMode = 'native' | 'rn';

interface NavbarRightItem {
  title: string;
  actionId: string;
}

interface NavbarAppearance {
  transparent?: boolean;
  backgroundColor?: string;
  tintColor?: string;
  titleColor?: string;
  shadowHidden?: boolean;
}

interface NavbarOptions {
  mode: NavbarMode;
  title?: string;
  animated?: boolean;
  rightItem?: NavbarRightItem;
  appearance?: NavbarAppearance;
}

const {NavbarBridge} = NativeModules;

const isNavbarSupported = Platform.OS === 'ios' && !!NavbarBridge;
const navbarEmitter = isNavbarSupported && NavbarBridge ? new NativeEventEmitter(NavbarBridge) : null;

function setOptions(options: NavbarOptions) {
  if (!isNavbarSupported || !NavbarBridge?.setOptions) {
    return;
  }

  NavbarBridge.setOptions({
    mode: options.mode,
    title: options.title ?? '',
    animated: options.animated ?? false,
    rightItem: options.rightItem ?? null,
    appearance: options.appearance ?? null,
  });
}

function goBack(animated = true) {
  if (!isNavbarSupported || !NavbarBridge?.goBack) {
    return;
  }

  NavbarBridge.goBack({animated});
}

function addRightItemPressListener(listener: (actionId: string) => void) {
  if (!navbarEmitter) {
    return {remove: () => {}};
  }

  return navbarEmitter.addListener(
    'navbarBridge:rightItemPress',
    (event: {actionId?: string}) => {
      if (event?.actionId) {
        listener(event.actionId);
      }
    },
  );
}

export {
  addRightItemPressListener,
  goBack,
  isNavbarSupported,
  setOptions,
};
export type {NavbarAppearance, NavbarMode, NavbarOptions, NavbarRightItem};
