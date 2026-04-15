import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import SearchBar from '../../../../shared/ui/SearchBar';
import ListSection from '../../../../shared/ui/ListSection';
import ListCell from '../../../../shared/ui/ListCell';
import EmptyState from '../../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../../shared/ui/tokens';
import {UserPlus} from '../../../../shared/ui/icons';
import FriendRequestRow from '../components/FriendRequestRow';
import {useFriendRequest} from '../stores/useFriendRequest';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const NewFriendPage: React.FC = () => {
  const {list, accept} = useFriendRequest();

  return (
    <PageScaffold navMode="native" title="新的朋友" backgroundColor={Colors.bgPage}>
      <FlatList
        data={list}
        keyExtractor={x => x.id}
        ListHeaderComponent={
          <>
            <SearchBar placeholder="添加朋友" editable={false} />
            {list.length > 0 ? (
              <ListSection header="新的朋友" marginTop={Space.sectionGap}>
                <View />
              </ListSection>
            ) : null}
          </>
        }
        renderItem={({item, index}) => (
          <View style={styles.cardRow}>
            <FriendRequestRow
              item={item}
              onAccept={accept}
              showSeparator={index !== list.length - 1}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<UserPlus size={56} color="#CCCCCC" />}
            title="还没有新的朋友"
            actionText="添加朋友"
          />
        }
        ListFooterComponent={
          <ListSection>
            <ListCell
              left={<IconBox color="#F39B38"><UserPlus size={18} /></IconBox>}
              title="添加手机联系人"
            />
            <ListCell
              left={<IconBox color="#4D7CFE"><UserPlus size={18} /></IconBox>}
              title="添加 QQ 好友"
            />
          </ListSection>
        }
      />
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  cardRow: {backgroundColor: Colors.bgCard},
  iconBox: {
    width: 30, height: 30, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
});

export default NewFriendPage;
