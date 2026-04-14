import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {getNativeModule, warnMissing} from '../../core/bridgeUtils';

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

interface Spec {
  setOptions?: (payload: Required<Omit<NavbarOptions, 'rightItem' | 'appearance'>> & {
    rightItem: NavbarRightItem | null;
    appearance: NavbarAppearance | null;
  }) => void;
  goBack?: (payload: {animated: boolean}) => void;
}

const MODULE = 'NavbarBridge';
const m = getNativeModule<Spec>(MODULE);

const isNavbarSupported = Platform.OS === 'ios' && !!m;
const navbarEmitter =
  isNavbarSupported && m ? new NativeEventEmitter(NativeModules[MODULE]) : null;

function setOptions(options: NavbarOptions) {
  if (!isNavbarSupported) return;
  if (!m?.setOptions) return warnMissing(MODULE, 'setOptions');
  m.setOptions({
    mode: options.mode,
    title: options.title ?? '',
    animated: options.animated ?? false,
    rightItem: options.rightItem ?? null,
    appearance: options.appearance ?? null,
  });
}

function goBack(animated = true) {
  if (!isNavbarSupported) return;
  if (!m?.goBack) return warnMissing(MODULE, 'goBack');
  m.goBack({animated});
}

function addRightItemPressListener(listener: (actionId: string) => void) {
  if (!navbarEmitter) {
    return {remove: () => {}};
  }
  return navbarEmitter.addListener(
    'navbarBridge:rightItemPress',
    (event: {actionId?: string}) => {
      if (event?.actionId) listener(event.actionId);
    },
  );
}

export {addRightItemPressListener, goBack, isNavbarSupported, setOptions};
export type {NavbarAppearance, NavbarMode, NavbarOptions, NavbarRightItem};
