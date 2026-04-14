import type {ComponentType} from 'react';
import type {RouteName} from './types';

interface RouteEntry {
  path: string;
  component: () => ComponentType<any>;
}

export const routes: Record<RouteName, RouteEntry> = {
  debugHome: {
    path: '/debug',
    component: () => require('../../modules/debug/pages/DebugHomePage').default,
  },
  chat: {
    path: '/chat/:chatId',
    component: () => require('../../modules/chat/pages/ChatDetailPage').default,
  },
  userProfile: {
    path: '/profile/:userId',
    component: () => require('../../modules/profile/pages/UserProfilePage').default,
  },
  settings: {
    path: '/settings',
    component: () => require('../../modules/profile/pages/SettingsPage').default,
  },
  moments: {
    path: '/moments',
    component: () => require('../../modules/discover/moments/pages/MomentsPage').default,
  },
  videoChannel: {
    path: '/video-channel',
    component: () => require('../../modules/discover/videoChannel/pages/VideoChannelPage').default,
  },
  scan: {
    path: '/scan',
    component: () => require('../../modules/discover/scan/pages/ScanPage').default,
  },
  shake: {
    path: '/shake',
    component: () => require('../../modules/discover/shake/pages/ShakePage').default,
  },
  nearby: {
    path: '/nearby',
    component: () => require('../../modules/discover/nearby/pages/NearbyPage').default,
  },
  shopping: {
    path: '/shopping',
    component: () => require('../../modules/discover/shopping/pages/ShoppingPage').default,
  },
  search: {
    path: '/search',
    component: () => require('../../modules/discover/search/pages/SearchPage').default,
  },
  gameCenter: {
    path: '/games',
    component: () => require('../../modules/discover/game/pages/GameCenterPage').default,
  },
  gameContainer: {
    path: '/games/:gameId',
    component: () => require('../../modules/discover/game/pages/GameContainerPage').default,
  },
};
