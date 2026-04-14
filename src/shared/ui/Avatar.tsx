import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Space} from './tokens';

interface AvatarProps {
  size?: number;
  shape?: 'square' | 'circle';
  uri?: string;
  name?: string;
  bgColor?: string;
  style?: ViewStyle;
}

const PALETTE = ['#F39B38', '#4D7CFE', '#15B56B', '#5D6B86', '#E75A5A', '#8B72BE', '#3399CC', '#E6567A'];
const colorFor = (s: string) => PALETTE[Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

export const Avatar: React.FC<AvatarProps> = ({
  size = Space.avatar,
  shape = 'square',
  uri,
  name = '',
  bgColor,
  style,
}) => {
  const radius = shape === 'circle' ? size / 2 : Space.avatarRadius;
  const initial = name.trim().charAt(0) || '?';
  const bg = bgColor ?? colorFor(name);
  return (
    <View
      style={[
        styles.wrap,
        {width: size, height: size, borderRadius: radius, backgroundColor: uri ? '#eee' : bg},
        style,
      ]}>
      {uri ? (
        <Image source={{uri}} style={{width: size, height: size, borderRadius: radius}} />
      ) : (
        <Text style={[styles.text, {fontSize: size * 0.42}]}>{initial}</Text>
      )}
      <View style={[styles.stroke, {borderRadius: radius}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center'},
  text: {color: '#FFFFFF', fontWeight: '600'},
  stroke: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.avatarStroke,
  },
});

export default Avatar;
