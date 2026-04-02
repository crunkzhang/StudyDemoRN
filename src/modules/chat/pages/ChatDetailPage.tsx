import React, {useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  time: string;
  showTime?: boolean;
}

interface ChatDetailProps {
  chatId?: string;
  contactName?: string;
}

const mockMessages: Message[] = [
  {id: '1', text: '你好！好久不见', isMine: false, time: '09:00', showTime: true},
  {id: '2', text: '是啊，最近怎么样？', isMine: true, time: '09:01'},
  {id: '3', text: '还不错，刚换了新工作', isMine: false, time: '09:02'},
  {id: '4', text: '恭喜恭喜！在哪家公司？', isMine: true, time: '09:02'},
  {id: '5', text: '一家互联网公司，做前端开发', isMine: false, time: '09:03'},
  {id: '6', text: '挺好的，前端现在很火', isMine: true, time: '09:04'},
  {id: '7', text: '是的，React Native 用得比较多', isMine: false, time: '09:05', showTime: true},
  {id: '8', text: '我们公司也在用 RN，体验还不错', isMine: true, time: '09:06'},
  {id: '9', text: '有空一起交流一下', isMine: false, time: '09:07'},
  {id: '10', text: '好啊，周末有时间吗？', isMine: true, time: '09:08'},
  {id: '11', text: '周六下午可以', isMine: false, time: '09:10'},
  {id: '12', text: '那我们约在星巴克？', isMine: true, time: '09:11'},
  {id: '13', text: '可以，哪家店？', isMine: false, time: '09:12'},
  {id: '14', text: '中关村那家吧，比较方便', isMine: true, time: '09:13'},
  {id: '15', text: '好的，到时候见！', isMine: false, time: '09:14', showTime: true},
  {id: '16', text: '👌 不见不散', isMine: true, time: '09:15'},
  {id: '17', text: '对了，你最近有看什么技术书吗？', isMine: false, time: '09:20'},
  {id: '18', text: '在看 Swift 相关的，准备学原生开发', isMine: true, time: '09:22'},
];

const ChatDetailPage: React.FC<ChatDetailProps> = ({contactName = '聊天'}) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: false});
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const contactInitial = useMemo(
    () => contactName.trim().charAt(0) || '聊',
    [contactName],
  );

  const renderMessage = ({item}: {item: Message}) => (
    <View>
      {item.showTime ? (
        <View style={styles.timeWrap}>
          <Text style={styles.timeText}>今天 {item.time}</Text>
        </View>
      ) : null}

      <View
        style={[
          styles.messageRow,
          item.isMine ? styles.messageRowRight : styles.messageRowLeft,
        ]}>
        {!item.isMine ? (
          <View style={[styles.avatar, styles.avatarOther]}>
            <Text style={styles.avatarText}>{contactInitial}</Text>
          </View>
        ) : null}

        <View
          style={[
            styles.bubbleWrap,
            item.isMine ? styles.bubbleWrapMine : styles.bubbleWrapOther,
          ]}>
          <View
            style={[
              styles.bubble,
              item.isMine ? styles.bubbleMine : styles.bubbleOther,
            ]}>
            <Text
              style={[
                styles.messageText,
                item.isMine ? styles.messageTextMine : styles.messageTextOther,
              ]}>
              {item.text}
            </Text>
          </View>
        </View>

        {item.isMine ? (
          <View style={[styles.avatar, styles.avatarMine]}>
            <Text style={styles.avatarText}>我</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <PageScaffold
      navMode="native"
      title={contactName}
      backgroundColor="#EAE7DF"
      navbarAppearance={{shadowHidden: true}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <View style={styles.chatCanvas}>
          <FlatList
            ref={flatListRef}
            data={mockMessages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.composerShell}>
          <View style={styles.composerBar}>
            <Pressable style={styles.toolButton}>
              <Text style={styles.toolIcon}>＋</Text>
            </Pressable>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                placeholder="输入消息"
                placeholderTextColor="#969A92"
              />
            </View>

            <Pressable style={styles.toolButton}>
              <Text style={styles.toolIcon}>☺</Text>
            </Pressable>

            <Pressable style={styles.sendBtn}>
              <Text style={styles.sendText}>发送</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7DF',
  },
  chatCanvas: {
    flex: 1,
    backgroundColor: '#EAE7DF',
  },
  messageList: {
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 18,
  },
  timeWrap: {
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
  },
  timeText: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(72,77,68,0.08)',
    color: '#777D76',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOther: {
    marginRight: 8,
    backgroundColor: '#7B8AA2',
  },
  avatarMine: {
    marginLeft: 8,
    backgroundColor: '#9AE36A',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bubbleWrap: {
    maxWidth: '72%',
  },
  bubbleWrapOther: {
    alignItems: 'flex-start',
  },
  bubbleWrapMine: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  bubbleOther: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
  },
  bubbleMine: {
    backgroundColor: '#A8E97B',
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextOther: {
    color: '#1C1F1A',
  },
  messageTextMine: {
    color: '#162109',
  },
  composerShell: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#F4F2EC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D6D2C8',
  },
  composerBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  toolIcon: {
    color: '#657063',
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '400',
  },
  inputWrap: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  textInput: {
    fontSize: 15,
    color: '#222720',
    paddingVertical: 0,
  },
  sendBtn: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#95DB62',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#18310B',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ChatDetailPage;
