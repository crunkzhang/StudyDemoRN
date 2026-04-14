import NativeNavbarBridge from './NativeNavbarBridge';

export type NavbarMode = 'native' | 'rn';

export interface NavbarRightItem {
  title: string;
  actionId: string;
}

export interface NavbarAppearance {
  transparent?: boolean;
  backgroundColor?: string;
  tintColor?: string;
  titleColor?: string;
  shadowHidden?: boolean;
}

export interface NavbarOptions {
  mode: NavbarMode;
  title?: string;
  animated?: boolean;
  rightItem?: NavbarRightItem;
  appearance?: NavbarAppearance;
}

export const navbarBridge = {
  setOptions(options: NavbarOptions) {
    NativeNavbarBridge.setOptions({
      mode: options.mode,
      title: options.title ?? '',
      animated: options.animated ?? false,
      rightItem: options.rightItem ?? null,
      appearance: options.appearance ?? null,
    });
  },
};
