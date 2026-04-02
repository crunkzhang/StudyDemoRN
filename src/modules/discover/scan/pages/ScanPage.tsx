import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import {useNavbarRightAction} from '../../../../shared/bridges/hooks/useNavbar';
import {useScanAlbum} from '../../../../shared/bridges/hooks/useScanAlbum';
import {useToast} from '../../../../shared/bridges/hooks/useToast';

const ScanPage: React.FC = () => {
  const {showToast} = useToast();
  const {openScanAlbum} = useScanAlbum({
    onResult: result => {
      if (result.content) {
        showToast(`识别结果：${result.content}`, 2.2);
      }
    },
  });

  const handleAlbum = useCallback(() => {
    openScanAlbum('从相册选取');
  }, [openScanAlbum]);

  useNavbarRightAction('scan_album', handleAlbum);

  return (
    <PageScaffold
      navMode="native"
      title="扫一扫"
      rightItem={{title: '相册', actionId: 'scan_album'}}
      navbarAppearance={{tintColor: '#FFFFFF'}}
      backgroundColor="#0B1017">
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>SMART SCAN</Text>
          <Text style={styles.heroTitle}>对准二维码、条码或图片内容</Text>
          <Text style={styles.heroText}>
            让识别框成为首屏的唯一重心，底部只保留记录、手电筒和相册这三个高频入口。
          </Text>
        </View>

        <View style={styles.preview}>
          <View style={styles.frameShell}>
            <View style={styles.frame}>
              <View style={[styles.corner, styles.leftTop]} />
              <View style={[styles.corner, styles.rightTop]} />
              <View style={[styles.corner, styles.leftBottom]} />
              <View style={[styles.corner, styles.rightBottom]} />
              <View style={styles.scanLine} />
            </View>
          </View>
          <Text style={styles.tip}>扫描二维码 / 条形码 / 小程序码 / 商品图</Text>
        </View>

        <View style={styles.modeBar}>
          <View style={styles.modeActiveChip}>
            <Text style={styles.modeActiveText}>扫码</Text>
          </View>
          <Text style={styles.modeMuted}>翻译</Text>
          <Text style={styles.modeMuted}>识物</Text>
          <Text style={styles.modeMuted}>文档</Text>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.recordCard}>
            <View>
              <Text style={styles.actionEyebrow}>最近使用</Text>
              <Text style={styles.actionTitle}>我的扫码记录</Text>
              <Text style={styles.actionHint}>查看最近识别结果与历史跳转</Text>
            </View>
            <Text style={styles.recordArrow}>›</Text>
          </View>
          <View style={styles.actionRow}>
            <View style={[styles.smallAction, styles.smallActionMuted]}>
              <Text style={styles.smallActionTitle}>手电筒</Text>
              <Text style={styles.smallActionHint}>弱光环境增强识别</Text>
            </View>
            <Pressable onPress={handleAlbum} style={[styles.smallAction, styles.smallActionAccent]}>
              <Text style={styles.smallActionTitle}>从相册选取</Text>
              <Text style={styles.smallActionHint}>快速识别已保存图片</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </PageScaffold>
  );
};

const cornerBase = {
  position: 'absolute' as const,
  width: 28,
  height: 28,
  borderColor: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0B1017'},
  hero: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  heroLabel: {
    color: '#6EDCB0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  heroTitle: {
    marginTop: 10,
    color: '#F5F7FA',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  heroText: {
    marginTop: 10,
    color: '#95A2B6',
    fontSize: 13,
    lineHeight: 20,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameShell: {
    width: 290,
    height: 290,
    borderRadius: 38,
    backgroundColor: 'rgba(110,220,176,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 260,
    height: 260,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.03)',
    position: 'relative',
  },
  corner: cornerBase,
  leftTop: {left: 0, top: 0, borderLeftWidth: 3, borderTopWidth: 3},
  rightTop: {right: 0, top: 0, borderRightWidth: 3, borderTopWidth: 3},
  leftBottom: {left: 0, bottom: 0, borderLeftWidth: 3, borderBottomWidth: 3},
  rightBottom: {
    right: 0,
    bottom: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 94,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#34D399',
    shadowColor: '#34D399',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0},
  },
  tip: {marginTop: 24, fontSize: 14, color: '#B6C3D7'},
  modeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  modeActiveChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#EAFBF4',
  },
  modeActiveText: {fontSize: 15, color: '#0B1017', fontWeight: '800'},
  modeMuted: {fontSize: 15, color: '#7E8593'},
  bottomPanel: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    backgroundColor: '#141B24',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  actionEyebrow: {fontSize: 11, fontWeight: '800', color: '#7BCDA8', letterSpacing: 1},
  actionTitle: {fontSize: 17, fontWeight: '700', color: '#fff'},
  actionHint: {marginTop: 8, fontSize: 13, lineHeight: 19, color: '#98A0AE'},
  recordArrow: {fontSize: 24, color: '#7E8898'},
  actionRow: {flexDirection: 'row', marginTop: 12, gap: 12},
  smallAction: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  smallActionMuted: {backgroundColor: '#131922'},
  smallActionAccent: {backgroundColor: '#10271C'},
  smallActionTitle: {fontSize: 15, fontWeight: '700', color: '#fff'},
  smallActionHint: {marginTop: 8, fontSize: 12, lineHeight: 18, color: '#8A91A0'},
});

export default ScanPage;
