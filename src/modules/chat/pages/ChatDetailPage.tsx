import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  time: string;
}

interface ChatDetailProps {
  chatId?: string;
  contactName?: string;
}

const mockMessages: Message[] = [
  {id: '1', text: '你好！好久不见', isMine: false, time: '09:00'},
  {id: '2', text: '是啊，最近怎么样？', isMine: true, time: '09:01'},
  {id: '3', text: '还不错，刚换了新工作', isMine: false, time: '09:02'},
  {id: '4', text: '恭喜恭喜！在哪家公司？', isMine: true, time: '09:02'},
  {id: '5', text: '一家互联网公司，做前端开发', isMine: false, time: '09:03'},
  {id: '6', text: '挺好的，前端现在很火', isMine: true, time: '09:04'},
  {id: '7', text: '是的，React Native 用得比较多', isMine: false, time: '09:05'},
  {id: '8', text: '我们公司也在用 RN，体验还不错', isMine: true, time: '09:06'},
  {id: '9', text: '有空一起交流一下', isMine: false, time: '09:07'},
  {id: '10', text: '好啊，周末有时间吗？', isMine: true, time: '09:08'},
  {id: '11', text: '周六下午可以', isMine: false, time: '09:10'},
  {id: '12', text: '那我们约在星巴克？', isMine: true, time: '09:11'},
  {id: '13', text: '可以，哪家店？', isMine: false, time: '09:12'},
  {id: '14', text: '中关村那家吧，比较方便', isMine: true, time: '09:13'},
  {id: '15', text: '好的，到时候见！', isMine: false, time: '09:14'},
  {id: '16', text: '👌 不见不散', isMine: true, time: '09:15'},
  {id: '17', text: '对了，你最近有看什么技术书吗？', isMine: false, time: '09:20'},
  {id: '18', text: '在看 Swift 相关的，准备学原生开发', isMine: true, time: '09:22'},
];

const ChatDetailPage: React.FC<ChatDetailProps> = ({contactName = '聊天'}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: false});
    }, 100);
  }, []);

  const renderMessage = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageRow,
        item.isMine ? styles.messageRowRight : styles.messageRowLeft,
      ]}>
      {!item.isMine && (
        <View style={[styles.avatar, styles.avatarOther]}>
          <Text style={styles.avatarText}>{contactName.charAt(0)}</Text>
        </View>
      )}
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
      {item.isMine && (
        <View style={[styles.avatar, styles.avatarMine]}>
          <Text style={styles.avatarText}>我</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{contactName}</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={mockMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="输入消息..."
            placeholderTextColor="#999"
          />
          <View style={styles.sendBtn}>
            <Text style={styles.sendText}>发送</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EDEDED'},
  header: {
    backgroundColor: '#F7F7F7',
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },
  headerTitle: {fontSize: 17, fontWeight: '600', color: '#000'},
  body: {flex: 1},
  messageList: {paddingVertical: 12, paddingHorizontal: 12},
  messageRow: {flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start'},
  messageRowLeft: {justifyContent: 'flex-start'},
  messageRowRight: {justifyContent: 'flex-end'},
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOther: {backgroundColor: '#576B95', marginRight: 8},
  avatarMine: {backgroundColor: '#07C160', marginLeft: 8},
  avatarText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  bubble: {
    maxWidth: '65%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  bubbleMine: {backgroundColor: '#95EC69'},
  bubbleOther: {backgroundColor: '#F5F5F5'},
  messageText: {fontSize: 16, lineHeight: 22},
  messageTextMine: {color: '#000'},
  messageTextOther: {color: '#000'},
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#F7F7F7',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D9D9D9',
  },
  textInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#333',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#07C160',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  sendText: {color: '#fff', fontSize: 15, fontWeight: '500'},
});

export default ChatDetailPage;
