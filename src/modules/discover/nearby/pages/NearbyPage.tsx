import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const users = [
  {
    id: '1',
    name: '林深',
    distance: '420m',
    signature: '最近在学拍胶片，也爱看展。',
    online: '5 分钟前在线',
  },
  {
    id: '2',
    name: 'Echo',
    distance: '1.2km',
    signature: '周末骑行，工作日喝精品咖啡。',
    online: '刚刚上线',
  },
  {
    id: '3',
    name: '野夏',
    distance: '2.8km',
    signature: '收藏黑胶，也写一点旅行随笔。',
    online: '12 分钟前在线',
  },
];

const NearbyPage: React.FC = () => {
  return (
    <PageScaffold navMode="native" title="附近的人" backgroundColor="#EDEDED">
      <View style={styles.container}>
        <View style={styles.headerMeta}>
          <Text style={styles.city}>上海 · 徐汇</Text>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterActive}>
            <Text style={styles.filterActiveText}>全部</Text>
          </View>
          <Text style={styles.filterText}>只看在线</Text>
          <Text style={styles.filterText}>同城优先</Text>
          <Text style={styles.filterText}>女生</Text>
        </View>

        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {users.map(user => (
            <View key={user.id} style={styles.userRow}>
              <Image
                source={{uri: `https://picsum.photos/seed/nearby_${user.id}/120/120`}}
                style={styles.avatar}
              />
              <View style={styles.userContent}>
                <View style={styles.userTitleRow}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.distance}>{user.distance}</Text>
                </View>
                <Text style={styles.signature}>{user.signature}</Text>
                <Text style={styles.online}>{user.online}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EDEDED'},
  headerMeta: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: '#F7F7F7',
  },
  city: {color: '#7D7D7D', fontSize: 14},
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  filterActive: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#07C160',
    marginRight: 14,
  },
  filterActiveText: {color: '#fff', fontSize: 13, fontWeight: '700'},
  filterText: {marginRight: 14, color: '#666', fontSize: 14},
  list: {flex: 1},
  userRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: StyleSheet.hairlineWidth,
  },
  avatar: {width: 56, height: 56, borderRadius: 8, marginRight: 12},
  userContent: {flex: 1},
  userTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {fontSize: 17, fontWeight: '700', color: '#111'},
  distance: {fontSize: 12, color: '#999'},
  signature: {marginTop: 6, fontSize: 14, color: '#585858', lineHeight: 20},
  online: {marginTop: 8, fontSize: 12, color: '#07C160'},
});

export default NearbyPage;
