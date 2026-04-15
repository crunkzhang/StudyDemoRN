import {useState, useCallback, useRef} from 'react';
import {Post} from '../models/Post';
import {
  addComment,
  deletePost,
  fetchPosts,
  likePost,
  unlikePost,
} from '../requests/momentsReq';

const PAGE_SIZE = 10;
const CURRENT_USER_ID = 'me';
const ME = {id: CURRENT_USER_ID, name: '我', avatar: 'https://i.pravatar.cc/150?img=10'};

export function useMoments() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const initialLoad = useCallback(async () => {
    setLoading(true);
    pageRef.current = 1;
    try {
      const data = await fetchPosts(1, PAGE_SIZE);
      setPosts(data);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    setRefreshing(false);
  }, []);

  const onLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      const data = await fetchPosts(nextPage, PAGE_SIZE);
      setPosts(prev => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  const onLike = useCallback(async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const alreadyLiked = post.likes.some(u => u.id === CURRENT_USER_ID);
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter(u => u.id !== CURRENT_USER_ID)
            : [...p.likes, ME],
        };
      }),
    );
    try {
      if (alreadyLiked) await unlikePost(postId);
      else await likePost(postId);
    } catch {
      setPosts(prev =>
        prev.map(p => {
          if (p.id !== postId) return p;
          return {
            ...p,
            likes: alreadyLiked
              ? [...p.likes, ME]
              : p.likes.filter(u => u.id !== CURRENT_USER_ID),
          };
        }),
      );
    }
  }, [posts]);

  const onAddComment = useCallback(async (postId: string, content: string) => {
    const comment = await addComment(postId, content);
    setPosts(prev =>
      prev.map(p => (p.id !== postId ? p : {...p, comments: [...p.comments, comment]})),
    );
  }, []);

  const onDeletePost = useCallback(async (postId: string) => {
    await deletePost(postId);
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
