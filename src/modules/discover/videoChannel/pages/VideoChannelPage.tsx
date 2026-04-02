import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const tabs = ['关注', '朋友赞过', '推荐', '直播'];

const featuredVideos = [
  {
    id: '1',
    title: '下班后的城市骑行记录',
    author: '阿凯的胶片日记',
    stats: '2.4w 播放 · 1.1k 点赞',
    desc: '把夜骑、街道反光和城市风声剪成 38 秒，画面会更像视频号首页该有的真实内容感。',
    cover: 'https://picsum.photos/seed/videochannel_cover_1/1200/1600',
  },
  {
    id: '2',
    title: '今天这顿家常饭太治愈了',
    author: '小禾的厨房',
    stats: '8.6k 播放 · 428 评论',
    desc: '热气、锅声和很短的文案就足够构成一条让人停下来的推荐内容。',
    cover: 'https://picsum.photos/seed/videochannel_cover_2/1200/1500',
  },
  {
    id: '3',
    title: '傍晚江边的风比想象中更轻',
    author: 'River Notes',
    stats: '1.7w 播放 · 903 点赞',
    desc: '把慢一点的生活瞬间做成更克制的竖屏内容，节奏会更接近真实视频号氛围。',
    cover: 'https://picsum.photos/seed/videochannel_cover_3/1200/1550',
  },
];

const creators = [
  {id: '1', name: '阿凯', tag: '夜骑'},
  {id: '2', name: '小禾', tag: '日常'},
  {id: '3', name: 'Rita', tag: '穿搭'},
  {id: '4', name: '野岛', tag: '旅行'},
  {id: '5', name: 'Mori', tag: '料理'},
];

const heroCover = 'https://picsum.photos/seed/videochannel_hero_cover/1400/1800';

const VideoChannelPage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <PageScaffold
      navMode="native"
      backgroundColor="#0F1014"
      navbarAppearance={{
        shadowHidden: true,
        tintColor: '#FFFFFF',
        transparent: true,
      }}
      showHeader={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: heroCover}}
          imageStyle={styles.heroImage}
          style={[styles.hero, {paddingTop: insets.top + 6}]}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroGlowLeft} />
          <View style={styles.heroGlowBottom} />

          <View style={styles.heroInner}>
            <Text style={styles.heroBrand}>视频号</Text>
            <Text style={styles.heroHeadline}>朋友赞过的内容，今晚更值得停留一会</Text>
            <Text style={styles.heroSubline}>
              推荐内容、朋友互动和创作者入口被收进一个完整首屏，透明导航栏也能真正服务氛围。
            </Text>

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
          </View>
        </ImageBackground>

        <View style={styles.creatorStrip}>
          <View style={styles.creatorStripHeader}>
            <Text style={styles.creatorStripTitle}>今晚值得看的人</Text>
            <Text style={styles.creatorStripHint}>按你最近停留的内容推荐</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorRow}>
            {creators.map(creator => (
              <View key={creator.id} style={styles.creatorItem}>
                <Image
                  source={{
                    uri: `https://picsum.photos/seed/video_creator_${creator.id}/160/160`,
                  }}
                  style={styles.creatorAvatar}
                />
                <Text style={styles.creatorName}>{creator.name}</Text>
                <Text style={styles.creatorTag}>{creator.tag}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.feed}>
          {featuredVideos.map((video, index) => (
            <View key={video.id} style={styles.videoBlock}>
              <ImageBackground
                source={{uri: video.cover}}
                imageStyle={styles.videoCoverImage}
                style={[styles.videoCover, index === 0 ? styles.primaryCover : styles.secondaryCover]}>
                <View style={styles.videoShade} />
                <View style={styles.videoTopRow}>
                  <Text style={styles.badge}>{index === 0 ? '推荐' : '朋友赞过'}</Text>
                  <Text style={styles.coverMeta}>00:{index === 0 ? '38' : index === 1 ? '24' : '41'}</Text>
                </View>
                <View style={styles.playButton}>
                  <Text style={styles.playText}>▶</Text>
                </View>
                <View style={styles.videoCopy}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoStats}>{video.stats}</Text>
                </View>
              </ImageBackground>

              <View style={styles.videoMetaRow}>
                <View style={styles.authorRow}>
                  <Image
                    source={{uri: `https://picsum.photos/seed/video_author_${video.id}/100/100`}}
                    style={styles.authorAvatar}
                  />
                  <View style={styles.authorCopy}>
                    <Text style={styles.authorName}>{video.author}</Text>
                    <Text style={styles.authorHint}>{video.desc}</Text>
                  </View>
                </View>
                <Text style={styles.moreIcon}>⋯</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1014'},
  contentContainer: {paddingBottom: 28},
  hero: {
    minHeight: 336,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 18,
    overflow: 'hidden',
  },
  heroImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,12,18,0.46)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroGlowLeft: {
    position: 'absolute',
    top: -40,
    left: -18,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  heroGlowBottom: {
    position: 'absolute',
    right: -20,
    bottom: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,170,96,0.08)',
  },
  heroInner: {
    position: 'relative',
  },
  heroBrand: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroHeadline: {
    marginTop: 10,
    maxWidth: 272,
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '800',
  },
  heroSubline: {
    marginTop: 10,
    maxWidth: 264,
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 19,
  },
  tabRow: {
    paddingTop: 16,
    gap: 10,
  },
  tabChip: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  activeTabChip: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '700',
  },
  activeTabText: {
    color: '#0F1014',
  },
  creatorStrip: {
    paddingTop: 14,
    paddingBottom: 10,
  },
  creatorStripHeader: {
    paddingHorizontal: 18,
  },
  creatorStripTitle: {
    color: '#F7F8FA',
    fontSize: 20,
    fontWeight: '800',
  },
  creatorStripHint: {
    marginTop: 6,
    color: '#8D93A0',
    fontSize: 13,
  },
  creatorRow: {
    paddingTop: 14,
    paddingHorizontal: 18,
    gap: 14,
  },
  creatorItem: {
    width: 72,
  },
  creatorAvatar: {
    width: 72,
    height: 72,
    borderRadius: 26,
  },
  creatorName: {
    marginTop: 9,
    color: '#F2F4F7',
    fontSize: 13,
    fontWeight: '700',
  },
  creatorTag: {
    marginTop: 4,
    color: '#8B919D',
    fontSize: 11,
  },
  feed: {
    paddingTop: 4,
    paddingHorizontal: 14,
  },
  videoBlock: {
    marginBottom: 24,
  },
  videoCover: {
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderRadius: 30,
    padding: 16,
  },
  primaryCover: {
    minHeight: 448,
  },
  secondaryCover: {
    minHeight: 368,
  },
  videoCoverImage: {
    borderRadius: 30,
  },
  videoShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,16,20,0.28)',
  },
  videoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(10,12,18,0.3)',
    color: '#FFFFFF',
    overflow: 'hidden',
    paddingHorizontal: 11,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '700',
  },
  coverMeta: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  playButton: {
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft: 3,
  },
  videoCopy: {
    maxWidth: 270,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  videoStats: {
    marginTop: 9,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
  },
  videoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    paddingTop: 14,
  },
  authorRow: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 12,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    marginRight: 10,
  },
  authorCopy: {flex: 1},
  authorName: {
    color: '#F2F4F7',
    fontSize: 15,
    fontWeight: '700',
  },
  authorHint: {
    marginTop: 5,
    color: '#8E95A3',
    fontSize: 12,
    lineHeight: 18,
  },
  moreIcon: {
    color: '#9DA3AF',
    fontSize: 22,
    lineHeight: 24,
  },
});

export default VideoChannelPage;
