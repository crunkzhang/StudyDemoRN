import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Space} from '../../../../shared/ui/tokens';

const PALETTE = ['#F39B38', '#4D7CFE', '#15B56B', '#5D6B86', '#E75A5A', '#8B72BE', '#3399CC', '#E6567A'];
const colorFor = (s: string) => PALETTE[Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

const GroupAvatar: React.FC<{members: string[]; size?: number}> = ({members, size = Space.avatar}) => {
  const slots = members.slice(0, 9);
  const gap = 1;
  const cell = (size - gap * 4) / 3;
  return (
    <View style={[styles.wrap, {width: size, height: size}]}>
      {slots.map((name, i) => (
        <View
          key={i}
          style={[
            styles.cell,
            {width: cell, height: cell, margin: gap / 2, backgroundColor: colorFor(name)},
          ]}>
          <Text style={[styles.text, {fontSize: cell * 0.5}]}>{name.charAt(0)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: '#D8D8D8', borderRadius: Space.avatarRadius, padding: 1.5,
  },
  cell: {alignItems: 'center', justifyContent: 'center', borderRadius: 1},
  text: {color: '#fff', fontWeight: '600'},
});

export default GroupAvatar;
