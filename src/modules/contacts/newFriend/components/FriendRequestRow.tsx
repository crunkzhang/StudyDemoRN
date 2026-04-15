import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, Space, Hairline, Type} from '../../../../shared/ui/tokens';
import Avatar from '../../../../shared/ui/Avatar';
import type {FriendRequest} from '../models/types';

interface Props {
  item: FriendRequest;
  onAccept?: (id: string) => void;
  onPress?: (id: string) => void;
  showSeparator?: boolean;
}

const FriendRequestRow: React.FC<Props> = ({item, onAccept, onPress, showSeparator = true}) => (
  <Pressable
    onPress={() => onPress?.(item.id)}
    style={({pressed}) => [styles.row, pressed && {backgroundColor: Colors.bgCardPressed}]}>
    <Avatar name={item.name} size={Space.avatar} />
    <View style={styles.center}>
      <Text style={Type.cellTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={[Type.cellSubtitle, {marginTop: 2}]} numberOfLines={1}>{item.source}</Text>
    </View>
    <View style={styles.right}>
      {item.status === 'pending' ? (
        <Pressable
          onPress={() => onAccept?.(item.id)}
          style={({pressed}) => [styles.acceptBtn, pressed && {backgroundColor: Colors.brandPressed}]}>
          <Text style={styles.acceptText}>接受</Text>
        </Pressable>
      ) : (
        <Text style={styles.stateText}>
          {item.status === 'accepted' ? '已添加' : '已过期'}
        </Text>
      )}
    </View>
    {showSeparator ? <View style={styles.sep} /> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Space.pagePadding,
    minHeight: Space.rowHeightLarge,
    backgroundColor: Colors.bgCard,
  },
  center: {flex: 1, marginLeft: Space.avatarToText, justifyContent: 'center'},
  right: {marginLeft: 8},
  acceptBtn: {
    backgroundColor: Colors.brand,
    paddingHorizontal: 14, height: 30, borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  acceptText: {color: '#fff', fontSize: 14, fontWeight: '500'},
  stateText: {fontSize: 13, color: Colors.textTertiary},
  sep: {
    position: 'absolute',
    left: Space.pagePadding + Space.avatar + Space.avatarToText,
    right: 0, bottom: 0,
    height: Hairline, backgroundColor: Colors.separator,
  },
});

export default FriendRequestRow;
