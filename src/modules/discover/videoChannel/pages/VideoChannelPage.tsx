import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const tabs = ['关注', '朋友赞过', '推荐', '直播'];

const featuredVideos = [
  {
    id: '1',
    title: '下班后的城市骑行记录',
    author: '阿凯的胶片日记',
    stats: '2.4w 播放 · 1.1k 点赞',
    gradient: '#2B2E36',
  },
  {
    id: '2',
    title: '今天这顿家常饭太治愈了',
    author: '小禾的厨房',
    stats: '8.6k 播放 · 428 评论',
    gradient: '#3A302C',
  },
];

const creators = ['M', 'L', 'K', 'R', 'Y'];

const VideoChannelPage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <PageScaffold
      navMode="native"
      backgroundColor="#111216"
      navbarAppearance={{
        shadowHidden: true,
        tintColor: '#FFFFFF',
        transparent: true,
      }}
      showHeader={false}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.heroHeader, {paddingTop: insets.top + 8}]}>
            <View style={styles.heroBackdrop}>
              <View style={styles.heroGlowPrimary} />
              <View style={styles.heroGlowSecondary} />
              <View style={styles.heroGlowSoft} />
            </View>
            <View style={styles.heroInner}>
              <Text style={styles.heroTitle}>视频号</Text>
              <Text style={styles.heroSubtitle}>看看朋友赞过和正在发生的新鲜内容</Text>
            </View>
          </View>

          <View style={styles.channelHeader}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabRow}>
              {tabs.map((tab, index) => (
                <View
                  key={tab}
                  style={[styles.tabChip, index === 2 && styles.activeTabChip]}>
                  <Text
                    style={[styles.tabText, index === 2 && styles.activeTabText]}>
                    {tab}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.creatorRow}>
              {creators.map(name => (
                <View key={name} style={styles.creatorItem}>
                  <View style={styles.creatorAvatar}>
                    <Text style={styles.creatorAvatarText}>{name}</Text>
                  </View>
                  <Text style={styles.creatorName}>创作者{name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.feed}>
            {featuredVideos.map(video => (
              <View key={video.id} style={styles.videoCard}>
                <View style={[styles.videoCover, {backgroundColor: video.gradient}]}>
                  <View style={styles.coverTopRow}>
                    <Text style={styles.liveBadge}>推荐</Text>
                    <Text style={styles.coverMeta}>00:38</Text>
                  </View>
                  <View style={styles.playButton}>
                    <Text style={styles.playText}>▶</Text>
                  </View>
                  <View style={styles.coverBottom}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                    <Text style={styles.videoStats}>{video.stats}</Text>
                  </View>
                </View>

                <View style={styles.videoMetaRow}>
                  <View style={styles.authorRow}>
                    <Image
                      source={{uri: `https://picsum.photos/seed/video_${video.id}/80/80`}}
                      style={styles.authorAvatar}
                    />
                    <View>
                      <Text style={styles.authorName}>{video.author}</Text>
                      <Text style={styles.authorHint}>朋友赞过 · 刚刚更新</Text>
                    </View>
                  </View>
                  <Text style={styles.moreIcon}>⋯</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#111216'},
  heroHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  heroBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111216',
  },
  heroGlowPrimary: {
    position: 'absolute',
    top: -54,
    left: -48,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(78, 96, 134, 0.08)',
  },
  heroGlowSecondary: {
    position: 'absolute',
    top: 28,
    right: -64,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(214, 133, 84, 0.06)',
  },
  heroGlowSoft: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -52,
    height: 112,
    backgroundColor: 'rgba(255,255,255,0.015)',
  },
  heroInner: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  heroTitle: {fontSize: 32, fontWeight: '800', color: '#fff'},
  heroSubtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#9BA2AF',
  },
  channelHeader: {
    paddingBottom: 10,
  },
  tabRow: {paddingHorizontal: 16, paddingBottom: 12, gap: 10},
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#1C1E25',
  },
  activeTabChip: {backgroundColor: '#fff'},
  tabText: {fontSize: 14, color: '#A9ADB8', fontWeight: '600'},
  activeTabText: {color: '#121318'},
  creatorRow: {paddingHorizontal: 16, paddingBottom: 12, gap: 12},
  creatorItem: {alignItems: 'center'},
  creatorAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#2A2D35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creatorAvatarText: {color: '#fff', fontWeight: '700'},
  creatorName: {marginTop: 7, fontSize: 12, color: '#B5BAC4'},
  feed: {paddingHorizontal: 12, paddingBottom: 28, paddingTop: 6},
  videoCard: {
    marginBottom: 18,
    borderRadius: 26,
    backgroundColor: '#1A1C22',
    overflow: 'hidden',
  },
  videoCover: {height: 370, padding: 16, justifyContent: 'space-between'},
  coverTopRow: {flexDirection: 'row', justifyContent: 'space-between'},
  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  coverMeta: {color: '#fff', fontSize: 12},
  playButton: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {color: '#fff', fontSize: 22},
  coverBottom: {},
  videoTitle: {fontSize: 24, fontWeight: '800', color: '#fff', lineHeight: 32},
  videoStats: {marginTop: 8, fontSize: 13, color: '#D6DAE3'},
  videoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  authorRow: {flexDirection: 'row', alignItems: 'center'},
  authorAvatar: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  authorName: {fontSize: 15, fontWeight: '700', color: '#fff'},
  authorHint: {marginTop: 4, fontSize: 12, color: '#969CAA'},
  moreIcon: {fontSize: 22, color: '#A5AAB4'},
});

export default VideoChannelPage;
