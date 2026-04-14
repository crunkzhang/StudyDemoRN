import type {ComponentType} from 'react';
import type {RouteName} from './types';

interface RouteEntry {
  description: string;
  component: () => ComponentType<any>;
  initPage?: boolean;
}

export const routes: Record<RouteName, RouteEntry> = {
  debugHome: {
    description: 'RN Debug 首页',
    component: () => require('../../modules/debug/pages/DebugHomePage').default,
    initPage: true,
  },
  chat: {
    description: '聊天详情',
    component: () => require('../../modules/chat/pages/ChatDetailPage').default,
  },
  userProfile: {
    description: '个人资料',
    component: () => require('../../modules/profile/pages/UserProfilePage').default,
  },
  settings: {
    description: '设置',
    component: () => require('../../modules/profile/pages/SettingsPage').default,
  },
  moments: {
    description: '朋友圈',
    component: () => require('../../modules/discover/moments/pages/MomentsPage').default,
  },
  videoChannel: {
    description: '视频号',
    component: () => require('../../modules/discover/videoChannel/pages/VideoChannelPage').default,
  },
  scan: {
    description: '扫一扫',
    component: () => require('../../modules/discover/scan/pages/ScanPage').default,
  },
  shake: {
    description: '摇一摇',
    component: () => require('../../modules/discover/shake/pages/ShakePage').default,
  },
  nearby: {
    description: '附近的人',
    component: () => require('../../modules/discover/nearby/pages/NearbyPage').default,
  },
  shopping: {
    description: '购物',
    component: () => require('../../modules/discover/shopping/pages/ShoppingPage').default,
  },
  search: {
    description: '搜一搜',
    component: () => require('../../modules/discover/search/pages/SearchPage').default,
  },
  gameCenter: {
    description: '游戏中心',
    component: () => require('../../modules/discover/game/pages/GameCenterPage').default,
  },
  gameContainer: {
    description: '游戏容器',
    component: () => require('../../modules/discover/game/pages/GameContainerPage').default,
  },
};

const initEntries = (Object.entries(routes) as [RouteName, RouteEntry][]).filter(
  ([, v]) => v.initPage,
);
if (initEntries.length !== 1) {
  throw new Error(
    `[routes] 必须有且仅有一个 initPage: true，当前为 ${initEntries.length}`,
  );
}
export const INIT_PAGE_NAME: RouteName = initEntries[0][0];
