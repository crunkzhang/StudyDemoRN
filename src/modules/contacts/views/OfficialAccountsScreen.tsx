import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import Avatar from '../../../shared/ui/Avatar';
import {Colors, Space} from '../../../shared/ui/tokens';
import {Search as SearchIcon} from '../../../shared/ui/icons';
import {mockOfficialAccounts} from '../data/mockOfficialAccounts';

const OfficialAccountsScreen: React.FC = () => (
  <PageScaffold
    navMode="native"
    title="公众号"
    backgroundColor={Colors.bgPage}
    right={
      <Pressable hitSlop={10} style={styles.search}>
        <SearchIcon size={20} color={Colors.textPrimary} />
      </Pressable>
    }>
    <ScrollView>
      <ListSection header="全部公众号" marginTop={Space.sectionGap}>
        {mockOfficialAccounts.map(a => (
          <ListCell
            key={a.id}
            left={<Avatar name={a.name} shape="circle" size={Space.avatarLarge} />}
            title={a.name}
            subtitle={a.latest}
            rightNode={
              <View style={styles.rightCol}>
                <Text style={styles.time}>{a.time}</Text>
                {a.unread > 0 ? <View style={styles.dot} /> : null}
              </View>
            }
            showArrow={false}
          />
        ))}
      </ListSection>
    </ScrollView>
  </PageScaffold>
);

const styles = StyleSheet.create({
  search: {padding: 6},
  rightCol: {alignItems: 'flex-end'},
  time: {fontSize: 11, color: Colors.textTertiary},
  dot: {
    marginTop: 6,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.danger,
  },
});

export default OfficialAccountsScreen;
