import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const ShakePage: React.FC = () => {
  return (
    <PageScaffold
      navMode="native"
      title="摇一摇"
      backgroundColor="#0E1424"
      navbarAppearance={{tintColor: '#FFFFFF'}}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>LIVE MOMENT</Text>
          <Text style={styles.heroTitle}>摇一摇，遇见同一秒回应你的人</Text>
          <Text style={styles.subtitle}>把动作本身做成舞台，结果区像一张刚刚刷新的社交卡片。</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.auraPrimary} />
          <View style={styles.auraSecondary} />
          <View style={styles.phoneShell}>
            <View style={styles.phoneTop} />
            <View style={styles.phoneBottom} />
          </View>
          <View style={styles.centerPulse}>
            <View style={[styles.pulseRing, styles.pulseRingOuter]} />
            <View style={[styles.pulseRing, styles.pulseRingInner]} />
            <View style={styles.pulseCore}>
              <Text style={styles.pulseText}>SHAKE</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.modeRow}>
            <Text style={styles.modeActive}>找朋友</Text>
            <Text style={styles.modeText}>摇歌曲</Text>
            <Text style={styles.modeText}>摇电视</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultBadge}>刚刚匹配</Text>
            <Text style={styles.resultTitle}>最近摇到的人</Text>
            <Text style={styles.resultHint}>“晚风” · 1 分钟前 · 520m</Text>
            <Text style={styles.resultDesc}>
              喜欢看演出和深夜散步。结果区只强调“刚刚同频”这一件事，不堆过多说明。
            </Text>
          </View>
        </View>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0E1424'},
  hero: {paddingHorizontal: 20, paddingTop: 18},
  heroLabel: {
    color: '#8EA3FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  heroTitle: {
    marginTop: 10,
    color: '#F4F7FF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {marginTop: 10, color: '#9FA9BF', fontSize: 14, lineHeight: 21},
  stage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  auraPrimary: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(107,123,255,0.14)',
    top: 80,
  },
  auraSecondary: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(66,173,255,0.10)',
    bottom: 92,
    right: 48,
  },
  phoneShell: {
    width: 190,
    height: 276,
    position: 'relative',
    justifyContent: 'space-between',
  },
  phoneTop: {
    height: 128,
    borderRadius: 36,
    backgroundColor: '#27324D',
  },
  phoneBottom: {
    height: 128,
    borderRadius: 36,
    backgroundColor: '#1A2236',
  },
  centerPulse: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    borderRadius: 999,
  },
  pulseRingOuter: {
    width: 176,
    height: 176,
    backgroundColor: 'rgba(87,107,149,0.14)',
  },
  pulseRingInner: {
    width: 132,
    height: 132,
    backgroundColor: 'rgba(87,107,149,0.18)',
  },
  pulseCore: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#6B7BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseText: {fontSize: 18, fontWeight: '800', color: '#fff', letterSpacing: 1},
  panel: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  modeActive: {fontSize: 15, color: '#fff', fontWeight: '700'},
  modeText: {fontSize: 15, color: '#7F8AA3'},
  resultCard: {
    borderRadius: 26,
    backgroundColor: '#171F32',
    padding: 20,
  },
  resultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#25304C',
    color: '#9AB6FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resultTitle: {marginTop: 12, fontSize: 18, fontWeight: '700', color: '#fff'},
  resultHint: {marginTop: 8, fontSize: 13, color: '#AAB4C8'},
  resultDesc: {marginTop: 10, fontSize: 14, lineHeight: 21, color: '#D2D8E5'},
});

export default ShakePage;
