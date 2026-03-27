import React from 'react';
import {ActionSheetIOS, Alert, Platform} from 'react-native';

export type PostAction = 'delete' | 'edit' | 'report' | 'not-interested';

const ACTIONS: {label: string; key: PostAction}[] = [
  {label: '删除', key: 'delete'},
  {label: '编辑', key: 'edit'},
  {label: '举报', key: 'report'},
  {label: '不感兴趣', key: 'not-interested'},
];

export function showPostActionSheet(onSelect: (action: PostAction) => void) {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...ACTIONS.map(a => a.label), '取消'],
        cancelButtonIndex: ACTIONS.length,
        destructiveButtonIndex: 0,
      },
      index => {
        if (index < ACTIONS.length) {
          onSelect(ACTIONS[index].key);
        }
      },
    );
  } else {
    // Android：Alert 模拟
    Alert.alert(
      '操作',
      undefined,
      [
        ...ACTIONS.map(a => ({
          text: a.label,
          style: (a.key === 'delete' ? 'destructive' : 'default') as 'destructive' | 'default',
          onPress: () => onSelect(a.key),
        })),
        {text: '取消', style: 'cancel'},
      ],
    );
  }
}
