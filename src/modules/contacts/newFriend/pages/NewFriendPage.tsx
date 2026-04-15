import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import SearchBar from '../../../../shared/ui/SearchBar';
import ListSection from '../../../../shared/ui/ListSection';
import ListCell from '../../../../shared/ui/ListCell';
import EmptyState from '../../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../../shared/ui/tokens';
import {UserPlus} from '../../../../shared/ui/icons';
import {navigationBridge} from '../../../../shared/bridges/common/navigation/navigationBridge';
import FriendRequestRow from '../components/FriendRequestRow';
import {useNewFriend} from '../stores/useNewFriend';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const NewFriendPage: React.FC = () => {
  const {list, addEntries, accept} = useNewFriend();

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
          addEntries.length > 0 ? (
            <ListSection>
              {addEntries.map(entry => (
                <ListCell
                  key={entry.id}
                  left={
                    <IconBox color={entry.iconBgColor}>
                      <UserPlus size={18} />
                    </IconBox>
                  }
                  title={entry.title}
                  onPress={() => navigationBridge.pushURL(entry.jumpUrl)}
                />
              ))}
            </ListSection>
          ) : null
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
