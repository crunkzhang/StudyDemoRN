import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import {Colors, Space, Type, Hairline} from '../../../shared/ui/tokens';
import Avatar from '../../../shared/ui/Avatar';
import {mockContactsLite} from '../data/mockContacts';

const TagCreateScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const canSave = name.trim().length > 0;

  return (
    <PageScaffold
      navMode="native"
      title="新建标签"
      backgroundColor={Colors.bgPage}
      right={
        <Pressable hitSlop={10} disabled={!canSave}>
          <Text style={[styles.nav, !canSave && {opacity: 0.4}]}>保存</Text>
        </Pressable>
      }>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="请输入标签名"
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        <Pressable style={({pressed}) => [styles.primaryBtn, pressed && {opacity: 0.9}]}>
          <Text style={styles.primaryBtnText}>从通讯录选择</Text>
        </Pressable>

        {selected.length > 0 ? (
          <View style={styles.chipWrap}>
            {selected.map(id => {
              const c = mockContactsLite.find(x => x.id === id);
              if (!c) return null;
              return (
                <View key={id} style={styles.chip}>
                  <Avatar name={c.name} size={36} />
                  <Text style={styles.chipName} numberOfLines={1}>{c.name}</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={{padding: 12}}>
          {mockContactsLite.slice(0, 3).map(c => (
            <Pressable
              key={c.id}
              onPress={() =>
                setSelected(s => (s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id]))
              }
              style={styles.debugRow}>
              <Text style={Type.cellTitle}>{selected.includes(c.id) ? '✓ ' : '  '}{c.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  nav: {color: Colors.brand, fontSize: 16, fontWeight: '500'},
  inputCard: {
    marginTop: Space.sectionGap, backgroundColor: Colors.bgCard,
    paddingHorizontal: Space.pagePadding,
    borderTopWidth: Hairline, borderBottomWidth: Hairline, borderColor: Colors.separator,
  },
  input: {height: 48, fontSize: 17, color: Colors.textPrimary, padding: 0},
  primaryBtn: {
    marginHorizontal: Space.pagePadding, marginTop: 20,
    height: 44, borderRadius: 6,
    backgroundColor: Colors.brand, alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: {color: '#fff', fontSize: 16, fontWeight: '500'},
  chipWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: Space.pagePadding, paddingTop: 20,
  },
  chip: {width: 56, alignItems: 'center', marginRight: 12, marginBottom: 12},
  chipName: {marginTop: 4, fontSize: 11, color: Colors.textSecondary, maxWidth: 56},
  debugRow: {paddingVertical: 10},
});

export default TagCreateScreen;
