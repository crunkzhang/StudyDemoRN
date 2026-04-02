import React, {useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMomentsViewModel} from '../viewmodels/useMomentsViewModel';
import PostItem from '../components/PostItem';
import MomentsHeader, {COVER_HEIGHT, AVATAR_SIZE} from '../components/MomentsHeader';
import {Post} from '../models/Post';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import {RNBridge} from '../../../../shared/bridges/core/RNBridge';

const HEADER_HEIGHT = COVER_HEIGHT + AVATAR_SIZE / 2;
const DIVIDER_HEIGHT = 10;

interface Props {
  onBack?: () => void;
}

export default function MomentsPage({onBack}: Props) {
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

  const ListHeader = useCallback(
    () => (
      <>
        <MomentsHeader scrollY={scrollY} />
      </>
    ),
    [scrollY],
  );

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

  // 导航栏透明度随滚动变化
  const navOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 60, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const floatingNavOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 90, HEADER_HEIGHT - 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const showBackButton = typeof onBack === 'function';
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }

    if (RNBridge.navbar.isSupported) {
      RNBridge.navbar.goBack();
    }
  };

  if (vm.loading) {
    return (
      <PageScaffold
        navMode="rn"
        title="朋友圈"
        backgroundColor="#EDEDED"
        headerVariant="immersive"
        showHeader={false}>
        <View style={[styles.center, {paddingTop: insets.top}]}>
          <ActivityIndicator size="large" color="#07C160" />
        </View>
      </PageScaffold>
    );
  }

  return (
    <PageScaffold
      navMode="rn"
      title="朋友圈"
      backgroundColor="#EDEDED"
      headerVariant="immersive"
      showHeader={false}>
    <View style={styles.container}>
      {/* 沉浸态顶部层 */}
      <Animated.View
        style={[
          styles.floatingNav,
          {paddingTop: insets.top, opacity: floatingNavOpacity},
        ]}>
        {showBackButton || RNBridge.navbar.isSupported ? (
          <TouchableOpacity onPress={handleBack} style={styles.floatingBackBtn}>
            <Text style={styles.floatingBackText}>‹</Text>
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {/* 滚动态导航栏 */}
      <Animated.View
        style={[
          styles.navbar,
          {paddingTop: insets.top, opacity: navOpacity, backgroundColor: '#07C160'},
        ]}>
        {showBackButton || RNBridge.navbar.isSupported ? (
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ 返回</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <Text style={styles.navTitle}>朋友圈</Text>
        <View style={styles.backBtn} />
      </Animated.View>

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
  container: {flex: 1, backgroundColor: '#EDEDED'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  list: {flex: 1, backgroundColor: '#EDEDED'},
  listContent: {paddingBottom: 12},
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  floatingNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 11,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  floatingBackBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  floatingBackText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '400',
  },
  backBtn: {width: 60},
  backText: {color: '#fff', fontSize: 17},
  navTitle: {color: '#fff', fontSize: 17, fontWeight: '600'},
  divider: {height: DIVIDER_HEIGHT, backgroundColor: '#EDEDED'},
  footer: {paddingVertical: 20, alignItems: 'center'},
  noMoreText: {color: '#999', fontSize: 13},
});
