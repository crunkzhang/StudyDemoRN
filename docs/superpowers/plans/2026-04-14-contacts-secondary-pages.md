# 通讯录二级页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为通讯录模块实现 5 个 RN 二级页面（新的朋友、群聊、标签+新建、公众号、搜索）+ 1 个 iOS 原生联系人详情页，严格对齐微信视觉、加入精致化细节。

**Architecture:** 在 `src/shared/ui/` 建立设计 token + 5 个共用组件，在 `src/modules/contacts/views/` 建立页面组件，通过 RN 路由注册。联系人详情页放在 `WeChatSwift/Modules/Business/ContactModule/ContactDetail/`，RN 通过现有 bridge 路由到原生页。

**Tech Stack:** React Native + TypeScript（RN 页面）；Swift + UIKit + SnapKit（iOS 原生详情）。

**Testing note:** 本项目仅在 `__tests__` 下有少量 Jest 冒烟测试，无 UI 快照体系。UI 组件改用"可渲染 + 手动 verify"为主，共用纯函数（如拼音首字母、搜索高亮分片）走 Jest 单测。

---

## File Structure

**RN 新增：**

```
src/shared/ui/
  tokens.ts                      # 颜色/字体/间距 token
  ListCell.tsx                   # 通用列表行
  ListSection.tsx                # 白卡分组容器
  SearchBar.tsx                  # 搜索框
  Avatar.tsx                     # 头像（图片/首字母/九宫格）
  EmptyState.tsx                 # 空状态
  icons.tsx                      # 内置 SVG 图标（无依赖，纯 Path）

src/modules/contacts/
  data/
    mockFriendRequests.ts
    mockGroups.ts
    mockTags.ts
    mockOfficialAccounts.ts
    mockContacts.ts              # 搜索用
  utils/
    highlight.ts                 # 搜索命中分片
    highlight.test.ts
  views/
    NewFriendsScreen.tsx
    GroupChatsScreen.tsx
    TagsScreen.tsx
    TagCreateScreen.tsx
    OfficialAccountsScreen.tsx
    SearchScreen.tsx
    components/
      FriendRequestRow.tsx
      GroupAvatar.tsx
      QuickEntryGrid.tsx
      SearchHitText.tsx
```

**RN 修改：**

- `src/app/navigation/routes.ts`：注册 6 条路由
- `src/app/navigation/types.ts`：添加路由参数类型

**iOS 新增：**

```
WeChatSwift/Modules/Business/ContactModule/ContactDetail/
  ContactDetailViewController.swift
  ContactDetailHeaderView.swift
  ContactDetailInfoCell.swift
  ContactDetailActionBar.swift
```

**iOS 修改：**

- `WeChatSwift/Modules/Business/ContactModule/ContactModule.swift`：注册 `wechat://contact/detail` 路由
- `WeChatSwift/WeChatSwift.xcodeproj/project.pbxproj`（或 `project.yml` 若用 xcodegen）：加入新文件

---

## Task 1: 设计 Token

**Files:**
- Create: `src/shared/ui/tokens.ts`

- [ ] **Step 1: 写 tokens.ts**

```typescript
// src/shared/ui/tokens.ts
import {StyleSheet, Platform} from 'react-native';

export const Colors = {
  brand: '#07C160',
  brandPressed: '#06AD56',
  danger: '#FA5151',
  bgPage: '#EDEDED',
  bgCard: '#FFFFFF',
  bgCardPressed: '#D9D9D9',
  textPrimary: '#191919',
  textSecondary: '#888888',
  textTertiary: '#B2B2B2',
  separator: '#E5E5E5',
  searchBg: '#E7E7E7',
  avatarStroke: 'rgba(0,0,0,0.04)',
} as const;

export const FontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const Type = {
  title: {fontSize: 17, fontWeight: '600' as const, color: Colors.textPrimary},
  cellTitle: {fontSize: 17, fontWeight: '400' as const, color: Colors.textPrimary},
  cellSubtitle: {fontSize: 13, fontWeight: '400' as const, color: Colors.textSecondary},
  sectionHeader: {fontSize: 14, fontWeight: '400' as const, color: Colors.textSecondary},
  caption: {fontSize: 11, fontWeight: '400' as const, color: Colors.textTertiary},
};

export const Space = {
  pagePadding: 16,
  rowHeight: 56,
  rowHeightLarge: 64,
  avatar: 40,
  avatarLarge: 44,
  avatarRadius: 4,
  avatarToText: 12,
  sectionGap: 28,
};

export const Hairline = StyleSheet.hairlineWidth;
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/tokens.ts
git commit -m "feat(ui): add design tokens for WeChat-style pages"
```

---

## Task 2: 内置 SVG 图标库

**Files:**
- Create: `src/shared/ui/icons.tsx`

> 使用 `react-native-svg`（项目已用，见 `package.json`；若没有请在本任务开始前 `yarn add react-native-svg` 并 `cd ios && pod install`）。

- [ ] **Step 1: 确认 react-native-svg 已安装**

Run: `grep react-native-svg package.json`
Expected: 出现依赖；若没有，先安装。

- [ ] **Step 2: 写 icons.tsx**

```tsx
// src/shared/ui/icons.tsx
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const ChevronRight: React.FC<IconProps> = ({size = 14, color = '#C7C7CC'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Search: React.FC<IconProps> = ({size = 16, color = '#888'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const Plus: React.FC<IconProps> = ({size = 18, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </Svg>
);

export const Close: React.FC<IconProps> = ({size = 14, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export const Tag: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 12l-8 8-9-9V3h8l9 9z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
    <Circle cx={7.5} cy={7.5} r={1.5} fill={color} />
  </Svg>
);

export const Megaphone: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3 11v2a2 2 0 002 2h2l8 4V5L7 9H5a2 2 0 00-2 2z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);

export const UserPlus: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={10} cy={8} r={4} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M19 4v6M16 7h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const Users: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={9} cy={8} r={3.5} stroke={color} strokeWidth={2} fill="none" />
    <Circle cx={17} cy={9} r={2.5} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 20c0-3 2.8-5.5 7-5.5s7 2.5 7 5.5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M15 14c3.3 0 6 2 6 5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
  </Svg>
);

export const Chat: React.FC<IconProps> = ({size = 18, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 5h16v11H7l-3 3V5z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);

export const Phone: React.FC<IconProps> = ({size = 18, color = '#07C160'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 5l3-1 2 4-2 1c.8 2 2.2 3.4 4 4l1-2 4 2-1 3c-7 0-11-4-11-11z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);
```

- [ ] **Step 3: 提交**

```bash
git add src/shared/ui/icons.tsx
git commit -m "feat(ui): add built-in SVG icon set"
```

---

## Task 3: ListCell 组件

**Files:**
- Create: `src/shared/ui/ListCell.tsx`

- [ ] **Step 1: 写 ListCell**

```tsx
// src/shared/ui/ListCell.tsx
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
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/ListCell.tsx
git commit -m "feat(ui): add ListCell shared component"
```

---

## Task 4: ListSection 组件

**Files:**
- Create: `src/shared/ui/ListSection.tsx`

- [ ] **Step 1: 写 ListSection**

