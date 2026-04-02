import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const COVER_HEIGHT = 248;
export const AVATAR_SIZE = 72;
export const AVATAR_OVERHANG = AVATAR_SIZE / 2;
const HEADER_HEIGHT = COVER_HEIGHT + AVATAR_OVERHANG;

export const COVER_URI =
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=80';
const AVATAR_URI = 'https://i.pravatar.cc/150?img=10';
const MY_NAME = '我';

interface Props {
  scrollY: Animated.Value;
}

export default function MomentsHeader({scrollY}: Props) {
  const pullDownDistance = scrollY.interpolate({
    inputRange: [-COVER_HEIGHT, 0],
    outputRange: [COVER_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerHeight = Animated.add(pullDownDistance, HEADER_HEIGHT);
  const coverHeight = Animated.add(pullDownDistance, COVER_HEIGHT);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: headerHeight,
          transform: [{translateY: headerTranslateY}],
        },
      ]}>
      {/* 封面图 */}
      <Animated.Image
        source={{uri: COVER_URI}}
        style={[
          styles.cover,
          {
            height: coverHeight,
          },
        ]}
        resizeMode="cover"
      />

      {/* 个人信息（右下角） */}
      <View style={styles.profileRow}>
        <Text style={styles.name}>{MY_NAME}</Text>
        <Image source={{uri: AVATAR_URI}} style={styles.avatar} />
      </View>

      {/* 相机按钮（右上角） */}
      <TouchableOpacity
        style={styles.cameraBtn}
        onPress={() => Alert.alert('提示', '功能开发中')}>
        <Text style={styles.cameraIcon}>📷</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: COVER_HEIGHT,
  },
  profileRow: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraBtn: {
    position: 'absolute',
    top: 56,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  cameraIcon: {fontSize: 15},
});
