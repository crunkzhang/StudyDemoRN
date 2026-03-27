import {Post} from '../models/Post';
import {Comment} from '../models/Comment';

export interface IMomentsService {
  fetchPosts(page: number, pageSize: number): Promise<Post[]>;
  likePost(postId: string): Promise<void>;
  unlikePost(postId: string): Promise<void>;
  addComment(postId: string, content: string, replyTo?: {userId: string; userName: string}): Promise<Comment>;
  deletePost(postId: string): Promise<void>;
}