```tsx
// src/shared/ui/ListSection.tsx
import React, {Children} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Type, Space} from './tokens';

interface ListSectionProps {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  marginTop?: number;
}

const ListSection: React.FC<ListSectionProps> = ({header, footer, children, marginTop}) => {
  const items = Children.toArray(children);
  return (
    <View style={{marginTop: marginTop ?? Space.sectionGap}}>
      {header ? (
        <Text style={[Type.sectionHeader, styles.header]} numberOfLines={1}>
          {header}
        </Text>
      ) : null}
      <View style={styles.card}>
        {items.map((child, i) => {
          const isLast = i === items.length - 1;
          if (React.isValidElement(child) && isLast) {
            return React.cloneElement(child as React.ReactElement<any>, {
              showSeparator: false,
            });
          }
          return child;
        })}
      </View>
      {footer ? <Text style={[Type.caption, styles.footer]}>{footer}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Space.pagePadding,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: Colors.bgCard,
  },
  footer: {
    paddingHorizontal: Space.pagePadding,
    paddingTop: 8,
  },
});

export default ListSection;
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/ListSection.tsx
git commit -m "feat(ui): add ListSection shared component"
```

---

## Task 5: Avatar 组件

**Files:**
- Create: `src/shared/ui/Avatar.tsx`

- [ ] **Step 1: 写 Avatar**

```tsx
// src/shared/ui/Avatar.tsx
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Space} from './tokens';

interface AvatarProps {
  size?: number;
  shape?: 'square' | 'circle';
  uri?: string;
  name?: string;
  bgColor?: string;
  style?: ViewStyle;
}

const PALETTE = ['#F39B38', '#4D7CFE', '#15B56B', '#5D6B86', '#E75A5A', '#8B72BE', '#3399CC', '#E6567A'];
const colorFor = (s: string) => PALETTE[Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

export const Avatar: React.FC<AvatarProps> = ({
  size = Space.avatar,
  shape = 'square',
  uri,
  name = '',
  bgColor,
  style,
}) => {
  const radius = shape === 'circle' ? size / 2 : Space.avatarRadius;
  const initial = name.trim().charAt(0) || '?';
  const bg = bgColor ?? colorFor(name);
  return (
    <View
      style={[
        styles.wrap,
        {width: size, height: size, borderRadius: radius, backgroundColor: uri ? '#eee' : bg},
        style,
      ]}>
      {uri ? (
        <Image source={{uri}} style={{width: size, height: size, borderRadius: radius}} />
      ) : (
        <Text style={[styles.text, {fontSize: size * 0.42}]}>{initial}</Text>
      )}
      <View style={[styles.stroke, {borderRadius: radius}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center'},
  text: {color: '#FFFFFF', fontWeight: '600'},
  stroke: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.avatarStroke,
  },
});

export default Avatar;
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/Avatar.tsx
git commit -m "feat(ui): add Avatar shared component"
```

---

## Task 6: SearchBar 组件

**Files:**
- Create: `src/shared/ui/SearchBar.tsx`

- [ ] **Step 1: 写 SearchBar**

```tsx
// src/shared/ui/SearchBar.tsx
import React, {forwardRef} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from './tokens';
import {Search as SearchIcon, Close} from './icons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onChangeText?: (v: string) => void;
  onPress?: () => void;
  onClear?: () => void;
  onSubmitEditing?: () => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({placeholder = '搜索', value, editable = true, autoFocus, onChangeText, onPress, onClear, onSubmitEditing}, ref) => {
    const body = (
      <View style={styles.bar}>
        <SearchIcon size={15} color="#888" />
        {editable ? (
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.textTertiary}
            value={value}
            autoFocus={autoFocus}
            returnKeyType="search"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        {value ? (
          <Pressable onPress={onClear} hitSlop={8} style={styles.clearBtn}>
            <View style={styles.clearDot}>
              <Close size={10} color="#fff" />
            </View>
          </Pressable>
        ) : null}
      </View>
    );
    if (onPress && !editable) {
      return (
        <Pressable onPress={onPress} style={styles.wrap}>
          {body}
        </Pressable>
      );
    }
    return <View style={styles.wrap}>{body}</View>;
  },
);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.bgCard,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  bar: {
    height: 36,
    backgroundColor: Colors.searchBg,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {flex: 1, marginLeft: 6, fontSize: 15, color: Colors.textPrimary, paddingVertical: 0},
  placeholder: {flex: 1, marginLeft: 6, fontSize: 15, color: Colors.textTertiary},
  clearBtn: {marginLeft: 6},
  clearDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#BFBFBF', alignItems: 'center', justifyContent: 'center',
  },
});

export default SearchBar;
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/SearchBar.tsx
git commit -m "feat(ui): add SearchBar shared component"
```

---

## Task 7: EmptyState 组件

**Files:**
- Create: `src/shared/ui/EmptyState.tsx`

- [ ] **Step 1: 写 EmptyState**

```tsx
// src/shared/ui/EmptyState.tsx
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
```

- [ ] **Step 2: 提交**

```bash
git add src/shared/ui/EmptyState.tsx
git commit -m "feat(ui): add EmptyState shared component"
```

---

## Task 8: 搜索命中高亮工具（含单测）

**Files:**
- Create: `src/modules/contacts/utils/highlight.ts`
- Create: `src/modules/contacts/utils/highlight.test.ts`

- [ ] **Step 1: 写单测**

```ts
// src/modules/contacts/utils/highlight.test.ts
import {splitByHit} from './highlight';

describe('splitByHit', () => {
  it('空关键字返回整串', () => {
    expect(splitByHit('hello', '')).toEqual([{text: 'hello', hit: false}]);
  });
  it('无命中返回整串', () => {
    expect(splitByHit('hello', 'x')).toEqual([{text: 'hello', hit: false}]);
  });
  it('单次命中', () => {
    expect(splitByHit('hello', 'll')).toEqual([
      {text: 'he', hit: false},
      {text: 'll', hit: true},
      {text: 'o', hit: false},
    ]);
  });
  it('命中大小写不敏感', () => {
    expect(splitByHit('Hello', 'h')).toEqual([
      {text: 'H', hit: true},
      {text: 'ello', hit: false},
    ]);
  });
  it('多次命中', () => {
    expect(splitByHit('ababa', 'a')).toEqual([
      {text: 'a', hit: true},
      {text: 'b', hit: false},
      {text: 'a', hit: true},
      {text: 'b', hit: false},
      {text: 'a', hit: true},
    ]);
  });
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `yarn jest src/modules/contacts/utils/highlight.test.ts`
Expected: FAIL（模块不存在）。

- [ ] **Step 3: 写实现**

```ts
// src/modules/contacts/utils/highlight.ts
export interface HitSegment { text: string; hit: boolean; }

export function splitByHit(text: string, keyword: string): HitSegment[] {
  if (!keyword) return [{text, hit: false}];
  const lowerText = text.toLowerCase();
  const lowerKey = keyword.toLowerCase();
  const out: HitSegment[] = [];
  let i = 0;
  while (i < text.length) {
    const idx = lowerText.indexOf(lowerKey, i);
    if (idx === -1) {
      out.push({text: text.slice(i), hit: false});
      break;
    }
    if (idx > i) out.push({text: text.slice(i, idx), hit: false});
    out.push({text: text.slice(idx, idx + keyword.length), hit: true});
    i = idx + keyword.length;
  }
  return out;
}
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `yarn jest src/modules/contacts/utils/highlight.test.ts`
Expected: PASS（5 个用例）。

- [ ] **Step 5: 提交**

```bash
git add src/modules/contacts/utils/highlight.ts src/modules/contacts/utils/highlight.test.ts
git commit -m "feat(contacts): add search hit splitter util + tests"
```

---

## Task 9: Mock 数据

**Files:**
- Create: `src/modules/contacts/data/mockFriendRequests.ts`
- Create: `src/modules/contacts/data/mockGroups.ts`
- Create: `src/modules/contacts/data/mockTags.ts`
- Create: `src/modules/contacts/data/mockOfficialAccounts.ts`
- Create: `src/modules/contacts/data/mockContacts.ts`

- [ ] **Step 1: 写 mock 数据**

