import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, Type} from './tokens';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({icon, title, actionText, onAction}) => (
  <View style={styles.wrap}>
    {icon ? <View style={styles.icon}>{icon}</View> : null}
    <Text style={[Type.cellSubtitle, styles.title]}>{title}</Text>
    {actionText ? (
      <Pressable onPress={onAction} style={({pressed}) => [styles.btn, pressed && {opacity: 0.85}]}>
        <Text style={styles.btnText}>{actionText}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', paddingTop: 80, paddingHorizontal: 32},
  icon: {marginBottom: 16, opacity: 0.5},
  title: {textAlign: 'center', marginBottom: 20, fontSize: 14},
  btn: {
    backgroundColor: Colors.brand,
    paddingHorizontal: 24, paddingVertical: 10, borderRadius: 6,
  },
  btnText: {color: '#fff', fontSize: 15, fontWeight: '500'},
});

export default EmptyState;
