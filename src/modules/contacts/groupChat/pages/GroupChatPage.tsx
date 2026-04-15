import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import SearchBar from '../../../../shared/ui/SearchBar';
import ListSection from '../../../../shared/ui/ListSection';
import ListCell from '../../../../shared/ui/ListCell';
import {Colors, Space} from '../../../../shared/ui/tokens';
import {Plus, Users} from '../../../../shared/ui/icons';
import {navigationBridge} from '../../../../shared/bridges/common/navigation/navigationBridge';
import GroupAvatar from '../components/GroupAvatar';
import {useGroupChat} from '../stores/useGroupChat';
import type {GroupEntry} from '../models/types';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const renderEntryIcon = (entry: GroupEntry) => {
  switch (entry.iconKey) {
    case 'plus':  return <Plus size={18} />;
    case 'users': return <Users size={18} />;
  }
};

const GroupChatPage: React.FC = () => {
  const {list, entries} = useGroupChat();
  return (
    <PageScaffold navMode="native" title="群聊" backgroundColor={Colors.bgPage}>
      <ScrollView>
        <SearchBar editable={false} />
        {entries.length > 0 && (
          <ListSection marginTop={Space.sectionGap}>
            {entries.map(entry => (
              <ListCell
                key={entry.id}
                left={<IconBox color={entry.iconBgColor}>{renderEntryIcon(entry)}</IconBox>}
                title={entry.title}
                onPress={() => navigationBridge.pushURL(entry.jumpUrl)}
              />
            ))}
          </ListSection>
        )}
        <ListSection header="我的群聊">
          {list.map(g => (
            <ListCell
              key={g.id}
              left={<GroupAvatar members={g.memberNames} />}
              title={g.name}
              rightText={`${g.memberCount}`}
            />
          ))}
        </ListSection>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: Space.avatar, height: Space.avatar,
    borderRadius: Space.avatarRadius,
    alignItems: 'center', justifyContent: 'center',
  },
});

export default GroupChatPage;