```ts
// src/modules/contacts/data/mockFriendRequests.ts
export type FriendRequestStatus = 'pending' | 'accepted' | 'expired';
export interface FriendRequest {
  id: string; name: string; source: string; status: FriendRequestStatus;
}
export const mockFriendRequests: FriendRequest[] = [
  {id: '1', name: '陆涛', source: '来自手机联系人：陆涛', status: 'pending'},
  {id: '2', name: '林夏', source: '朋友验证：同事推荐', status: 'pending'},
  {id: '3', name: '周诗', source: '朋友验证：好久不见', status: 'accepted'},
  {id: '4', name: '吴迪', source: '朋友验证：你好', status: 'expired'},
];
```

```ts
// src/modules/contacts/data/mockGroups.ts
export interface GroupInfo { id: string; name: string; memberCount: number; memberNames: string[]; }
export const mockGroups: GroupInfo[] = [
  {id: 'g1', name: 'RN 技术交流群', memberCount: 128, memberNames: ['小李','小王','小张','阿强','Tom','Kelly','Alex','Jenny','Max']},
  {id: 'g2', name: '周末爬山小分队', memberCount: 12, memberNames: ['张三','李四','王五','赵六']},
  {id: 'g3', name: '家人群', memberCount: 6, memberNames: ['爸','妈','哥','姐','我','弟']},
];
```

```ts
// src/modules/contacts/data/mockTags.ts
export interface TagInfo { id: string; name: string; count: number; contacts: string[]; }
export const mockTags: TagInfo[] = [
  {id: 't1', name: '同事', count: 12, contacts: ['陈静','王芳','张伟','李娜']},
  {id: 't2', name: '大学同学', count: 23, contacts: ['刘洋','高远','邓超']},
  {id: 't3', name: '家人', count: 6, contacts: ['爸','妈','哥','姐']},
];
```

```ts
// src/modules/contacts/data/mockOfficialAccounts.ts
export interface OfficialAccount { id: string; name: string; latest: string; time: string; unread: number; }
export const mockOfficialAccounts: OfficialAccount[] = [
  {id: 'o1', name: '微信派', latest: '微信 8.0.42 版本更新功能说明', time: '昨天', unread: 2},
  {id: 'o2', name: '腾讯科技', latest: '一季度财报解读：AI 增速显著', time: '3-15', unread: 0},
  {id: 'o3', name: 'InfoQ', latest: 'React Native 新架构落地案例', time: '3-14', unread: 1},
];
```

```ts
// src/modules/contacts/data/mockContacts.ts
export interface ContactLite { id: string; name: string; wxid: string; }
export const mockContactsLite: ContactLite[] = [
  {id: 'c1', name: '陈静', wxid: 'chen_j'},
  {id: 'c2', name: '王芳', wxid: 'wangfang88'},
  {id: 'c3', name: '张伟', wxid: 'zhangwei_dev'},
  {id: 'c4', name: '李娜', wxid: 'lina'},
  {id: 'c5', name: '刘洋', wxid: 'liuyang1990'},
  {id: 'c6', name: '高远', wxid: 'gaoyuan_rn'},
];
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/data
git commit -m "feat(contacts): add mock data for secondary pages"
```

---

## Task 10: 路由注册

**Files:**
- Modify: `src/app/navigation/types.ts`
- Modify: `src/app/navigation/routes.ts`

- [ ] **Step 1: 扩展 types.ts**

在 `RouteParamsMap` 里追加（放在 `gameContainer` 行之前）：

```ts
  contactNewFriends: void;
  contactGroups: void;
  contactTags: void;
  contactTagCreate: void;
  contactOfficialAccounts: void;
  contactSearch: void;
```

- [ ] **Step 2: 扩展 routes.ts**

在 `routes` 对象末尾（`gameContainer` 之后）追加：

```ts
  contactNewFriends: {
    description: '新的朋友',
    component: () => require('../../modules/contacts/views/NewFriendsScreen').default,
  },
  contactGroups: {
    description: '群聊',
    component: () => require('../../modules/contacts/views/GroupChatsScreen').default,
  },
  contactTags: {
    description: '标签',
    component: () => require('../../modules/contacts/views/TagsScreen').default,
  },
  contactTagCreate: {
    description: '新建标签',
    component: () => require('../../modules/contacts/views/TagCreateScreen').default,
  },
  contactOfficialAccounts: {
    description: '公众号',
    component: () => require('../../modules/contacts/views/OfficialAccountsScreen').default,
  },
  contactSearch: {
    description: '通讯录搜索',
    component: () => require('../../modules/contacts/views/SearchScreen').default,
  },
```

- [ ] **Step 3: TypeScript 编译通过**

Run: `yarn tsc --noEmit`
Expected: PASS（此时上述 require 的文件还不存在，会报错；先 stub 出空文件再编译）。

  先创建 stub：

  ```bash
  for f in NewFriendsScreen GroupChatsScreen TagsScreen TagCreateScreen OfficialAccountsScreen SearchScreen; do
    cat > src/modules/contacts/views/$f.tsx <<'EOF'
import React from 'react';
import {View} from 'react-native';
const Stub: React.FC = () => <View />;
export default Stub;
EOF
  done
  ```

  再跑 `yarn tsc --noEmit`。

- [ ] **Step 4: 提交**

```bash
git add src/app/navigation src/modules/contacts/views
git commit -m "feat(contacts): register 6 secondary routes + view stubs"
```

---

## Task 11: FriendRequestRow 组件

**Files:**
- Create: `src/modules/contacts/views/components/FriendRequestRow.tsx`

- [ ] **Step 1: 写组件**

```tsx
// src/modules/contacts/views/components/FriendRequestRow.tsx
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, Space, Hairline, Type} from '../../../../shared/ui/tokens';
import Avatar from '../../../../shared/ui/Avatar';
import type {FriendRequest} from '../../data/mockFriendRequests';

interface Props {
  item: FriendRequest;
  onAccept?: (id: string) => void;
  onPress?: (id: string) => void;
  showSeparator?: boolean;
}

const FriendRequestRow: React.FC<Props> = ({item, onAccept, onPress, showSeparator = true}) => (
  <Pressable
    onPress={() => onPress?.(item.id)}
    style={({pressed}) => [styles.row, pressed && {backgroundColor: Colors.bgCardPressed}]}>
    <Avatar name={item.name} size={Space.avatar} />
    <View style={styles.center}>
      <Text style={Type.cellTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={[Type.cellSubtitle, {marginTop: 2}]} numberOfLines={1}>{item.source}</Text>
    </View>
    <View style={styles.right}>
      {item.status === 'pending' ? (
        <Pressable
          onPress={() => onAccept?.(item.id)}
          style={({pressed}) => [styles.acceptBtn, pressed && {backgroundColor: Colors.brandPressed}]}>
          <Text style={styles.acceptText}>接受</Text>
        </Pressable>
      ) : (
        <Text style={styles.stateText}>
          {item.status === 'accepted' ? '已添加' : '已过期'}
        </Text>
      )}
    </View>
    {showSeparator ? <View style={styles.sep} /> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Space.pagePadding,
    minHeight: Space.rowHeightLarge,
    backgroundColor: Colors.bgCard,
  },
  center: {flex: 1, marginLeft: Space.avatarToText, justifyContent: 'center'},
  right: {marginLeft: 8},
  acceptBtn: {
    backgroundColor: Colors.brand,
    paddingHorizontal: 14, height: 30, borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  acceptText: {color: '#fff', fontSize: 14, fontWeight: '500'},
  stateText: {fontSize: 13, color: Colors.textTertiary},
  sep: {
    position: 'absolute',
    left: Space.pagePadding + Space.avatar + Space.avatarToText,
    right: 0, bottom: 0,
    height: Hairline, backgroundColor: Colors.separator,
  },
});

export default FriendRequestRow;
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/views/components/FriendRequestRow.tsx
git commit -m "feat(contacts): add FriendRequestRow"
```

