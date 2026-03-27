import {useState, useCallback, useRef} from 'react';
import {Post} from '../models/Post';
import {momentsMockService} from '../services/momentsMockService';

const PAGE_SIZE = 10;
const CURRENT_USER_ID = 'me';

export function useMomentsViewModel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const loadPosts = useCallback(async (page: number) => {
    const data = await momentsMockService.fetchPosts(page, PAGE_SIZE);
    return data;
  }, []);

  const initialLoad = useCallback(async () => {
    setLoading(true);
    pageRef.current = 1;
    try {
      const data = await loadPosts(1);
      setPosts(data);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, [loadPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // 仅做 loading 动画，不改变数据
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    setRefreshing(false);
  }, []);

  const onLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      const data = await loadPosts(nextPage);
      setPosts(prev => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, loadPosts]);

  const onLike = useCallback(async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const alreadyLiked = post.likes.some(u => u.id === CURRENT_USER_ID);
    // 乐观更新
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter(u => u.id !== CURRENT_USER_ID)
            : [...p.likes, {id: CURRENT_USER_ID, name: '我', avatar: 'https://i.pravatar.cc/150?img=10'}],
        };
      }),
    );
    try {
      if (alreadyLiked) {
        await momentsMockService.unlikePost(postId);
      } else {
        await momentsMockService.likePost(postId);
      }
    } catch {
      // 回滚
      setPosts(prev =>
        prev.map(p => {
          if (p.id !== postId) return p;
          return {
            ...p,
            likes: alreadyLiked
              ? [...p.likes, {id: CURRENT_USER_ID, name: '我', avatar: 'https://i.pravatar.cc/150?img=10'}]
              : p.likes.filter(u => u.id !== CURRENT_USER_ID),
          };
        }),
      );
    }
  }, [posts]);

  const onAddComment = useCallback(
    async (postId: string, content: string) => {
      const comment = await momentsMockService.addComment(postId, content);
      setPosts(prev =>
        prev.map(p => {
          if (p.id !== postId) return p;
          return {...p, comments: [...p.comments, comment]};
        }),
      );
    },
    [],
  );

  const onDeletePost = useCallback(async (postId: string) => {
    await momentsMockService.deletePost(postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  return {
    posts,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    initialLoad,
    onRefresh,
    onLoadMore,
    onLike,
    onAddComment,
    onDeletePost,
    currentUserId: CURRENT_USER_ID,
  };
}
