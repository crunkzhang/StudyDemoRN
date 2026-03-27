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
import SettingsPage from './src/modules/settings/pages/SettingsPage';
import MomentsPage from './src/modules/discover/moments/pages/MomentsPage';

const WECHAT_GREEN = '#07C160';

type Page = 'home' | 'chat' | 'profile' | 'settings' | 'moments';

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
