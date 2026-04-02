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
      backgroundColor="#101114">
      <View style={styles.container}>
        <View style={styles.preview}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.leftTop]} />
            <View style={[styles.corner, styles.rightTop]} />
            <View style={[styles.corner, styles.leftBottom]} />
            <View style={[styles.corner, styles.rightBottom]} />
            <View style={styles.scanLine} />
          </View>
          <Text style={styles.tip}>扫描二维码 / 条形码 / 小程序码</Text>
        </View>

        <View style={styles.modeBar}>
          <Text style={styles.modeText}>扫码</Text>
          <Text style={styles.modeMuted}>翻译</Text>
          <Text style={styles.modeMuted}>识物</Text>
          <Text style={styles.modeMuted}>文档</Text>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>我的扫码记录</Text>
            <Text style={styles.actionHint}>查看最近识别结果与历史跳转</Text>
          </View>
          <View style={styles.actionRow}>
            <View style={styles.smallAction}>
              <Text style={styles.smallActionTitle}>手电筒</Text>
              <Text style={styles.smallActionHint}>弱光环境增强识别</Text>
            </View>
            <Pressable onPress={handleAlbum} style={styles.smallAction}>
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
  width: 26,
  height: 26,
  borderColor: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101114'},
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 260,
    height: 260,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    position: 'relative',
  },
  corner: cornerBase,
  leftTop: {left: 0, top: 0, borderLeftWidth: 4, borderTopWidth: 4},
  rightTop: {right: 0, top: 0, borderRightWidth: 4, borderTopWidth: 4},
  leftBottom: {left: 0, bottom: 0, borderLeftWidth: 4, borderBottomWidth: 4},
  rightBottom: {
    right: 0,
    bottom: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  scanLine: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 96,
    height: 2,
    backgroundColor: '#07C160',
  },
  tip: {marginTop: 22, fontSize: 14, color: '#BEC2CC'},
  modeBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#23262F',
  },
  modeText: {fontSize: 15, color: '#fff', fontWeight: '700'},
  modeMuted: {fontSize: 15, color: '#7E8593'},
  bottomPanel: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  actionCard: {
    borderRadius: 22,
    backgroundColor: '#1A1D24',
    padding: 18,
  },
  actionTitle: {fontSize: 17, fontWeight: '700', color: '#fff'},
  actionHint: {marginTop: 8, fontSize: 13, lineHeight: 19, color: '#98A0AE'},
  actionRow: {flexDirection: 'row', marginTop: 12, gap: 12},
  smallAction: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#171920',
    padding: 16,
  },
  smallActionTitle: {fontSize: 15, fontWeight: '700', color: '#fff'},
  smallActionHint: {marginTop: 8, fontSize: 12, lineHeight: 18, color: '#8A91A0'},
});

export default ScanPage;