---

## Task 12: NewFriendsScreen

**Files:**
- Modify: `src/modules/contacts/views/NewFriendsScreen.tsx`

- [ ] **Step 1: 写页面**

```tsx
// src/modules/contacts/views/NewFriendsScreen.tsx
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import SearchBar from '../../../shared/ui/SearchBar';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import EmptyState from '../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../shared/ui/tokens';
import {UserPlus} from '../../../shared/ui/icons';
import {mockFriendRequests, FriendRequest} from '../data/mockFriendRequests';
import FriendRequestRow from './components/FriendRequestRow';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const NewFriendsScreen: React.FC = () => {
  const [list, setList] = useState<FriendRequest[]>(mockFriendRequests);

  const accept = (id: string) =>
    setList(prev => prev.map(x => (x.id === id ? {...x, status: 'accepted'} : x)));

  return (
    <PageScaffold navMode="native" title="新的朋友" backgroundColor={Colors.bgPage}>
      <FlatList
        data={list}
        keyExtractor={x => x.id}
        ListHeaderComponent={
          <>
            <SearchBar placeholder="添加朋友" editable={false} />
            {list.length > 0 ? (
              <ListSection header="新的朋友" marginTop={Space.sectionGap}>
                {/* dummy child so ListSection cloneElement branch works */}
                <View />
              </ListSection>
            ) : null}
          </>
        }
        renderItem={({item, index}) => (
          <View style={styles.cardRow}>
            <FriendRequestRow
              item={item}
              onAccept={accept}
              showSeparator={index !== list.length - 1}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<UserPlus size={56} color="#CCCCCC" />}
            title="还没有新的朋友"
            actionText="添加朋友"
          />
        }
        ListFooterComponent={
          <ListSection>
            <ListCell
              left={<IconBox color="#F39B38"><UserPlus size={18} /></IconBox>}
              title="添加手机联系人"
            />
            <ListCell
              left={<IconBox color="#4D7CFE"><UserPlus size={18} /></IconBox>}
              title="添加 QQ 好友"
            />
          </ListSection>
        }
      />
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  cardRow: {backgroundColor: Colors.bgCard},
  iconBox: {
    width: 30, height: 30, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
});

export default NewFriendsScreen;
```

- [ ] **Step 2: tsc 通过**

Run: `yarn tsc --noEmit`
Expected: PASS。

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/views/NewFriendsScreen.tsx
git commit -m "feat(contacts): implement NewFriendsScreen"
```

---

## Task 13: GroupAvatar + GroupChatsScreen

**Files:**
- Create: `src/modules/contacts/views/components/GroupAvatar.tsx`
- Modify: `src/modules/contacts/views/GroupChatsScreen.tsx`

- [ ] **Step 1: GroupAvatar**

```tsx
// src/modules/contacts/views/components/GroupAvatar.tsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Space} from '../../../../shared/ui/tokens';

