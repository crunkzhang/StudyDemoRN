import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../shared/ui/tokens';
import {Users, Chat, Megaphone} from '../../../../shared/ui/icons';

interface Entry { key: string; label: string; icon: React.ReactNode; }

const entries: Entry[] = [
  {key: 'contacts', label: '联系人', icon: <Users size={22} color="#7A7A7A" />},
  {key: 'groups', label: '群聊', icon: <Users size={22} color="#7A7A7A" />},
  {key: 'messages', label: '聊天记录', icon: <Chat size={22} color="#7A7A7A" />},
  {key: 'official', label: '公众号', icon: <Megaphone size={22} color="#7A7A7A" />},
];

const QuickEntryGrid: React.FC<{onPick?: (k: string) => void}> = ({onPick}) => (
  <View style={styles.wrap}>
    {entries.map(e => (
      <Pressable
        key={e.key}
        onPress={() => onPick?.(e.key)}
        style={({pressed}) => [styles.item, pressed && {opacity: 0.7}]}>
        <View style={styles.iconBox}>{e.icon}</View>
        <Text style={styles.label}>{e.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', paddingHorizontal: 12, paddingTop: 20, justifyContent: 'space-between'},
  item: {alignItems: 'center', width: '22%'},
  iconBox: {
    width: 56, height: 56, borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center', justifyContent: 'center',
  },
  label: {marginTop: 8, fontSize: 13, color: Colors.textSecondary},
});

export default QuickEntryGrid;
