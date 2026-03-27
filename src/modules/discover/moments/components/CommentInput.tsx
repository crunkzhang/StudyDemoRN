import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';

interface Props {
  visible: boolean;
  value: string;
  submitting: boolean;
  onChangeText: (t: string) => void;
  onSubmit: () => void;
  onDismiss: () => void;
}

export default function CommentInput({
  visible,
  value,
  submitting,
  onChangeText,
  onSubmit,
  onDismiss,
}: Props) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      // 延迟确保 modal 渲染完再 focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          onDismiss();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}>
        <View style={styles.bar}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder="评论..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!value.trim() || submitting) && styles.sendBtnDisabled]}
            onPress={onSubmit}
            disabled={!value.trim() || submitting}>
            <Text style={styles.sendText}>发送</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  kav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F6F6F6',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D9D9D9',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 15,
    color: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D9D9D9',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#07C160',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  sendBtnDisabled: {backgroundColor: '#A8E0C0'},
  sendText: {color: '#fff', fontSize: 14, fontWeight: '600'},
});