const PALETTE = ['#F39B38', '#4D7CFE', '#15B56B', '#5D6B86', '#E75A5A', '#8B72BE', '#3399CC', '#E6567A'];
const colorFor = (s: string) => PALETTE[Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

const GroupAvatar: React.FC<{members: string[]; size?: number}> = ({members, size = Space.avatar}) => {
  const slots = members.slice(0, 9);
  const gap = 1;
  const cell = (size - gap * 4) / 3;
  return (
    <View style={[styles.wrap, {width: size, height: size}]}>
      {slots.map((name, i) => (
        <View
          key={i}
          style={[
            styles.cell,
            {width: cell, height: cell, margin: gap / 2, backgroundColor: colorFor(name)},
          ]}>
          <Text style={[styles.text, {fontSize: cell * 0.5}]}>{name.charAt(0)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: '#D8D8D8', borderRadius: Space.avatarRadius, padding: 1.5,
  },
  cell: {alignItems: 'center', justifyContent: 'center', borderRadius: 1},
  text: {color: '#fff', fontWeight: '600'},
});

export default GroupAvatar;
```

- [ ] **Step 2: GroupChatsScreen**

```tsx
// src/modules/contacts/views/GroupChatsScreen.tsx
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import SearchBar from '../../../shared/ui/SearchBar';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import {Colors, Space} from '../../../shared/ui/tokens';
import {Plus, Users} from '../../../shared/ui/icons';
import {mockGroups} from '../data/mockGroups';
import GroupAvatar from './components/GroupAvatar';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const GroupChatsScreen: React.FC = () => (
  <PageScaffold navMode="native" title="群聊" backgroundColor={Colors.bgPage}>
    <ScrollView>
      <SearchBar editable={false} />
      <ListSection marginTop={Space.sectionGap}>
        <ListCell
          left={<IconBox color={Colors.brand}><Plus size={18} /></IconBox>}
          title="发起群聊"
        />
        <ListCell
          left={<IconBox color="#4D7CFE"><Users size={18} /></IconBox>}
          title="保存到通讯录的群聊"
        />
      </ListSection>
      <ListSection header="我的群聊">
        {mockGroups.map(g => (
          <ListCell
            key={g.id}
            left={<GroupAvatar members={g.memberNames} />}
            title={g.name}
            rightText={`${g.memberCount}`}
          />
        ))}
      </ListSection>
    </ScrollView>
  </PageScaffold>
);

const styles = StyleSheet.create({
  iconBox: {
    width: Space.avatar, height: Space.avatar,
    borderRadius: Space.avatarRadius,
    alignItems: 'center', justifyContent: 'center',
  },
});

export default GroupChatsScreen;
```

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/views/components/GroupAvatar.tsx src/modules/contacts/views/GroupChatsScreen.tsx
git commit -m "feat(contacts): implement GroupChatsScreen + GroupAvatar"
```

---

## Task 14: TagsScreen

**Files:**
- Modify: `src/modules/contacts/views/TagsScreen.tsx`

- [ ] **Step 1: 写页面**

```tsx
// src/modules/contacts/views/TagsScreen.tsx
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import EmptyState from '../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../shared/ui/tokens';
import {Tag} from '../../../shared/ui/icons';
import {mockTags} from '../data/mockTags';
import {useNavigation} from '../../../shared/bridges/hooks/useNavbar';

const TagsScreen: React.FC = () => {
  const goCreate = () => {
    // 通过全局 Navigation 对象
    require('../../../app/navigation/Navigation').default.push('contactTagCreate');
  };

  return (
    <PageScaffold
      navMode="native"
      title="标签"
      backgroundColor={Colors.bgPage}
      right={
        <Pressable onPress={goCreate} hitSlop={10}>
          <Text style={styles.nav}>新建</Text>
        </Pressable>
      }>
      <ScrollView>
        {mockTags.length > 0 ? (
          <ListSection header="按标签" marginTop={Space.sectionGap}>
            {mockTags.map(t => (
              <ListCell
                key={t.id}
                title={t.name}
                rightText={`${t.count} 个联系人`}
              />
            ))}
          </ListSection>
        ) : (
          <EmptyState
            icon={<Tag size={56} color="#CCCCCC" />}
            title="还没有标签"
            actionText="新建标签"
            onAction={goCreate}
          />
        )}
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  nav: {color: Colors.brand, fontSize: 16, fontWeight: '500'},
});

export default TagsScreen;
```

注：`useNavigation` 一行可删，这里实际走 `Navigation.push` 全局对象。先看下 `src/app/navigation/Navigation.ts` 确认 API：若它默认导出 `{push, pop, ...}`，上述 `require(...).default` 即 navigator。若不同，改成正确的 import。

- [ ] **Step 2: tsc 通过，提交**

```bash
yarn tsc --noEmit
git add src/modules/contacts/views/TagsScreen.tsx
git commit -m "feat(contacts): implement TagsScreen"
```

---

## Task 15: TagCreateScreen

**Files:**
- Modify: `src/modules/contacts/views/TagCreateScreen.tsx`

- [ ] **Step 1: 写页面**

```tsx
// src/modules/contacts/views/TagCreateScreen.tsx
import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import {Colors, Space, Type, Hairline} from '../../../shared/ui/tokens';
import Avatar from '../../../shared/ui/Avatar';
import {mockContactsLite} from '../data/mockContacts';

const TagCreateScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const canSave = name.trim().length > 0;

  return (
    <PageScaffold
      navMode="native"
      title="新建标签"
      backgroundColor={Colors.bgPage}
      right={
        <Pressable hitSlop={10} disabled={!canSave}>
          <Text style={[styles.nav, !canSave && {opacity: 0.4}]}>保存</Text>
        </Pressable>
      }>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="请输入标签名"
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        <Pressable style={({pressed}) => [styles.primaryBtn, pressed && {opacity: 0.9}]}>
          <Text style={styles.primaryBtnText}>从通讯录选择</Text>
        </Pressable>

        {selected.length > 0 ? (
          <View style={styles.chipWrap}>
            {selected.map(id => {
              const c = mockContactsLite.find(x => x.id === id);
              if (!c) return null;
              return (
                <View key={id} style={styles.chip}>
                  <Avatar name={c.name} size={36} />
                  <Text style={styles.chipName} numberOfLines={1}>{c.name}</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        {/* demo: 让开发期能看到已选态，列出前 3 人一键加入 */}
        <View style={{padding: 12}}>
          {mockContactsLite.slice(0, 3).map(c => (
            <Pressable
              key={c.id}
              onPress={() =>
                setSelected(s => (s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id]))
              }
              style={styles.debugRow}>
              <Text style={Type.cellTitle}>{selected.includes(c.id) ? '✓ ' : '  '}{c.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  nav: {color: Colors.brand, fontSize: 16, fontWeight: '500'},
  inputCard: {
    marginTop: Space.sectionGap, backgroundColor: Colors.bgCard,
    paddingHorizontal: Space.pagePadding,
    borderTopWidth: Hairline, borderBottomWidth: Hairline, borderColor: Colors.separator,
  },
  input: {height: 48, fontSize: 17, color: Colors.textPrimary, padding: 0},
  primaryBtn: {
    marginHorizontal: Space.pagePadding, marginTop: 20,
    height: 44, borderRadius: 6,
    backgroundColor: Colors.brand, alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: {color: '#fff', fontSize: 16, fontWeight: '500'},
  chipWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: Space.pagePadding, paddingTop: 20,
  },
  chip: {width: 56, alignItems: 'center', marginRight: 12, marginBottom: 12},
  chipName: {marginTop: 4, fontSize: 11, color: Colors.textSecondary, maxWidth: 56},
  debugRow: {paddingVertical: 10},
});

export default TagCreateScreen;
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/views/TagCreateScreen.tsx
git commit -m "feat(contacts): implement TagCreateScreen"
```

---

## Task 16: OfficialAccountsScreen

**Files:**
- Modify: `src/modules/contacts/views/OfficialAccountsScreen.tsx`

- [ ] **Step 1: 写页面**

```tsx
// src/modules/contacts/views/OfficialAccountsScreen.tsx
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../shared/ui/PageScaffold';
import ListSection from '../../../shared/ui/ListSection';
import ListCell from '../../../shared/ui/ListCell';
import Avatar from '../../../shared/ui/Avatar';
import {Colors, Space} from '../../../shared/ui/tokens';
import {Search as SearchIcon} from '../../../shared/ui/icons';
import {mockOfficialAccounts} from '../data/mockOfficialAccounts';

const OfficialAccountsScreen: React.FC = () => (
  <PageScaffold
    navMode="native"
    title="公众号"
    backgroundColor={Colors.bgPage}
    right={
      <Pressable hitSlop={10} style={styles.search}>
        <SearchIcon size={20} color={Colors.textPrimary} />
      </Pressable>
    }>
    <ScrollView>
      <ListSection header="全部公众号" marginTop={Space.sectionGap}>
        {mockOfficialAccounts.map(a => (
          <ListCell
            key={a.id}
            left={<Avatar name={a.name} shape="circle" size={Space.avatarLarge} />}
            title={a.name}
            subtitle={a.latest}
            rightNode={
              <View style={styles.rightCol}>
                <Text style={styles.time}>{a.time}</Text>
                {a.unread > 0 ? <View style={styles.dot} /> : null}
              </View>
            }
            showArrow={false}
          />
        ))}
      </ListSection>
    </ScrollView>
  </PageScaffold>
);

const styles = StyleSheet.create({
  search: {padding: 6},
  rightCol: {alignItems: 'flex-end'},
  time: {fontSize: 11, color: Colors.textTertiary},
  dot: {
    marginTop: 6,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.danger,
  },
});

export default OfficialAccountsScreen;
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/views/OfficialAccountsScreen.tsx
git commit -m "feat(contacts): implement OfficialAccountsScreen"
```

---

## Task 17: QuickEntryGrid + SearchHitText

**Files:**
- Create: `src/modules/contacts/views/components/QuickEntryGrid.tsx`
- Create: `src/modules/contacts/views/components/SearchHitText.tsx`

- [ ] **Step 1: 写 SearchHitText**

```tsx
// src/modules/contacts/views/components/SearchHitText.tsx
import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Colors} from '../../../../shared/ui/tokens';
import {splitByHit} from '../../utils/highlight';

interface Props { text: string; keyword: string; style?: StyleProp<TextStyle>; numberOfLines?: number; }

const SearchHitText: React.FC<Props> = ({text, keyword, style, numberOfLines}) => (
  <Text style={style} numberOfLines={numberOfLines}>
    {splitByHit(text, keyword).map((seg, i) => (
      <Text key={i} style={seg.hit ? {color: Colors.brand} : undefined}>{seg.text}</Text>
    ))}
  </Text>
);

export default SearchHitText;
```

- [ ] **Step 2: 写 QuickEntryGrid**

```tsx
// src/modules/contacts/views/components/QuickEntryGrid.tsx
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../shared/ui/tokens';
import {Users, Chat, Megaphone, Search as SearchIcon} from '../../../../shared/ui/icons';

interface Entry { key: string; label: string; icon: React.ReactNode; }

const entries: Entry[] = [
  {key: 'contacts', label: '联系人', icon: <Users size={22} color="#7A7A7A" />},
  {key: 'groups', label: '群聊', icon: <Users size={22} color="#7A7A7A" />},
  {key: 'messages', label: '聊天记录', icon: <Chat size={22} color="#7A7A7A" />},
  {key: 'official', label: '公众号', icon: <Megaphone size={22} color="#7A7A7A" />},
];

const QuickEntryGrid: React.FC<{onPick?: (k: string) => void}> = ({onPick}) => (
  <View style={styles.wrap}>
    {entries.map(e => (
      <Pressable
        key={e.key}
        onPress={() => onPick?.(e.key)}
        style={({pressed}) => [styles.item, pressed && {opacity: 0.7}]}>
        <View style={styles.iconBox}>{e.icon}</View>
        <Text style={styles.label}>{e.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', paddingHorizontal: 12, paddingTop: 20, justifyContent: 'space-between'},
  item: {alignItems: 'center', width: '22%'},
  iconBox: {
    width: 56, height: 56, borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center', justifyContent: 'center',
  },
  label: {marginTop: 8, fontSize: 13, color: Colors.textSecondary},
});

export default QuickEntryGrid;
```

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/views/components/QuickEntryGrid.tsx src/modules/contacts/views/components/SearchHitText.tsx
git commit -m "feat(contacts): add SearchHitText + QuickEntryGrid"
```

---

## Task 18: SearchScreen

**Files:**
- Modify: `src/modules/contacts/views/SearchScreen.tsx`

- [ ] **Step 1: 写页面**

```tsx
// src/modules/contacts/views/SearchScreen.tsx
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Space, Type, Hairline} from '../../../shared/ui/tokens';
import SearchBar from '../../../shared/ui/SearchBar';
import Avatar from '../../../shared/ui/Avatar';
import EmptyState from '../../../shared/ui/EmptyState';
import {Search as SearchIcon} from '../../../shared/ui/icons';
import QuickEntryGrid from './components/QuickEntryGrid';
import SearchHitText from './components/SearchHitText';
import {mockContactsLite} from '../data/mockContacts';
import {mockGroups} from '../data/mockGroups';
import {mockOfficialAccounts} from '../data/mockOfficialAccounts';
import Navigation from '../../../app/navigation/Navigation';

const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [raw, setRaw] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebounced(raw.trim()), 200);
    return () => clearTimeout(id);
  }, [raw]);

  const results = useMemo(() => {
    if (!debounced) return null;
    const key = debounced.toLowerCase();
    const match = (s: string) => s.toLowerCase().includes(key);
    return {
      contacts: mockContactsLite.filter(c => match(c.name) || match(c.wxid)).slice(0, 3),
      groups: mockGroups.filter(g => match(g.name)).slice(0, 3),
      official: mockOfficialAccounts.filter(o => match(o.name) || match(o.latest)).slice(0, 3),
    };
  }, [debounced]);

  const nothing =
    debounced && results && !results.contacts.length && !results.groups.length && !results.official.length;

  return (
    <View style={[styles.page, {paddingTop: insets.top}]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => Navigation.pop()} hitSlop={10} style={styles.cancel}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
        <View style={styles.searchWrap}>
          <SearchBar
            ref={inputRef}
            autoFocus
            value={raw}
            onChangeText={setRaw}
            onClear={() => setRaw('')}
          />
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        {!debounced ? <QuickEntryGrid /> : null}

        {results?.contacts.length ? (
          <Section title="联系人">
            {results.contacts.map(c => (
              <Row key={c.id}
                left={<Avatar name={c.name} size={40} />}
                title={<SearchHitText text={c.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<SearchHitText text={`微信号: ${c.wxid}`} keyword={debounced} style={Type.cellSubtitle} />} />
            ))}
          </Section>
        ) : null}

        {results?.groups.length ? (
          <Section title="群聊">
            {results.groups.map(g => (
              <Row key={g.id}
                left={<Avatar name={g.name} size={40} />}
                title={<SearchHitText text={g.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<Text style={Type.cellSubtitle}>{g.memberCount} 位成员</Text>} />
            ))}
          </Section>
        ) : null}

        {results?.official.length ? (
          <Section title="公众号">
            {results.official.map(o => (
              <Row key={o.id}
                left={<Avatar name={o.name} size={40} shape="circle" />}
                title={<SearchHitText text={o.name} keyword={debounced} style={Type.cellTitle} />}
                sub={<SearchHitText text={o.latest} keyword={debounced} style={Type.cellSubtitle} numberOfLines={1} />} />
            ))}
          </Section>
        ) : null}

        {nothing ? (
          <EmptyState icon={<SearchIcon size={56} color="#CCCCCC" />} title="没有找到相关结果" />
        ) : null}
      </ScrollView>
    </View>
  );
};

const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const Row: React.FC<{left: React.ReactNode; title: React.ReactNode; sub: React.ReactNode}> = ({left, title, sub}) => (
  <View style={styles.row}>
    {left}
    <View style={{flex: 1, marginLeft: Space.avatarToText}}>
      {title}
      <View style={{marginTop: 2}}>{sub}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: Colors.bgCard},
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: Hairline, borderBottomColor: Colors.separator,
  },
  cancel: {paddingHorizontal: 12, paddingVertical: 10},
  cancelText: {color: Colors.brand, fontSize: 16},
  searchWrap: {flex: 1},
  section: {marginTop: 20},
  sectionHeader: {
    paddingHorizontal: Space.pagePadding, paddingBottom: 6,
    fontSize: 13, color: Colors.textSecondary,
  },
  sectionCard: {backgroundColor: Colors.bgCard},
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Space.pagePadding,
    minHeight: Space.rowHeightLarge,
    borderBottomWidth: Hairline, borderBottomColor: Colors.separator,
  },
});

