import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {User} from '../../../../shared/models/User';

interface Props {
  likes: User[];
}

export default function LikeList({likes}: Props) {
  if (likes.length === 0) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.heart}>♥ </Text>
      <Text style={styles.names}>
        {likes.map(u => u.name).join('、')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 2,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  heart: {color: '#E05C5C', fontSize: 13},
  names: {color: '#5B7EAE', fontSize: 13, flex: 1, flexWrap: 'wrap'},
});
