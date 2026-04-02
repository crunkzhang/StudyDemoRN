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
export const COVER_HEIGHT = 220;
export const AVATAR_SIZE = 64;

const COVER_URI = 'https://picsum.photos/seed/moments_cover/800/440';
const AVATAR_URI = 'https://i.pravatar.cc/150?img=10';
const MY_NAME = '我';

interface Props {
  scrollY: Animated.Value;
}

export default function MomentsHeader({scrollY}: Props) {
  // 下拉放大：scrollY < 0 时封面放大
  const coverScale = scrollY.interpolate({
    inputRange: [-COVER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-COVER_HEIGHT, 0],
    outputRange: [-COVER_HEIGHT / 2, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* 封面图 */}
      <Animated.Image
        source={{uri: COVER_URI}}
        style={[
          styles.cover,
          {
            transform: [
              {scale: coverScale},
              {translateY: coverTranslateY},
            ],
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: COVER_HEIGHT + AVATAR_SIZE / 2,
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
    right: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 6,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  cameraBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    padding: 6,
  },
  cameraIcon: {fontSize: 22},
});
