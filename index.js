/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import ChatDetailPage from './src/modules/chat/pages/ChatDetailPage';
import GameCenterPage from './src/modules/discover/game/pages/GameCenterPage';
import MomentsPage from './src/modules/discover/moments/pages/MomentsPage';
import NearbyPage from './src/modules/discover/nearby/pages/NearbyPage';
import ScanPage from './src/modules/discover/scan/pages/ScanPage';
import SearchPage from './src/modules/discover/search/pages/SearchPage';
import ShakePage from './src/modules/discover/shake/pages/ShakePage';
import ShoppingPage from './src/modules/discover/shopping/pages/ShoppingPage';
import VideoChannelPage from './src/modules/discover/videoChannel/pages/VideoChannelPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';

function withSafeArea(Component) {
  return function SafeAreaWrappedComponent(props) {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('ChatDetail', () => ChatDetailPage);
AppRegistry.registerComponent('Moments', () => withSafeArea(MomentsPage));
AppRegistry.registerComponent('VideoChannel', () => withSafeArea(VideoChannelPage));
AppRegistry.registerComponent('Scan', () => withSafeArea(ScanPage));
AppRegistry.registerComponent('Shake', () => withSafeArea(ShakePage));
AppRegistry.registerComponent('Nearby', () => withSafeArea(NearbyPage));
AppRegistry.registerComponent('Shopping', () => withSafeArea(ShoppingPage));
AppRegistry.registerComponent('Search', () => withSafeArea(SearchPage));
AppRegistry.registerComponent('GameCenter', () => withSafeArea(GameCenterPage));