export default SearchScreen;
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/views/SearchScreen.tsx
git commit -m "feat(contacts): implement SearchScreen"
```

---

## Task 19: 接线——从通讯录首页打开二级页面

**Files:**
- Modify: 通讯录入口（iOS 原生 `ContactsViewController.swift` + RN 首页入口之一）

> 当前通讯录首页在 iOS 原生（`WeChatSwift`）。iOS 的顶部 4 入口需要点击后：
> - "新的朋友" → `Navigation.shared.push(url: "rn://contactNewFriends")`（走 RN）
> - "群聊" → 同上 `contactGroups`
> - "标签" → `contactTags`
> - "公众号" → `contactOfficialAccounts`
> - 顶部搜索框 → `contactSearch`
> - 点击某个联系人 → 打开原生详情页（见 Task 20+）

- [ ] **Step 1: 查看 iOS 现有 Navigation 调用约定**

Run: `grep -rn "Navigate\." WeChatSwift/Modules/Business/ContactModule/ContactList/`
Expected：找到现有跳转示例；无则参照 `ChatModule` 或 `DiscoverModule`。

- [ ] **Step 2: 在 ContactsViewController 里接入**

示例（需按本地 Navigate API 微调）：

```swift
// ContactsViewController.swift - didSelect 顶部 cell
switch topItems[indexPath.row].title {
case "新的朋友": Navigate.push(url: "rn://page/contactNewFriends")
case "群聊":     Navigate.push(url: "rn://page/contactGroups")
case "标签":     Navigate.push(url: "rn://page/contactTags")
case "公众号":   Navigate.push(url: "rn://page/contactOfficialAccounts")
default: break
}
```

搜索框点击：`Navigate.push(url: "rn://page/contactSearch")`。

实际 URL scheme 以 `WeChatSwift/Foundation/NavigateKit/Core/Navigate.swift` + `src/shared/bridges/...` 实现为准。

- [ ] **Step 3: 运行 app 手动 verify**

```bash
# RN 启动
cd WeChatRN && yarn start
# 另起终端跑 iOS
yarn ios
```

走查：
- [ ] 通讯录首页点击 4 个入口均能进入对应 RN 页面
- [ ] 每个页面标题 / 列表 / 按钮与设计规范一致
- [ ] 按压反馈平滑
- [ ] 空态（把 mockFriendRequests 清空临时测）展示正确

- [ ] **Step 4: 提交**

```bash
git add WeChatSwift/Modules/Business/ContactModule/ContactList/ContactsViewController.swift
git commit -m "feat(contacts/ios): wire top entries + search bar to RN screens"
```

---

## Task 20: iOS ContactDetailHeaderView

**Files:**
- Create: `WeChatSwift/Modules/Business/ContactModule/ContactDetail/ContactDetailHeaderView.swift`

- [ ] **Step 1: 写 Header**

```swift
// ContactDetailHeaderView.swift
import UIKit
import SnapKit
import ExtensionKit

