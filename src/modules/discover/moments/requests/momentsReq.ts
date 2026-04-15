import {http, NetDomain} from '../../../../shared/net';
import {Post} from '../models/Post';
import {Comment} from '../models/Comment';
import {mockPosts} from '../models/mockData';

const USE_MOCK = true;
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const fetchPosts = async (page: number, pageSize: number): Promise<Post[]> => {
  if (USE_MOCK) {
    await delay(300);
    const start = ((page - 1) % 2) * 10;
    const slice = mockPosts.slice(start, start + pageSize);
    return slice.map(p => ({...p, id: page === 1 ? p.id : `${p.id}_p${page}`}));
  }
  return http.get<Post[]>(NetDomain.Discover, '/moments/posts', {query: {page, pageSize}});
};

export const likePost = (postId: string): Promise<void> =>
  USE_MOCK
    ? delay(300)
    : http.post<void>(NetDomain.Discover, '/moments/like', {body: {postId}});

export const unlikePost = (postId: string): Promise<void> =>
  USE_MOCK
    ? delay(300)
    : http.post<void>(NetDomain.Discover, '/moments/unlike', {body: {postId}});

export const addComment = async (
  postId: string,
  content: string,
  replyTo?: {userId: string; userName: string},
): Promise<Comment> => {
  if (USE_MOCK) {
    await delay(300);
    return {id: `c_${Date.now()}`, userId: 'me', userName: '我', content, replyTo};
  }
  return http.post<Comment>(NetDomain.Discover, '/moments/comment', {
    body: {postId, content, replyTo},
  });
};

export const deletePost = (postId: string): Promise<void> =>
  USE_MOCK
    ? delay(300)
    : http.post<void>(NetDomain.Discover, '/moments/delete', {body: {postId}});
