import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from '../../../app/navigation/Navigation';
import {routes} from '../../../app/navigation/routes';
import type {RouteName} from '../../../app/navigation/types';

const WECHAT_GREEN = '#07C160';

const DEBUG_PARAMS: Partial<Record<RouteName, Record<string, unknown>>> = {
  chat: {chatId: 'c1', contactName: '张伟'},
  userProfile: {userId: 'u1'},
  gameContainer: {gameId: 'tapRush'},
};

const MENU = (Object.entries(routes) as [RouteName, {description: string; initPage?: boolean}][])
  .filter(([, cfg]) => !cfg.initPage)
  .map(([key, cfg]) => ({
    key,
    label: `${cfg.description} ${key}`,
    params: DEBUG_PARAMS[key],
  }));

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
