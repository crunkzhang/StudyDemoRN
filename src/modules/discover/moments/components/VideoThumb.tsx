import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

interface Props {
  thumb: string;
}

export default function VideoThumb({thumb}: Props) {
  return (
    <View style={styles.container}>
      <Image source={{uri: thumb}} style={styles.thumb} />
      <View style={styles.playBtn}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  thumb: {width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.85},
  playBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 36,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
});
