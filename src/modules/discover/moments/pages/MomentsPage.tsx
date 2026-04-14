import React, {useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  RefreshControl,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMomentsViewModel} from '../viewmodels/useMomentsViewModel';
import PostItem from '../components/PostItem';
import MomentsHeader, {
  COVER_HEIGHT,
  AVATAR_OVERHANG,
} from '../components/MomentsHeader';
import {Post} from '../models/Post';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const HEADER_HEIGHT = COVER_HEIGHT + AVATAR_OVERHANG;

export default function MomentsPage() {
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const vm = useMomentsViewModel();

  useEffect(() => {
    vm.initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Post}) => (
      <>
        <PostItem
          post={item}
          onLike={vm.onLike}
          onAddComment={vm.onAddComment}
          onDeletePost={vm.onDeletePost}
        />
        <View style={styles.divider} />
      </>
    ),
    [vm.onLike, vm.onAddComment, vm.onDeletePost],
  );

  const ListHeader = useCallback(() => <View style={styles.headerSpacer} />, []);

  const ListFooter = useCallback(
    () =>
      vm.loadingMore ? (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      ) : !vm.hasMore ? (
        <View style={styles.footer}>
          <Text style={styles.noMoreText}>没有更多了</Text>
        </View>
      ) : null,
    [vm.loadingMore, vm.hasMore],
  );

  if (vm.loading) {
    return (
      <PageScaffold
        navMode="native"
        backgroundColor="#FFFFFF"
        navbarAppearance={{
          shadowHidden: true,
          tintColor: '#FFFFFF',
          transparent: true,
        }}>
        <View style={[styles.center, {paddingTop: insets.top}]}>
          <ActivityIndicator size="large" color="#07C160" />
        </View>
      </PageScaffold>
    );
  }

  return (
    <PageScaffold
      navMode="native"
      backgroundColor="#FFFFFF"
      navbarAppearance={{
        shadowHidden: true,
        tintColor: '#FFFFFF',
        transparent: true,
      }}>
      <View style={styles.container}>
        <MomentsHeader scrollY={scrollY} />

        <Animated.FlatList
          data={vm.posts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          refreshControl={
            <RefreshControl
              refreshing={vm.refreshing}
              onRefresh={vm.onRefresh}
              tintColor="#07C160"
            />
          }
          onEndReached={vm.onLoadMore}
          onEndReachedThreshold={0.3}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  list: {flex: 1, backgroundColor: 'transparent'},
  listContent: {paddingBottom: 12},
  headerSpacer: {height: HEADER_HEIGHT, backgroundColor: '#FFFFFF'},
  divider: {height: 0, backgroundColor: 'transparent'},
  footer: {paddingVertical: 20, alignItems: 'center'},
  noMoreText: {color: '#999', fontSize: 13},
});
