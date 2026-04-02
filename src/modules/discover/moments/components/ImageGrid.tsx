import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const GAP = 4;
const SIDE_PADDING = 16;
const AVATAR_WIDTH = 40;
const CONTENT_GAP = 12;
const GRID_SIDE_INSET = SIDE_PADDING + AVATAR_WIDTH + CONTENT_GAP;
// 宫格左右都留出和正文左边相同的空白，让网格更像微信的版式
const CONTENT_WIDTH = SCREEN_WIDTH - GRID_SIDE_INSET * 2;

function getImageSize(count: number): {width: number; height: number} {
  if (count === 1) {
    return {width: CONTENT_WIDTH * 0.7, height: CONTENT_WIDTH * 0.7};
  }
  if (count === 2 || count === 4) {
    const size = (CONTENT_WIDTH - GAP) / 2;
    return {width: size, height: size};
  }
  // 3, 6, 9 → 3列
  const size = (CONTENT_WIDTH - GAP * 2) / 3;
  return {width: size, height: size};
}

interface Props {
  images: string[];
  onPressImage: (index: number) => void;
}

export default function ImageGrid({images, onPressImage}: Props) {
  const count = images.length;
  const {width: imgW, height: imgH} = getImageSize(count);

  const cols = count === 1 ? 1 : count === 2 || count === 4 ? 2 : 3;

  const rows: string[][] = [];
  for (let i = 0; i < images.length; i += cols) {
    rows.push(images.slice(i, i + cols));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((uri, ci) => {
            const index = ri * cols + ci;
            return (
              <TouchableOpacity
                key={ci}
                activeOpacity={0.85}
                onPress={() => onPressImage(index)}
                style={[
                  styles.imgWrapper,
                  {width: imgW, height: imgH},
                  ci > 0 && {marginLeft: GAP},
                ]}>
                <Image source={{uri}} style={styles.img} />
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: GAP},
  row: {flexDirection: 'row'},
  imgWrapper: {overflow: 'hidden', borderRadius: 3},
  img: {width: '100%', height: '100%', resizeMode: 'cover'},
});
