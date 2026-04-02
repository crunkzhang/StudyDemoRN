import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const users = [
  {
    id: '1',
    name: '林深',
    distance: '420m',
    signature: '最近在学拍胶片，也爱看展。',
    online: '5 分钟前在线',
    mood: '今晚准备去看一个摄影展',
  },
  {
    id: '2',
    name: 'Echo',
    distance: '1.2km',
    signature: '周末骑行，工作日喝精品咖啡。',
    online: '刚刚上线',
    mood: '刚结束加班，想找人散散步',
  },
  {
    id: '3',
    name: '野夏',
    distance: '2.8km',
    signature: '收藏黑胶，也写一点旅行随笔。',
    online: '12 分钟前在线',
    mood: '最近在整理一份春日歌单',
  },
  {
    id: '4',
    name: '阿曜',
    distance: '3.1km',
    signature: '喜欢跑步，也会去城市边缘看日落。',
    online: '18 分钟前在线',
    mood: '如果天气好，想去滨江跑一圈',
  },
];

const filters = ['全部', '只看在线', '同城优先', '女生'];

const NearbyPage: React.FC = () => {
  return (
    <PageScaffold navMode="native" title="附近的人" backgroundColor="#E9ECE6">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: 'https://picsum.photos/seed/nearby_city_night/1200/900'}}
          imageStyle={styles.heroImage}
          style={styles.hero}>
          <View style={styles.heroShade} />
          <View style={styles.heroContent}>
            <View style={styles.cityPill}>
              <Text style={styles.cityPillText}>上海 · 徐汇</Text>
            </View>
            <Text style={styles.heroTitle}>今晚在附近，在线的人更多</Text>
            <Text style={styles.heroSubtitle}>
              以城市为背景，把附近的活跃状态和距离感放到第一屏，界面会更像一个真实的社交入口。
            </Text>
            <View style={styles.heroMetaRow}>
              <View style={styles.metaBlock}>
                <Text style={styles.metaValue}>128</Text>
                <Text style={styles.metaLabel}>当前在线</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaBlock}>
                <Text style={styles.metaValue}>4.6km</Text>
                <Text style={styles.metaLabel}>最近活跃半径</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.sheet}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {filters.map((filter, index) => (
              <View
                key={filter}
                style={[styles.filterChip, index === 0 && styles.filterChipActive]}>
                <Text
                  style={[
                    styles.filterChipText,
                    index === 0 && styles.filterChipTextActive,
                  ]}>
                  {filter}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>离你最近的活跃状态</Text>
            <Text style={styles.sectionHint}>按距离与最近活跃时间排序</Text>
          </View>

          {users.map((user, index) => (
            <View
              key={user.id}
              style={[styles.userRow, index !== users.length - 1 && styles.userRowBorder]}>
              <Image
                source={{uri: `https://picsum.photos/seed/nearby_${user.id}/160/160`}}
                style={styles.avatar}
              />
              <View style={styles.userContent}>
                <View style={styles.userTitleRow}>
                  <View style={styles.nameWrap}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userStatus}>{user.online}</Text>
                  </View>
                  <Text style={styles.distance}>{user.distance}</Text>
                </View>
                <Text style={styles.signature}>{user.signature}</Text>
                <Text style={styles.mood}>{user.mood}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E9ECE6'},
  contentContainer: {paddingBottom: 28},
  hero: {
    minHeight: 234,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 18,
  },
  heroImage: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,16,24,0.42)',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroContent: {position: 'relative'},
  cityPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cityPillText: {
    color: '#F4F7F1',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  heroTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
  },
  heroSubtitle: {
    marginTop: 8,
    maxWidth: 270,
    color: 'rgba(244,247,241,0.86)',
    fontSize: 12,
    lineHeight: 18,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  metaBlock: {minWidth: 92},
  metaValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  metaLabel: {
    marginTop: 6,
    color: 'rgba(244,247,241,0.72)',
    fontSize: 12,
  },
  metaDivider: {
    width: 1,
    height: 28,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  sheet: {
    marginTop: -12,
    marginHorizontal: 10,
    borderRadius: 28,
    backgroundColor: '#F8FAF5',
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  filterRow: {
    paddingBottom: 18,
  },
  filterChip: {
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: '#ECEFE7',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filterChipActive: {
    backgroundColor: '#182617',
  },
  filterChipText: {
    color: '#5E665C',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#F4F7F1',
  },
  sectionHeader: {
    paddingBottom: 10,
  },
  sectionTitle: {
    color: '#182617',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionHint: {
    marginTop: 6,
    color: '#7A8378',
    fontSize: 13,
  },
  userRow: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  userRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E5DB',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 20,
    marginRight: 14,
  },
  userContent: {flex: 1},
  userTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  nameWrap: {flex: 1, paddingRight: 12},
  userName: {
    color: '#182617',
    fontSize: 22,
    fontWeight: '800',
  },
  userStatus: {
    marginTop: 4,
    color: '#4C8A47',
    fontSize: 12,
    fontWeight: '600',
  },
  distance: {
    color: '#879081',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  signature: {
    marginTop: 10,
    color: '#4F584D',
    fontSize: 15,
    lineHeight: 22,
  },
  mood: {
    marginTop: 10,
    color: '#7C8678',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default NearbyPage;
