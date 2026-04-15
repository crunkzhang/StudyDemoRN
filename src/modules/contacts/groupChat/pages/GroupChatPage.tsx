import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import SearchBar from '../../../../shared/ui/SearchBar';
import ListSection from '../../../../shared/ui/ListSection';
import ListCell from '../../../../shared/ui/ListCell';
import {Colors, Space} from '../../../../shared/ui/tokens';
import {Plus, Users} from '../../../../shared/ui/icons';
import GroupAvatar from '../components/GroupAvatar';
import {useGroupChat} from '../stores/useGroupChat';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const GroupChatPage: React.FC = () => {
  const {list} = useGroupChat();
  return (
    <PageScaffold navMode="native" title="群聊" backgroundColor={Colors.bgPage}>
      <ScrollView>
        <SearchBar editable={false} />
        <ListSection marginTop={Space.sectionGap}>
          <ListCell
            left={<IconBox color={Colors.brand}><Plus size={18} /></IconBox>}
            title="发起群聊"
          />
          <ListCell
            left={<IconBox color="#4D7CFE"><Users size={18} /></IconBox>}
            title="保存到通讯录的群聊"
          />
        </ListSection>
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
