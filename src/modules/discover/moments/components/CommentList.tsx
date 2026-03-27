import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Comment} from '../models/Comment';

interface Props {
  comments: Comment[];
}

export default function CommentList({comments}: Props) {
  if (comments.length === 0) return null;
  return (
    <View style={styles.container}>
      {comments.map(c => (
        <View key={c.id} style={styles.item}>
          <Text style={styles.text} numberOfLines={0}>
            <Text style={styles.name}>{c.userName}</Text>
            {c.replyTo ? (
              <>
                <Text style={styles.replyLabel}> 回复 </Text>
                <Text style={styles.name}>{c.replyTo.userName}</Text>
              </>
            ) : null}
            <Text style={styles.colon}>：</Text>
            <Text style={styles.content}>{c.content}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  item: {paddingVertical: 2},
  text: {fontSize: 13, lineHeight: 20},
  name: {color: '#5B7EAE', fontWeight: '500'},
  replyLabel: {color: '#999'},
  colon: {color: '#333'},
  content: {color: '#333'},
});
