import {useLayoutEffect} from 'react';
import {navbarBridge} from '../common/navbar/navbarBridge';
import {useAppEvent} from '../../events/core/useAppEvent';
import {EventTopic} from '../../events/core/registry';
import type {NavbarOptions} from '../common/navbar/navbarBridge';

function useNavbar(options: NavbarOptions) {
  const {animated, appearance, mode, rightItem, title} = options;

  useLayoutEffect(() => {
    navbarBridge.setOptions({animated, appearance, mode, rightItem, title});
  }, [animated, appearance, mode, rightItem, title]);
}

function useNavbarRightAction(actionId: string, handler: () => void) {
  useAppEvent(EventTopic.RightItemPress, event => {
    if (event.actionId === actionId) handler();
  });
}

export {useNavbar, useNavbarRightAction};
export type {
  NavbarAppearance,
  NavbarMode,
  NavbarOptions,
  NavbarRightItem,
} from '../common/navbar/navbarBridge';