final class ContactDetailHeaderView: UIView {
    let avatarView = UIImageView()
    let nameLabel = UILabel()
    let remarkLabel = UILabel()
    let wxidLabel = UILabel()
    let regionLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .white
        avatarView.layer.cornerRadius = 6
        avatarView.layer.masksToBounds = true
        avatarView.backgroundColor = UIColor(hex: "#07C160")
        avatarView.layer.borderWidth = 1.0 / UIScreen.main.scale
        avatarView.layer.borderColor = UIColor.black.withAlphaComponent(0.04).cgColor

        nameLabel.font = .systemFont(ofSize: 20, weight: .semibold)
        nameLabel.textColor = UIColor(hex: "#191919")
        remarkLabel.font = .systemFont(ofSize: 15)
        remarkLabel.textColor = UIColor(hex: "#888888")
        wxidLabel.font = .systemFont(ofSize: 13)
        wxidLabel.textColor = UIColor(hex: "#888888")
        regionLabel.font = .systemFont(ofSize: 13)
        regionLabel.textColor = UIColor(hex: "#888888")

        [avatarView, nameLabel, remarkLabel, wxidLabel, regionLabel].forEach { addSubview($0) }

        avatarView.snp.makeConstraints {
            $0.leading.equalToSuperview().offset(16)
            $0.top.equalToSuperview().offset(20)
            $0.bottom.equalToSuperview().offset(-20)
            $0.size.equalTo(64)
        }
        nameLabel.snp.makeConstraints {
            $0.leading.equalTo(avatarView.snp.trailing).offset(14)
            $0.top.equalTo(avatarView).offset(2)
            $0.trailing.lessThanOrEqualToSuperview().offset(-16)
        }
        remarkLabel.snp.makeConstraints {
            $0.leading.equalTo(nameLabel)
            $0.top.equalTo(nameLabel.snp.bottom).offset(4)
            $0.trailing.lessThanOrEqualToSuperview().offset(-16)
        }
        wxidLabel.snp.makeConstraints {
            $0.leading.equalTo(nameLabel)
            $0.top.equalTo(remarkLabel.snp.bottom).offset(4)
        }
        regionLabel.snp.makeConstraints {
            $0.leading.equalTo(wxidLabel.snp.trailing).offset(10)
            $0.centerY.equalTo(wxidLabel)
        }

        let separator = UIView()
        separator.backgroundColor = UIColor(hex: "#E5E5E5")
        addSubview(separator)
        separator.snp.makeConstraints {
            $0.leading.trailing.bottom.equalToSuperview()
            $0.height.equalTo(1.0 / UIScreen.main.scale)
        }
    }

    required init?(coder: NSCoder) { fatalError() }

    func configure(name: String, remark: String?, wxid: String, region: String?) {
        nameLabel.text = name
        remarkLabel.text = remark
        remarkLabel.isHidden = (remark?.isEmpty ?? true)
        wxidLabel.text = "微信号: \(wxid)"
        regionLabel.text = region.map { "地区: \($0)" }

        let initial = String(name.prefix(1))
        avatarView.image = UIImage.fromInitial(initial, size: CGSize(width: 128, height: 128))
    }
}

private extension UIImage {
    static func fromInitial(_ text: String, size: CGSize) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(size, true, 0)
        defer { UIGraphicsEndImageContext() }
        UIColor(hex: "#07C160").setFill()
        UIRectFill(CGRect(origin: .zero, size: size))
        let attrs: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: size.width * 0.42, weight: .semibold),
            .foregroundColor: UIColor.white,
        ]
        let s = NSString(string: text)
        let bounds = s.size(withAttributes: attrs)
        s.draw(at: CGPoint(x: (size.width - bounds.width) / 2, y: (size.height - bounds.height) / 2), withAttributes: attrs)
        return UIGraphicsGetImageFromCurrentImageContext()
    }
}
```

- [ ] **Step 2: 提交**

```bash
git add WeChatSwift/Modules/Business/ContactModule/ContactDetail/ContactDetailHeaderView.swift
git commit -m "feat(contact/ios): add ContactDetailHeaderView"
```

---

## Task 21: iOS ContactDetailActionBar

**Files:**
- Create: `WeChatSwift/Modules/Business/ContactModule/ContactDetail/ContactDetailActionBar.swift`

- [ ] **Step 1: 写 ActionBar**

```swift
// ContactDetailActionBar.swift
import UIKit
import SnapKit
import ExtensionKit

final class ContactDetailActionBar: UIView {
    let messageButton = UIButton(type: .system)
    let callButton = UIButton(type: .system)

