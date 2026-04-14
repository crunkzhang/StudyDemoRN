export interface NavbarEventMap {
  'navbar.rightItemPress': {actionId: string};
}

export const NavbarTopic = {
  RightItemPress: 'navbar.rightItemPress',
} as const satisfies Record<string, keyof NavbarEventMap>;
