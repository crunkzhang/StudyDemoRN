import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GAMES, GameDefinition} from '../data/games';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import {useNavbarRightAction} from '../../../../shared/bridges/hooks/useNavbar';

const WECHAT_GREEN = '#07C160';

const GameCenterPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameDefinition | null>(null);
  const handleManage = useCallback(() => {
    // 先占位，后面可以扩展到搜索、最近玩过或排序管理
  }, []);

  useNavbarRightAction('game_center_manage', handleManage);

  if (selectedGame) {
    const GameContainerPage = require('./GameContainerPage').default as React.ComponentType<{
      game: GameDefinition;
      onBack: () => void;
    }>;

    return (
      <GameContainerPage
        game={selectedGame}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  return (
    <PageScaffold
      navMode="native"
      title="游戏中心"
      rightItem={{title: '管理', actionId: 'game_center_manage'}}
      backgroundColor="#F4F7F3">
      <View style={styles.container}>
        <View style={styles.headerMeta}>
          <Text style={styles.subtitle}>先验证 RN 包裹 Web 游戏的整条链路</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <Text style={styles.heroEyebrow}>MINI GAME DEMO</Text>
            <Text style={styles.heroTitle}>Tap Rush</Text>
            <Text style={styles.heroText}>
              一个 15 秒点击挑战小游戏，用于验证原生跳转 RN、RN 容器承载 Web
              游戏，以及 Web 到 RN 的 bridge 通信。
            </Text>
          </View>

          {GAMES.map(game => (
            <Pressable
              key={game.id}
              onPress={() => setSelectedGame(game)}
              style={styles.gameCard}>
              <View style={styles.gameBadge}>
                <Text style={styles.gameBadgeText}>试玩</Text>
              </View>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
              <Text style={styles.gameDescription}>
                点击进入 RN 包裹的 WebView 容器，验证最小可运行链路。
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
  container: {flex: 1, backgroundColor: '#F4F7F3'},
  headerMeta: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  subtitle: {
    color: '#68806D',
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  heroCard: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: '#102315',
  },
  heroEyebrow: {
    color: '#A3D9B5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  heroText: {
    marginTop: 12,
    color: '#D7EBDD',
    fontSize: 14,
    lineHeight: 22,
  },
  gameCard: {
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  gameBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E1F8EA',
  },
  gameBadgeText: {
    color: WECHAT_GREEN,
    fontSize: 12,
    fontWeight: '700',
  },
  gameTitle: {
    marginTop: 14,
    color: '#102315',
    fontSize: 24,
    fontWeight: '800',
  },
  gameSubtitle: {
    marginTop: 4,
    color: '#48624D',
    fontSize: 14,
    fontWeight: '600',
  },
  gameDescription: {
    marginTop: 10,
    color: '#67806C',
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
