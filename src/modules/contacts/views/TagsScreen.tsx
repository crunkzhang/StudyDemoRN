import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import EmptyState from '../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../shared/ui/tokens';
import {Tag} from '../../../shared/ui/icons';
import {mockTags} from '../data/mockTags';
import {Navigation} from '../../../app/navigation/Navigation';

const TagsScreen: React.FC = () => {
  const goCreate = () => Navigation.push('contactTagCreate');

  return (
    <PageScaffold
      navMode="native"
      title="标签"
      backgroundColor={Colors.bgPage}
      right={
        <Pressable onPress={goCreate} hitSlop={10}>
          <Text style={styles.nav}>新建</Text>
        </Pressable>
      }>
      <ScrollView>
        {mockTags.length > 0 ? (
          <ListSection header="按标签" marginTop={Space.sectionGap}>
            {mockTags.map(t => (
              <ListCell
                key={t.id}
                title={t.name}
                rightText={`${t.count} 个联系人`}
              />
            ))}
          </ListSection>
        ) : (
          <EmptyState
            icon={<Tag size={56} color="#CCCCCC" />}
            title="还没有标签"
            actionText="新建标签"
            onAction={goCreate}
          />
        )}
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  nav: {color: Colors.brand, fontSize: 16, fontWeight: '500'},
});

export default TagsScreen;
