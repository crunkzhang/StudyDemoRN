import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WECHAT_GREEN = '#07C160';

const SettingsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>设置</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Settings Page</Text>
        <Text style={styles.hint}>此页面将由原生项目集成加载</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EDEDED'},
  header: {
    backgroundColor: WECHAT_GREEN,
    paddingTop: 50,
    paddingBottom: 14,
    alignItems: 'center',
  },
  headerTitle: {color: '#fff', fontSize: 18, fontWeight: '600'},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  placeholder: {fontSize: 20, color: '#333', marginBottom: 8},
  hint: {fontSize: 14, color: '#999'},
});

export default SettingsPage;
