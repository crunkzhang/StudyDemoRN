import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from '../../../app/navigation/Navigation';
import type {RouteName} from '../../../app/navigation/types';

const WECHAT_GREEN = '#07C160';

interface MenuItem {
  key: RouteName;
  label: string;
  params?: Record<string, unknown>;
}

const MENU: MenuItem[] = [
  {key: 'chat', label: '聊天详情 ChatDetail', params: {chatId: 'c1', contactName: '张伟'}},
  {key: 'userProfile', label: '个人资料 UserProfile', params: {userId: 'u1'}},
  {key: 'settings', label: '设置 Settings'},
  {key: 'moments', label: '朋友圈 Moments'},
  {key: 'videoChannel', label: '视频号 VideoChannel'},
  {key: 'scan', label: '扫一扫 Scan'},
  {key: 'shake', label: '摇一摇 Shake'},
  {key: 'nearby', label: '附近的人 Nearby'},
  {key: 'shopping', label: '购物 Shopping'},
  {key: 'search', label: '搜一搜 Search'},
  {key: 'gameCenter', label: '游戏中心 GameCenter'},
];

export default function DebugHomePage() {
  return (
    <View style={styles.home}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>WeChatRN</Text>
        <Text style={styles.homeSubtitle}>二级页面调试入口</Text>
      </View>
      <View style={styles.menu}>
        {MENU.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            onPress={() => {
              if (item.params) {
                (Navigation.push as any)(item.key, item.params);
              } else {
                (Navigation.push as any)(item.key);
              }
            }}>
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
});
