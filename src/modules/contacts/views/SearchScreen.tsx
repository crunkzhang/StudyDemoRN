import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Space, Type, Hairline} from '../../../shared/ui/tokens';
import SearchBar from '../../../shared/ui/SearchBar';
import Avatar from '../../../shared/ui/Avatar';
import EmptyState from '../../../shared/ui/EmptyState';
import {Search as SearchIcon} from '../../../shared/ui/icons';
import QuickEntryGrid from './components/QuickEntryGrid';
import SearchHitText from './components/SearchHitText';
import {mockContactsLite} from '../data/mockContacts';
import {mockGroups} from '../data/mockGroups';
import {mockOfficialAccounts} from '../data/mockOfficialAccounts';
import {Navigation} from '../../../app/navigation/Navigation';

const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [raw, setRaw] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebounced(raw.trim()), 200);
    return () => clearTimeout(id);
  }, [raw]);

  const results = useMemo(() => {
    if (!debounced) return null;
    const key = debounced.toLowerCase();
    const match = (s: string) => s.toLowerCase().includes(key);
    return {
      contacts: mockContactsLite.filter(c => match(c.name) || match(c.wxid)).slice(0, 3),
      groups: mockGroups.filter(g => match(g.name)).slice(0, 3),
      official: mockOfficialAccounts.filter(o => match(o.name) || match(o.latest)).slice(0, 3),
    };
  }, [debounced]);

  const nothing =
    debounced && results && !results.contacts.length && !results.groups.length && !results.official.length;

  return (
    <View style={[styles.page, {paddingTop: insets.top}]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => Navigation.pop()} hitSlop={10} style={styles.cancel}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
        <View style={styles.searchWrap}>
          <SearchBar
            ref={inputRef}
            autoFocus
            value={raw}
            onChangeText={setRaw}
            onClear={() => setRaw('')}
          />
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        {!debounced ? <QuickEntryGrid /> : null}

        {results?.contacts.length ? (
          <Section title="联系人">
            {results.contacts.map(c => (
              <Row key={c.id}
                left={<Avatar name={c.name} size={40} />}
                title={<SearchHitText text={c.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<SearchHitText text={`微信号: ${c.wxid}`} keyword={debounced} style={Type.cellSubtitle} />} />
            ))}
          </Section>
        ) : null}

        {results?.groups.length ? (
          <Section title="群聊">
            {results.groups.map(g => (
              <Row key={g.id}
                left={<Avatar name={g.name} size={40} />}
                title={<SearchHitText text={g.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<Text style={Type.cellSubtitle}>{g.memberCount} 位成员</Text>} />
            ))}
          </Section>
        ) : null}

        {results?.official.length ? (
          <Section title="公众号">
            {results.official.map(o => (
              <Row key={o.id}
                left={<Avatar name={o.name} size={40} shape="circle" />}
                title={<SearchHitText text={o.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<SearchHitText text={o.latest} keyword={debounced} style={Type.cellSubtitle} numberOfLines={1} />} />
            ))}
          </Section>
        ) : null}

        {nothing ? (
          <EmptyState icon={<SearchIcon size={56} color="#CCCCCC" />} title="没有找到相关结果" />
        ) : null}
      </ScrollView>
    </View>
  );
};

const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const Row: React.FC<{left: React.ReactNode; title: React.ReactNode; sub: React.ReactNode}> = ({left, title, sub}) => (
  <View style={styles.row}>
    {left}
    <View style={{flex: 1, marginLeft: Space.avatarToText}}>
      {title}
      <View style={{marginTop: 2}}>{sub}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: Colors.bgCard},
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: Hairline, borderBottomColor: Colors.separator,
  },
  cancel: {paddingHorizontal: 12, paddingVertical: 10},
  cancelText: {color: Colors.brand, fontSize: 16},
  searchWrap: {flex: 1},
  section: {marginTop: 20},
  sectionHeader: {
    paddingHorizontal: Space.pagePadding, paddingBottom: 6,
    fontSize: 13, color: Colors.textSecondary,
  },
  sectionCard: {backgroundColor: Colors.bgCard},
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Space.pagePadding,
    minHeight: Space.rowHeightLarge,
    borderBottomWidth: Hairline, borderBottomColor: Colors.separator,
  },
});

export default SearchScreen;
