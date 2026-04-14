import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {GAMES} from '../data/games';
import {useRouteParams} from '../../../../app/navigation/useRouteParams';
import {Navigation} from '../../../../app/navigation/Navigation';

const WECHAT_GREEN = '#07C160';

interface WebBridgeMessage {
  type?: 'ready' | 'score' | 'gameOver' | 'exit';
  payload?: {
    score?: number;
  };
}

const injectedCommand = (type: 'restart' | 'pause' | 'resume') => {
  const methodMap = {
    restart: 'restart',
    pause: 'pause',
    resume: 'resume',
  } as const;

  return `window.__tapRush && window.__tapRush.${methodMap[type]}(); true;`;
};

const GameContainerPage: React.FC = () => {
  const {gameId} = useRouteParams('gameContainer');
  const game = useMemo(() => GAMES.find(g => g.id === gameId), [gameId]);
  const webViewRef = useRef<WebView>(null);
  const [score, setScore] = useState(0);
  const [statusText, setStatusText] = useState('正在连接游戏...');
  const [loading, setLoading] = useState(true);

  const source = useMemo(
    () => ({
      html: game?.html ?? '',
      baseUrl: Platform.OS === 'android' ? 'https://game.local/' : '',
    }),
    [game],
  );

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => Navigation.pop()} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>返回</Text>
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>游戏不存在</Text>
            <Text style={styles.headerSubtitle}>gameId: {gameId}</Text>
          </View>
          <View style={styles.headerButton} />
        </View>
      </SafeAreaView>
    );
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data) as WebBridgeMessage;
      switch (message.type) {
        case 'ready':
          setStatusText('游戏已就绪');
          break;
        case 'score':
          setScore(message.payload?.score ?? 0);
          setStatusText('继续点击，刷新你的分数');
          break;
        case 'gameOver':
          setScore(message.payload?.score ?? 0);
          setStatusText(`本局结束，得分 ${message.payload?.score ?? 0}`);
          break;
        case 'exit':
          Navigation.pop();
          break;
        default:
          break;
      }
    } catch {
      setStatusText('收到无法识别的游戏消息');
    }
  };

  const handleRestart = () => {
    webViewRef.current?.injectJavaScript(injectedCommand('restart'));
    setStatusText('重新开始中...');
  };

  const handleClose = () => {
    Alert.alert('退出游戏', '返回游戏中心？', [
      {text: '继续玩', style: 'cancel'},
      {text: '返回', style: 'default', onPress: () => Navigation.pop()},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>返回</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{game.title}</Text>
          <Text style={styles.headerSubtitle}>{statusText}</Text>
        </View>
        <Pressable onPress={handleRestart} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>重开</Text>
        </Pressable>
      </View>

      <View style={styles.scoreBar}>
        <Text style={styles.scoreLabel}>当前得分</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.webContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={source}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          setSupportMultipleWindows={false}
          style={styles.webView}
        />
        {loading && (
          <View style={styles.loadingMask}>
            <ActivityIndicator color={WECHAT_GREEN} size="large" />
            <Text style={styles.loadingText}>小游戏加载中...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4F7F3'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9E5DB',
  },
  headerButton: {
    minWidth: 52,
    paddingVertical: 8,
  },
  headerButtonText: {
    color: WECHAT_GREEN,
    fontSize: 16,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: '#1A281D',
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 2,
    color: '#68806D',
    fontSize: 12,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: '#0F2215',
  },
  scoreLabel: {
    color: '#B4CDBA',
    fontSize: 13,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  webContainer: {
    flex: 1,
    margin: 12,
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingMask: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  loadingText: {
    marginTop: 12,
    color: '#48624D',
    fontSize: 14,
  },
});

export default GameContainerPage;
