import {User} from '../../../../shared/models/User';
import {Comment} from './Comment';

export type PostType = 'text' | 'image' | 'video';

export interface Post {
  id: string;
  user: User;
  type: PostType;
  content: string;
  images?: string[];
  videoThumb?: string;
  location?: string;
  likes: User[];
  comments: Comment[];
  createdAt: number; // timestamp ms
}
