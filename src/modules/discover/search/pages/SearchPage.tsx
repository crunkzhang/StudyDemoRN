import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const hotTopics = [
  'AI 原生应用设计',
  '附近咖啡店',
  '视频号爆款模板',
  '城市徒步路线',
  '设计系统规范',
];

const quickSections = ['公众号', '文章', '小程序', '视频号', '问一问', '服务'];

const SearchPage: React.FC = () => {
  return (
    <PageScaffold
      navMode="native"
      title="搜一搜"
      backgroundColor="#F7F7F7"
      navbarAppearance={{shadowHidden: true}}>
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder="搜索公众号、文章、服务或热词"
              placeholderTextColor="#909090"
              style={styles.searchInput}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>大家都在搜</Text>
            {hotTopics.map((topic, index) => (
              <View key={topic} style={styles.hotRow}>
                <Text style={[styles.rank, index < 3 && styles.rankHot]}>
                  {index + 1}
                </Text>
                <Text style={styles.hotText}>{topic}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>搜索分类</Text>
            <View style={styles.quickGrid}>
              {quickSections.map(item => (
                <View key={item} style={styles.quickItem}>
                  <Text style={styles.quickItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>猜你想搜</Text>
            <View style={styles.suggestionCard}>
              <Text style={styles.suggestionTitle}>附近咖啡店</Text>
              <Text style={styles.suggestionHint}>
                常用服务结果会优先展示，减少用户完整输入成本。
              </Text>
            </View>
            <View style={styles.suggestionCard}>
              <Text style={styles.suggestionTitle}>视频号爆款封面模板</Text>
              <Text style={styles.suggestionHint}>
                内容型搜索可以带出文章、视频号和服务结果的混排结构。
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7F7F7'},
  searchHeader: {paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
    paddingHorizontal: 12,
  },
  searchIcon: {fontSize: 18, color: '#8A8A8A'},
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#111',
    fontSize: 15,
    paddingVertical: 0,
  },
  section: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 12},
  hotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC',
  },
  rank: {width: 22, fontSize: 15, color: '#9A9A9A', fontWeight: '700'},
  rankHot: {color: '#FA5151'},
  hotText: {fontSize: 15, color: '#222'},
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    marginBottom: 10,
  },
  quickItemText: {fontSize: 14, color: '#333', fontWeight: '600'},
  suggestionCard: {
    borderRadius: 14,
    backgroundColor: '#F7F7F7',
    padding: 14,
    marginBottom: 10,
  },
  suggestionTitle: {fontSize: 15, fontWeight: '700', color: '#111'},
  suggestionHint: {marginTop: 8, fontSize: 13, lineHeight: 19, color: '#6E6E6E'},
});

export default SearchPage;
