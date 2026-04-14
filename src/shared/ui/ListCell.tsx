import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Type, Space, Hairline} from './tokens';
import {ChevronRight} from './icons';

interface ListCellProps {
  left?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string;
  rightNode?: React.ReactNode;
  badgeCount?: number;
  showArrow?: boolean;
  showSeparator?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const ListCell: React.FC<ListCellProps> = ({
  left,
  title,
  subtitle,
  rightText,
  rightNode,
  badgeCount,
  showArrow = true,
  showSeparator = true,
  onPress,
  style,
}) => {
  const minHeight = subtitle ? Space.rowHeightLarge : Space.rowHeight;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.row,
        {minHeight},
        pressed && onPress ? {backgroundColor: Colors.bgCardPressed} : null,
        style,
      ]}>
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.center}>
        <Text style={Type.cellTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[Type.cellSubtitle, styles.subtitle]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.right}>
        {badgeCount && badgeCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount > 99 ? '99+' : badgeCount}</Text>
          </View>
        ) : null}
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
        {rightNode}
        {showArrow ? <ChevronRight /> : null}
      </View>
      {showSeparator ? <View style={styles.separator} /> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Space.pagePadding,
    backgroundColor: Colors.bgCard,
  },
  left: {
    marginRight: Space.avatarToText,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {marginTop: 2},
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightText: {
    ...Type.caption,
    color: Colors.textSecondary,
    marginRight: 6,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.danger,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  badgeText: {color: '#fff', fontSize: 11, fontWeight: '600'},
  separator: {
    position: 'absolute',
    left: Space.pagePadding + Space.avatar + Space.avatarToText,
    right: 0,
    bottom: 0,
    height: Hairline,
    backgroundColor: Colors.separator,
  },
});

export default ListCell;
