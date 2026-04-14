import React, {useCallback} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GAMES} from '../data/games';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import {useNavbarRightAction} from '../../../../shared/bridges/hooks/useNavbar';
import {Navigation} from '../../../../app/navigation/Navigation';

const WECHAT_GREEN = '#07C160';

const GameCenterPage: React.FC = () => {
  const handleManage = useCallback(() => {
    // 先占位，后面可以扩展到搜索、最近玩过或排序管理
  }, []);

  useNavbarRightAction('game_center_manage', handleManage);

  return (
    <PageScaffold
      navMode="native"
      title="游戏中心"
      rightItem={{title: '管理', actionId: 'game_center_manage'}}
      backgroundColor="#0D1118">
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroPanel}>
            <Text style={styles.heroEyebrow}>ARCADE CHANNEL</Text>
            <Text style={styles.heroTitle}>今晚就玩点轻量、上头、两分钟能开局的</Text>
            <Text style={styles.heroText}>
              游戏中心不做功能堆叠，首屏像一张频道海报，先给出主推游戏，再给出可以立刻开始的入口。
            </Text>
            <View style={styles.heroStrip}>
              <Text style={styles.heroStripBadge}>主推试玩</Text>
              <Text style={styles.heroStripText}>Tap Rush · 15 秒反应挑战</Text>
            </View>
          </View>

          <View style={styles.channelRow}>
            <View style={styles.channelChipActive}>
              <Text style={styles.channelChipActiveText}>推荐</Text>
            </View>
            <Text style={styles.channelChip}>最近玩过</Text>
            <Text style={styles.channelChip}>轻竞技</Text>
            <Text style={styles.channelChip}>朋友在玩</Text>
          </View>

          {GAMES.map((game, index) => (
            <Pressable
              key={game.id}
              onPress={() => Navigation.push('gameContainer', {gameId: game.id})}
              style={[styles.gameCard, index === 0 && styles.gameCardFeature]}>
              <View style={styles.gameCardTop}>
                <View style={styles.gameBadge}>
                  <Text style={styles.gameBadgeText}>{index === 0 ? '主推' : '试玩'}</Text>
                </View>
                <Text style={styles.gameMeta}>{index === 0 ? '15 秒上头' : '轻量开局'}</Text>
              </View>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
              <Text style={styles.gameDescription}>
                {index === 0
                  ? '点击进入 RN 包裹的 WebView 容器，验证最小可运行链路。'
                  : '快速进入一局，不做复杂引导，让开始动作足够近。'}
              </Text>
              <View style={styles.startButton}>
                <Text style={styles.startButtonText}>开始游戏</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0D1118'},
  content: {
    padding: 18,
    paddingBottom: 32,
  },
  heroPanel: {
    padding: 18,
    borderRadius: 30,
    backgroundColor: '#141B28',
  },
  heroEyebrow: {
    color: '#97F1C0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  heroTitle: {
    marginTop: 8,
    color: '#fff',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
  },
  heroText: {
    marginTop: 9,
    color: '#A7B6C9',
    fontSize: 13,
    lineHeight: 19,
  },
  heroStrip: {
    marginTop: 14,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#0E1420',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroStripBadge: {fontSize: 12, fontWeight: '800', color: WECHAT_GREEN},
  heroStripText: {fontSize: 13, color: '#DDE7F5'},
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 14,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  channelChipActive: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ECFFF4',
  },
  channelChipActiveText: {fontSize: 15, fontWeight: '800', color: '#101C14'},
  channelChip: {fontSize: 15, color: '#7E8CA0', fontWeight: '600'},
  gameCard: {
    marginTop: 14,
    padding: 20,
    borderRadius: 26,
    backgroundColor: '#171F2D',
  },
  gameCardFeature: {backgroundColor: '#1B2536'},
  gameCardTop: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  gameBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#10351E',
  },
  gameBadgeText: {
    color: '#7DE3A8',
    fontSize: 12,
    fontWeight: '800',
  },
  gameMeta: {fontSize: 12, color: '#95A2B8', fontWeight: '700'},
  gameTitle: {
    marginTop: 14,
    color: '#F5F8FD',
    fontSize: 24,
    fontWeight: '800',
  },
  gameSubtitle: {
    marginTop: 4,
    color: '#A5B2C7',
    fontSize: 14,
    fontWeight: '600',
  },
  gameDescription: {
    marginTop: 10,
    color: '#B7C4D8',
    fontSize: 14,
    lineHeight: 22,
  },
  startButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: WECHAT_GREEN,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default GameCenterPage;