    var onMessage: (() -> Void)?
    var onCall: (() -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .white

        let top = UIView()
        top.backgroundColor = UIColor(hex: "#E5E5E5")
        addSubview(top)
        top.snp.makeConstraints { $0.leading.trailing.top.equalToSuperview(); $0.height.equalTo(1.0 / UIScreen.main.scale) }

        [messageButton, callButton].forEach { addSubview($0) }
        configure(messageButton, title: "发消息", bg: UIColor(hex: "#07C160"), fg: .white, border: false)
        configure(callButton, title: "音视频通话", bg: .white, fg: UIColor(hex: "#07C160"), border: true)

        messageButton.addTarget(self, action: #selector(tapMsg), for: .touchUpInside)
        callButton.addTarget(self, action: #selector(tapCall), for: .touchUpInside)

        messageButton.snp.makeConstraints {
            $0.leading.equalToSuperview().offset(16)
            $0.top.equalToSuperview().offset(10)
            $0.bottom.equalTo(safeAreaLayoutGuide.snp.bottom).offset(-10)
            $0.height.equalTo(48)
        }
        callButton.snp.makeConstraints {
            $0.leading.equalTo(messageButton.snp.trailing).offset(12)
            $0.trailing.equalToSuperview().offset(-16)
            $0.top.bottom.equalTo(messageButton)
            $0.width.equalTo(messageButton)
        }
    }

    required init?(coder: NSCoder) { fatalError() }

    private func configure(_ btn: UIButton, title: String, bg: UIColor, fg: UIColor, border: Bool) {
        btn.setTitle(title, for: .normal)
        btn.titleLabel?.font = .systemFont(ofSize: 16, weight: .medium)
        btn.setTitleColor(fg, for: .normal)
        btn.backgroundColor = bg
        btn.layer.cornerRadius = 8
        btn.layer.masksToBounds = true
        if border {
            btn.layer.borderWidth = 1
            btn.layer.borderColor = UIColor(hex: "#07C160").cgColor
        }
        btn.addTarget(self, action: #selector(pressDown(_:)), for: [.touchDown, .touchDragEnter])
        btn.addTarget(self, action: #selector(pressUp(_:)), for: [.touchUpInside, .touchUpOutside, .touchDragExit, .touchCancel])
    }

    @objc private func pressDown(_ sender: UIButton) {
        UIView.animate(withDuration: 0.1) { sender.transform = CGAffineTransform(scaleX: 0.97, y: 0.97) }
    }
    @objc private func pressUp(_ sender: UIButton) {
        UIView.animate(withDuration: 0.1) { sender.transform = .identity }
    }

    @objc private func tapMsg() { onMessage?() }
    @objc private func tapCall() { onCall?() }
}
```

- [ ] **Step 2: 提交**

```bash
git add WeChatSwift/Modules/Business/ContactModule/ContactDetail/ContactDetailActionBar.swift
git commit -m "feat(contact/ios): add ContactDetailActionBar"
```

---

## Task 22: iOS ContactDetailViewController

**Files:**
- Create: `WeChatSwift/Modules/Business/ContactModule/ContactDetail/ContactDetailViewController.swift`

- [ ] **Step 1: 写 VC**

```swift
// ContactDetailViewController.swift
import UIKit
import WeChatUI
import SnapKit
import ExtensionKit

public final class ContactDetailViewController: BaseViewController {
    private let header = ContactDetailHeaderView()
    private let tableView = UITableView(frame: .zero, style: .insetGrouped)
    private let actionBar = ContactDetailActionBar()

    private let contact: Contact

    private struct Item { let title: String; let detail: String? }
    private let sections: [[Item]] = [
        [Item(title: "设置备注和标签", detail: nil), Item(title: "朋友权限", detail: nil)],
        [Item(title: "朋友圈", detail: nil), Item(title: "视频号", detail: nil)],
        [Item(title: "性别", detail: "男"), Item(title: "地区", detail: "浙江 杭州")],
    ]

    public init(contact: Contact) {
        self.contact = contact
        super.init(nibName: nil, bundle: nil)
    }
    required init?(coder: NSCoder) { fatalError() }

    public override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(hex: "#EDEDED")
        title = ""
        navigationItem.rightBarButtonItem = UIBarButtonItem(
            image: UIImage(systemName: "ellipsis"),
            style: .plain, target: self, action: #selector(more))

        header.configure(name: contact.name, remark: nil, wxid: contact.id, region: "浙江 杭州")

        tableView.backgroundColor = UIColor(hex: "#EDEDED")
        tableView.dataSource = self
        tableView.delegate = self
        tableView.tableHeaderView = header
        tableView.sectionHeaderTopPadding = 0
        tableView.rowHeight = 48
        tableView.separatorInset = UIEdgeInsets(top: 0, left: 16, bottom: 0, right: 0)

        view.addSubview(tableView)
        view.addSubview(actionBar)

        actionBar.snp.makeConstraints {
            $0.leading.trailing.bottom.equalToSuperview()
        }
        tableView.snp.makeConstraints {
            $0.top.leading.trailing.equalToSuperview()
            $0.bottom.equalTo(actionBar.snp.top)
        }

        header.frame = CGRect(x: 0, y: 0, width: view.bounds.width, height: 104)

        actionBar.onMessage = { [weak self] in
            guard let self else { return }
            // 路由到 RN 聊天页
            Navigate.push(url: "rn://page/chat?contactName=\(self.contact.name)")
        }
        actionBar.onCall = {
            let a = UIAlertController(title: "音视频通话", message: "此为占位", preferredStyle: .actionSheet)
            a.addAction(UIAlertAction(title: "语音通话", style: .default))
            a.addAction(UIAlertAction(title: "视频通话", style: .default))
            a.addAction(UIAlertAction(title: "取消", style: .cancel))
            UIApplication.shared.topViewController()?.present(a, animated: true)
        }
    }

    @objc private func more() {}
}

extension ContactDetailViewController: UITableViewDataSource, UITableViewDelegate {
    public func numberOfSections(in tableView: UITableView) -> Int { sections.count }
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int { sections[section].count }
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let item = sections[indexPath.section][indexPath.row]
        let cell = UITableViewCell(style: .value1, reuseIdentifier: "cell")
        cell.textLabel?.text = item.title
        cell.textLabel?.font = .systemFont(ofSize: 17)
        cell.textLabel?.textColor = UIColor(hex: "#191919")
        cell.detailTextLabel?.text = item.detail
        cell.detailTextLabel?.textColor = UIColor(hex: "#888888")
        cell.accessoryType = .disclosureIndicator
        return cell
    }
}
```

如果项目里没有 `UIApplication.topViewController()` 扩展，用 `self.present(...)` 即可。

- [ ] **Step 2: 注册路由**

修改 `WeChatSwift/Modules/Business/ContactModule/ContactModule.swift`:

```swift
import UIKit
import WeChatRouter

extension ContactModule: ModuleRoutable {
    public static func registerRoutes() {
        Router.register("wechat://contact/detail") { url, params in
            let id = params?["id"] as? String ?? ""
            let data = MockContactData.generate()
            let all = data.grouped.values.flatMap { $0 }
            let contact = all.first { $0.id == id } ?? all.first!
            let vc = ContactDetailViewController(contact: contact)
            return vc
        }
    }
}
```

> 以实际 `WeChatRouter` API 为准（`Router.register` 签名可能是 `handler: @escaping ([String:Any]?) -> UIViewController?`）；看一下 `Foundation/NavigateKit/Core/Navigate.swift` 的调用示例后对齐签名。

- [ ] **Step 3: 从联系人列表点击跳转**

在 `ContactsViewController.swift` 的 didSelectRowAt 中（联系人行），加入：

```swift
let contact = grouped[sections[indexPath.section]]?[indexPath.row]
if let contact = contact {
    Navigate.push(url: "wechat://contact/detail?id=\(contact.id)")
}
```

- [ ] **Step 4: xcodegen 刷新（若项目使用 project.yml）**

Run: `cd WeChatSwift && xcodegen generate`
Expected：project.pbxproj 更新、新 .swift 被加入 target。

若项目没用 xcodegen，手动在 Xcode 里把 `ContactDetail/` 目录拖入 `ContactModule` target。

- [ ] **Step 5: 编译 + 手动 verify**

```bash
cd WeChatSwift
xcodebuild -workspace WeChatSwift.xcworkspace -scheme WeChatSwift -destination 'platform=iOS Simulator,name=iPhone 15' build
```

Expected: BUILD SUCCEEDED。启动 app → 通讯录 → 点任一联系人 → 进入详情页 → 发消息跳到聊天页。

- [ ] **Step 6: 提交**

```bash
git add WeChatSwift/Modules/Business/ContactModule/ContactDetail WeChatSwift/Modules/Business/ContactModule/ContactModule.swift WeChatSwift/Modules/Business/ContactModule/ContactList/ContactsViewController.swift
git commit -m "feat(contact/ios): implement native ContactDetailViewController + routing"
```

---

## Task 23: 最终验收

- [ ] **Step 1: 静态检查**

```bash
cd WeChatRN && yarn tsc --noEmit && yarn jest
```
Expected：全部通过。

- [ ] **Step 2: 手动走查清单**

覆盖设计规范中的 §5 验收清单：

- [ ] 分割线 hairline，颜色 `#E5E5E5`
- [ ] 行按压反馈 150ms 过渡
- [ ] 无 emoji 图标，全部 SVG
- [ ] 点击区域 ≥44pt
- [ ] 6 个页面空态 / 加载态 / 数据态均正确
- [ ] 搜索防抖 200ms、命中高亮 `#07C160`
- [ ] iOS 原生详情页与 RN 视觉对齐
- [ ] 从原生通讯录首页入口 / 搜索框 / 联系人行均能跳转

- [ ] **Step 3: 合并 / 推送（按仓库约定）**

```bash
git log --oneline -20
# 如需 PR，推送当前分支
```

---

## Self-Review Notes

- **覆盖**：Spec §2.1–2.6 每页对应 Task 12/13/14/15/16/18；共用基础 §1.5 → Task 1–7；工具 → Task 8；数据 → Task 9；路由 → Task 10；接线 → Task 19；iOS 详情 → Task 20–22。
- **占位**：无 "TBD / TODO"，每步给出完整代码或具体命令。
- **命名一致性**：`Colors / Space / Type / Hairline` 在所有任务一致；`FriendRequest.status` 三态在 Task 9/11/12 一致；路由名 `contactNewFriends / contactGroups / contactTags / contactTagCreate / contactOfficialAccounts / contactSearch` 在 Task 10/14/19/18 一致。
- **Android Kotlin**：按 spec 要求本期不实现，计划中不含任务。

