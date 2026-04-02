import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const ShakePage: React.FC = () => {
  return (
    <PageScaffold
      navMode="native"
      title="摇一摇"
      backgroundColor="#121826"
      navbarAppearance={{tintColor: '#FFFFFF'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>试试摇动手机，看看附近谁也在同一时刻摇动</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.phoneShell}>
            <View style={styles.phoneTop} />
            <View style={styles.phoneBottom} />
          </View>
          <View style={styles.centerPulse}>
            <View style={styles.pulseRing} />
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
            <Text style={styles.resultTitle}>最近摇到的人</Text>
            <Text style={styles.resultHint}>“晚风” · 1 分钟前 · 520m</Text>
            <Text style={styles.resultDesc}>
              喜欢看演出和深夜散步，状态文案保持轻社交氛围，更接近微信这类功能的使用气质。
            </Text>
          </View>
        </View>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121826'},
  header: {paddingHorizontal: 20, paddingTop: 18},
  subtitle: {color: '#9FA9BF', fontSize: 14, lineHeight: 21},
  stage: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  phoneShell: {
    width: 176,
    height: 256,
    position: 'relative',
    justifyContent: 'space-between',
  },
  phoneTop: {
    height: 118,
    borderRadius: 34,
    backgroundColor: '#232C43',
  },
  phoneBottom: {
    height: 118,
    borderRadius: 34,
    backgroundColor: '#1B2336',
  },
  centerPulse: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(87,107,149,0.15)',
  },
  pulseCore: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#576B95',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseText: {fontSize: 18, fontWeight: '800', color: '#fff', letterSpacing: 1},
  panel: {
    paddingHorizontal: 16,
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
    borderRadius: 24,
    backgroundColor: '#1A2133',
    padding: 18,
  },
  resultTitle: {fontSize: 18, fontWeight: '700', color: '#fff'},
  resultHint: {marginTop: 8, fontSize: 13, color: '#AAB4C8'},
  resultDesc: {marginTop: 10, fontSize: 14, lineHeight: 21, color: '#D2D8E5'},
});

export default ShakePage;
