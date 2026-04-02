import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ChatDetailPage from './src/modules/chat/pages/ChatDetailPage';
import UserProfilePage from './src/modules/profile/pages/UserProfilePage';
import SettingsPage from './src/modules/profile/pages/SettingsPage';
import MomentsPage from './src/modules/discover/moments/pages/MomentsPage';
import GameCenterPage from './src/modules/discover/game/pages/GameCenterPage';
import NearbyPage from './src/modules/discover/nearby/pages/NearbyPage';
import ScanPage from './src/modules/discover/scan/pages/ScanPage';
import SearchPage from './src/modules/discover/search/pages/SearchPage';
import ShakePage from './src/modules/discover/shake/pages/ShakePage';
import ShoppingPage from './src/modules/discover/shopping/pages/ShoppingPage';
import VideoChannelPage from './src/modules/discover/videoChannel/pages/VideoChannelPage';

const WECHAT_GREEN = '#07C160';

type Page =
  | 'home'
  | 'chat'
  | 'profile'
  | 'settings'
  | 'moments'
  | 'videoChannel'
  | 'scan'
  | 'shake'
  | 'nearby'
  | 'shopping'
  | 'search'
  | 'games';

function App() {
  const [page, setPage] = useState<Page>('home');

  const renderPage = () => {
    switch (page) {
      case 'chat':
        return <ChatDetailPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'moments':
        return <MomentsPage onBack={() => setPage('home')} />;
      case 'videoChannel':
        return <VideoChannelPage />;
      case 'scan':
        return <ScanPage />;
      case 'shake':
        return <ShakePage />;
      case 'nearby':
        return <NearbyPage />;
      case 'shopping':
        return <ShoppingPage />;
      case 'search':
        return <SearchPage />;
      case 'games':
        return <GameCenterPage />;
      default:
        return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {page !== 'home' && page !== 'moments' && (
        <TouchableOpacity style={styles.backBtn} onPress={() => setPage('home')}>
          <Text style={styles.backText}>← 返回</Text>
        </TouchableOpacity>
      )}
      {renderPage()}
    </SafeAreaProvider>
  );
}

function HomePage({onNavigate}: {onNavigate: (p: Page) => void}) {
  return (
    <View style={styles.home}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>WeChatRN</Text>
        <Text style={styles.homeSubtitle}>二级页面调试入口</Text>
      </View>
      <View style={styles.menu}>
        {([
          {key: 'chat' as Page, label: '聊天详情 ChatDetail'},
          {key: 'profile' as Page, label: '个人资料 UserProfile'},
          {key: 'settings' as Page, label: '设置 Settings'},
          {key: 'moments' as Page, label: '朋友圈 Moments'},
          {key: 'videoChannel' as Page, label: '视频号 VideoChannel'},
          {key: 'scan' as Page, label: '扫一扫 Scan'},
          {key: 'shake' as Page, label: '摇一摇 Shake'},
          {key: 'nearby' as Page, label: '附近的人 Nearby'},
          {key: 'shopping' as Page, label: '购物 Shopping'},
          {key: 'search' as Page, label: '搜一搜 Search'},
          {key: 'games' as Page, label: '游戏中心 GameCenter'},
        ]).map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            onPress={() => onNavigate(item.key)}>
            <Text style={styles.menuText}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {flex: 1, backgroundColor: '#EDEDED'},
  homeHeader: {
    backgroundColor: WECHAT_GREEN,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  homeTitle: {color: '#fff', fontSize: 24, fontWeight: '700'},
  homeSubtitle: {color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4},
  menu: {marginTop: 20, backgroundColor: '#fff'},
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  menuText: {fontSize: 16, color: '#333'},
  arrow: {fontSize: 20, color: '#999'},
  backBtn: {
    position: 'absolute',
    top: 54,
    left: 12,
    zIndex: 10,
    padding: 6,
  },
  backText: {color: '#fff', fontSize: 16, fontWeight: '500'},
});

export default App;
