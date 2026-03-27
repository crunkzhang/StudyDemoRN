import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import {Post} from '../models/Post';
import ImageGrid from './ImageGrid';
import VideoThumb from './VideoThumb';
import LikeList from './LikeList';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import {showPostActionSheet} from './PostActionSheet';
import {useCommentViewModel} from '../viewmodels/useCommentViewModel';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  return `${Math.floor(diff / 86400)}天前`;
}

interface Props {
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onDeletePost: (postId: string) => void;
}

export default function PostItem({post, onLike, onAddComment, onDeletePost}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleAddComment = useCallback(
    (content: string) => onAddComment(post.id, content),
    [post.id, onAddComment],
  );

  const commentVM = useCommentViewModel(handleAddComment);

  const handleLongPress = useCallback(() => {
    showPostActionSheet(action => {
      switch (action) {
        case 'delete':
          Alert.alert('确认删除', '删除后不可恢复', [
            {text: '取消', style: 'cancel'},
            {text: '删除', style: 'destructive', onPress: () => onDeletePost(post.id)},
          ]);
          break;
        case 'edit':
          Alert.alert('提示', '编辑功能开发中');
          break;
        case 'report':
          Alert.alert('提示', '举报已提交');
          break;
        case 'not-interested':
          Alert.alert('提示', '已标记为不感兴趣');
          break;
      }
    });
  }, [post.id, onDeletePost]);

  const handlePressImage = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  }, []);

  const content = post.content;
  const isLong = content.length > 120;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={handleLongPress}
      delayLongPress={500}>
      <View style={styles.container}>
        {/* 头像 */}
        <Image source={{uri: post.user.avatar}} style={styles.avatar} />

        {/* 右侧内容区 */}
        <View style={styles.right}>
          {/* 昵称 */}
          <Text style={styles.name}>{post.user.name}</Text>

          {/* 文字内容 */}
          {content.length > 0 && (
            <View style={styles.contentWrapper}>
              <Text
                style={styles.content}
                numberOfLines={expanded ? undefined : (isLong ? 5 : undefined)}>
                {content}
              </Text>
              {isLong && (
                <TouchableOpacity onPress={() => setExpanded(v => !v)}>
                  <Text style={styles.expandBtn}>{expanded ? '收起' : '全文'}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* 图片宫格 */}
          {post.type === 'image' && post.images && post.images.length > 0 && (
            <View style={styles.mediaWrapper}>
              <ImageGrid images={post.images} onPressImage={handlePressImage} />
            </View>
          )}

          {/* 视频封面 */}
          {post.type === 'video' && post.videoThumb && (
            <View style={styles.mediaWrapper}>
              <VideoThumb thumb={post.videoThumb} />
            </View>
          )}

          {/* 位置 */}
          {post.location && (
            <Text style={styles.location}>📍 {post.location}</Text>
          )}

          {/* 时间 + 操作栏 */}
          <View style={styles.footer}>
            <Text style={styles.time}>{timeAgo(post.createdAt)}</Text>
            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => onLike(post.id)}>
                <Text style={styles.actionIcon}>♥</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={commentVM.show}>
                <Text style={styles.actionIcon}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 点赞列表 */}
          {post.likes.length > 0 && (
            <View style={styles.socialBlock}>
              <LikeList likes={post.likes} />
            </View>
          )}

          {/* 评论列表 */}
          {post.comments.length > 0 && (
            <View style={[styles.socialBlock, post.likes.length > 0 && styles.commentBorder]}>
              <CommentList comments={post.comments} />
            </View>
          )}
        </View>
      </View>

      {/* 评论输入框 */}
      <CommentInput
        visible={commentVM.visible}
        value={commentVM.inputText}
        submitting={commentVM.submitting}
        onChangeText={commentVM.setInputText}
        onSubmit={commentVM.submit}
        onDismiss={commentVM.hide}
      />

      {/* 图片全屏预览 */}
      {post.images && (
        <Modal
          visible={previewVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setPreviewVisible(false)}>
          <TouchableOpacity
            style={styles.previewModal}
            activeOpacity={1}
            onPress={() => setPreviewVisible(false)}>
            <Image
              source={{uri: post.images[previewIndex]}}
              style={styles.previewImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#EEE',
  },
  right: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B7EAE',
    marginBottom: 6,
  },
  contentWrapper: {marginBottom: 6},
  content: {fontSize: 15, color: '#333', lineHeight: 22},
  expandBtn: {color: '#5B7EAE', fontSize: 14, marginTop: 2},
  mediaWrapper: {marginBottom: 6},
  location: {fontSize: 12, color: '#999', marginBottom: 4},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  time: {fontSize: 12, color: '#999'},
  footerActions: {flexDirection: 'row'},
  actionBtn: {marginLeft: 12, padding: 4},
  actionIcon: {fontSize: 16, color: '#999'},
  socialBlock: {marginBottom: 4},
  commentBorder: {marginTop: 2},
  previewModal: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
