import React from 'react';
import {Image, ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';

const accountRows = [
  {title: '账号与安全', detail: '手机号、密码与设备管理'},
  {title: '隐私', detail: '朋友权限、标签与黑名单'},
];

const preferenceRows = [
  {title: '新消息通知', detail: '横幅、声音、震动', type: 'switch' as const},
  {title: '聊天', detail: '字体、聊天背景、表情管理'},
  {title: '通用', detail: '模式、语言、存储空间'},
];

const serviceRows = [
  {title: '帮助与反馈', detail: '常见问题与功能建议'},
  {title: '关于微信', detail: '版本信息与协议说明'},
];

type RowItem = {
  title: string;
  detail: string;
  type?: 'switch';
};

const SettingsPage: React.FC = () => {
  const renderRows = (rows: RowItem[]) =>
    rows.map((row, index) => (
      <View
        key={row.title}
        style={[styles.row, index !== rows.length - 1 && styles.rowBorder]}>
        <View style={styles.rowCopy}>
          <Text style={styles.rowTitle}>{row.title}</Text>
          <Text style={styles.rowDetail}>{row.detail}</Text>
        </View>
        {row.type === 'switch' ? (
          <Switch value />
        ) : (
          <Text style={styles.rowArrow}>›</Text>
        )}
      </View>
    ));

  return (
    <PageScaffold
      navMode="native"
      title="设置"
      backgroundColor="#F3F4F6"
      navbarAppearance={{shadowHidden: true}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.accountPanel}>
          <Image
            source={{uri: 'https://picsum.photos/seed/settings_profile/160/160'}}
            style={styles.accountAvatar}
          />
          <View style={styles.accountCopy}>
            <Text style={styles.accountName}>用户</Text>
            <Text style={styles.accountMeta}>微信号 wxid_demo</Text>
            <Text style={styles.accountStatus}>当前设备已开启 Face ID 与消息通知</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>账号</Text>
          {renderRows(accountRows)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>偏好</Text>
          {renderRows(preferenceRows)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>服务与说明</Text>
          {renderRows(serviceRows)}
        </View>

        <View style={styles.logoutWrap}>
          <Text style={styles.logoutText}>退出登录</Text>
        </View>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F3F4F6'},
  content: {padding: 16, paddingBottom: 32},
  accountPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  accountAvatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    marginRight: 14,
  },
  accountCopy: {
    flex: 1,
  },
  accountName: {
    color: '#111317',
    fontSize: 20,
    fontWeight: '800',
  },
  accountMeta: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  accountStatus: {
    marginTop: 8,
    color: '#7C828D',
    fontSize: 12,
    lineHeight: 17,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#111317',
    fontSize: 15,
    fontWeight: '800',
    paddingTop: 8,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E7E9ED',
  },
  rowCopy: {
    flex: 1,
    paddingRight: 12,
  },
  rowTitle: {
    color: '#16181C',
    fontSize: 16,
    fontWeight: '700',
  },
  rowDetail: {
    marginTop: 5,
    color: '#7A818C',
    fontSize: 13,
  },
  rowArrow: {
    color: '#BCC1C9',
    fontSize: 24,
    lineHeight: 24,
  },
  logoutWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    marginTop: 2,
  },
  logoutText: {
    color: '#D94841',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default SettingsPage;
