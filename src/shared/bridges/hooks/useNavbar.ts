import {useEffect, useLayoutEffect, useMemo} from 'react';
import {RNBridge} from '../core/RNBridge';
import type {NavbarOptions} from '../core/RNBridge';

function useNavbar(options: NavbarOptions) {
  const {animated, appearance, mode, rightItem, title} = options;

  useLayoutEffect(() => {
    RNBridge.navbar.setOptions({animated, appearance, mode, rightItem, title});
  }, [animated, appearance, mode, rightItem, title]);

  return useMemo(
    () => ({
      goBack(animatedValue = true) {
        RNBridge.navbar.goBack(animatedValue);
      },
      isSupported: RNBridge.navbar.isSupported,
    }),
    [],
  );
}

function useNavbarRightAction(actionId: string, handler: () => void) {
  useEffect(() => {
    const subscription = RNBridge.navbar.addRightItemPressListener(
      receivedActionId => {
        if (receivedActionId === actionId) {
          handler();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [actionId, handler]);
}

export {useNavbar, useNavbarRightAction};
export type {NavbarAppearance, NavbarMode, NavbarOptions, NavbarRightItem} from '../core/RNBridge';
