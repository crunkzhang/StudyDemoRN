# NewFriend 接口接入 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按 spec 把 NewFriend 页面 3 个接口（好友申请列表 / 接受 / 添加入口列表）接入，默认走 mock，UI 与现状一致。

**Architecture:** 沿用现有 `shared/net + shared/bridges/common/net` 网络桥接；模块内在 `requests/friendRequestReq.ts` 顶部 `const USE_MOCK = true` 分流真/mock；page 的 Footer 改为由接口驱动渲染。

**Tech Stack:** React Native 0.84 · TypeScript · 本项目自研 `http`/`NetDomain`/`navigationBridge`。

**Spec 参考：** `docs/superpowers/specs/2026-04-15-newfriend-api-design.md`

**测试策略：** 本仓库无单元测试基建（jest 只是声明），现有模块也无测试，按项目惯例通过 `yarn lint` + 手动跑通页面验证。每个任务后手动勾选"视觉与现状一致 / console 无异常"。

---

### Task 1：类型调整 + AddEntry 新增

**Files:**
- Modify: `src/modules/contacts/newFriend/models/types.ts`

- [ ] **Step 1: 重写 types.ts**

```ts
export type FriendApplicationStatus = 'pending' | 'accepted' | 'expired';

export interface FriendApplication {
  id: string;
  name: string;
  avatar?: string;
  source: string;
  status: FriendApplicationStatus;
}

export interface AddEntry {
  id: string;
  title: string;
  iconUrl?: string;
  iconBgColor: string;
  jumpUrl: string;
}
```

- [ ] **Step 2: 验证 TS 编译**

Run: `npx tsc --noEmit`
Expected: 有若干"找不到 FriendRequest"的 error（来自 row/store/page/mockData），下一步修。

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/newFriend/models/types.ts
git commit -m "refactor(contacts/newFriend): FriendRequest 改名为 FriendApplication 并加 AddEntry"
```

---

### Task 2：mock 数据更新

**Files:**
- Modify: `src/modules/contacts/newFriend/models/mockData.ts`

- [ ] **Step 1: 重写 mockData.ts**

```ts
import type {FriendApplication, AddEntry} from './types';

export const mockApplications: FriendApplication[] = [
  {id: '1', name: '陆涛', source: '来自手机联系人：陆涛', status: 'pending'},
  {id: '2', name: '林夏', source: '朋友验证：同事推荐', status: 'pending'},
  {id: '3', name: '周诗', source: '朋友验证：好久不见', status: 'accepted'},
  {id: '4', name: '吴迪', source: '朋友验证：你好',     status: 'expired'},
];

export const mockAddEntries: AddEntry[] = [
  {
    id: 'phone',
    title: '添加手机联系人',
    iconBgColor: '#F39B38',
    jumpUrl: 'wechatrn://contact/addByPhone',
  },
  {
    id: 'qq',
    title: '添加 QQ 好友',
    iconBgColor: '#4D7CFE',
    jumpUrl: 'wechatrn://contact/addByQQ',
  },
];
```

- [ ] **Step 2: 提交**

```bash
git add src/modules/contacts/newFriend/models/mockData.ts
git commit -m "refactor(contacts/newFriend): mockData 同步重命名并新增 mockAddEntries"
```

---

### Task 3：requests 三函数 + USE_MOCK 开关

**Files:**
- Modify: `src/modules/contacts/newFriend/requests/friendRequestReq.ts`

- [ ] **Step 1: 重写 friendRequestReq.ts**

```ts
import {http, NetDomain} from '../../../../shared/net';
import type {AddEntry, FriendApplication} from '../models/types';
import {mockAddEntries, mockApplications} from '../models/mockData';

// 本页面 mock 开关：联调时改 false
const USE_MOCK = true;

export const fetchFriendApplications = (): Promise<FriendApplication[]> =>
  USE_MOCK
    ? Promise.resolve(mockApplications)
    : http.get<FriendApplication[]>(NetDomain.User, '/friend/applications');

export const acceptFriendApplication = (
  applicationId: string,
): Promise<{ok: true}> =>
  USE_MOCK
    ? Promise.resolve({ok: true})
    : http.post<{ok: true}>(
        NetDomain.User,
        '/friend/applications/accept',
        {body: {applicationId}},
      );

export const fetchAddEntries = (): Promise<AddEntry[]> =>
  USE_MOCK
    ? Promise.resolve(mockAddEntries)
    : http.get<AddEntry[]>(NetDomain.User, '/friend/addEntries');
```

- [ ] **Step 2: 验证 TS**

Run: `npx tsc --noEmit`
Expected: 本文件 0 error（调用方还没改，会继续报 FriendRequest 相关 error，下一步 Task 4/5 修）。

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/newFriend/requests/friendRequestReq.ts
git commit -m "feat(contacts/newFriend): 接入 3 个接口，默认 USE_MOCK=true"
```

---

### Task 4：store 接入 addEntries + accept async 化

**Files:**
- Modify: `src/modules/contacts/newFriend/stores/useFriendRequest.ts`

- [ ] **Step 1: 重写 useFriendRequest.ts**

```ts
import {useEffect, useState} from 'react';
import type {AddEntry, FriendApplication} from '../models/types';
import {
  acceptFriendApplication,
  fetchAddEntries,
  fetchFriendApplications,
} from '../requests/friendRequestReq';

export const useFriendRequest = () => {
  const [list, setList] = useState<FriendApplication[]>([]);
  const [addEntries, setAddEntries] = useState<AddEntry[]>([]);

  useEffect(() => {
    fetchFriendApplications()
      .then(setList)
      .catch(e => console.warn('[newFriend] applications', e));
    fetchAddEntries()
      .then(setAddEntries)
      .catch(e => console.warn('[newFriend] addEntries', e));
  }, []);

  const accept = async (id: string) => {
    try {
      await acceptFriendApplication(id);
      setList(prev =>
        prev.map(x => (x.id === id ? {...x, status: 'accepted'} : x)),
      );
    } catch (e) {
      console.warn('[newFriend] accept', e);
    }
  };

  return {list, addEntries, accept};
};
```

- [ ] **Step 2: 验证 TS**

Run: `npx tsc --noEmit`
Expected: 本文件 0 error。Page 仍旧 error（引用了旧类型/接口调用方式）。

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/newFriend/stores/useFriendRequest.ts
git commit -m "feat(contacts/newFriend): store 拉取 addEntries 并 accept async 化"
```

---

### Task 5：FriendRequestRow 适配新类型

**Files:**
- Modify: `src/modules/contacts/newFriend/components/FriendRequestRow.tsx`

- [ ] **Step 1: 改 import 与 Props 类型**

把第 5 行：
```ts
import type {FriendRequest} from '../models/types';
```
改为：
```ts
import type {FriendApplication} from '../models/types';
```

把 `Props` 里 `item: FriendRequest;` 改为 `item: FriendApplication;`。

- [ ] **Step 2: 验证 TS**

Run: `npx tsc --noEmit`
Expected: 本文件 0 error。

- [ ] **Step 3: 提交**

```bash
git add src/modules/contacts/newFriend/components/FriendRequestRow.tsx
git commit -m "refactor(contacts/newFriend): Row 适配 FriendApplication"
```

---

### Task 6：Page 接入 addEntries 渲染 + jumpUrl

**Files:**
- Modify: `src/modules/contacts/newFriend/pages/NewFriendPage.tsx`

- [ ] **Step 1: 替换整个 NewFriendPage.tsx**

```tsx
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';
import SearchBar from '../../../../shared/ui/SearchBar';
import ListSection from '../../../../shared/ui/ListSection';
import ListCell from '../../../../shared/ui/ListCell';
import EmptyState from '../../../../shared/ui/EmptyState';
import {Colors, Space} from '../../../../shared/ui/tokens';
import {UserPlus} from '../../../../shared/ui/icons';
import {navigationBridge} from '../../../../shared/bridges/common/navigation/navigationBridge';
import FriendRequestRow from '../components/FriendRequestRow';
import {useFriendRequest} from '../stores/useFriendRequest';

const IconBox: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <View style={[styles.iconBox, {backgroundColor: color}]}>{children}</View>
);

const NewFriendPage: React.FC = () => {
  const {list, addEntries, accept} = useFriendRequest();

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
          addEntries.length > 0 ? (
            <ListSection>
              {addEntries.map(entry => (
                <ListCell
                  key={entry.id}
                  left={
                    <IconBox color={entry.iconBgColor}>
                      <UserPlus size={18} />
                    </IconBox>
                  }
                  title={entry.title}
                  onPress={() => navigationBridge.pushURL(entry.jumpUrl)}
                />
              ))}
            </ListSection>
          ) : null
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

export default NewFriendPage;
```

- [ ] **Step 2: 确认 ListCell 支持 onPress**

Run: `grep -n "onPress" src/shared/ui/ListCell.tsx`
Expected: 输出一行包含 `onPress` 的 prop 声明。若没有，说明 ListCell 不支持 onPress，需要外层包 `Pressable` 替代——把 `<ListCell key=... onPress=...>` 改为 `<Pressable key={entry.id} onPress={...}><ListCell ... /></Pressable>`。

- [ ] **Step 3: 验证 TS + lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: 全项目 0 error、0 warning（或仅历史 warning，不新增）。

- [ ] **Step 4: 手动验证（mock 模式）**

跑 iOS app 打开"新的朋友"页：
- 列表 4 条，陆涛/林夏 有"接受"按钮，周诗 显示"已添加"，吴迪 显示"已过期"
- 点击陆涛的"接受" → 按钮消失，变"已添加"
- Footer 两条入口，图标与配色与改动前一致（橙/蓝 UserPlus）
- 点击任一入口 → 原生 Router 尝试跳 `wechatrn://contact/...`（会走 router fallback 或原生 404 日志，这是预期——目的页未实现）

- [ ] **Step 5: 提交**

```bash
git add src/modules/contacts/newFriend/pages/NewFriendPage.tsx
git commit -m "feat(contacts/newFriend): Footer 接入 addEntries 并走 jumpUrl 跳转"
```

---

### Task 7：真接口联调烟测（可选，不入库）

**目的：** 临时把 `USE_MOCK` 改 false，验证桥接链路打印的 domain/path/body 正确。该步骤不提交。

- [ ] **Step 1: 临时改开关**

编辑 `src/modules/contacts/newFriend/requests/friendRequestReq.ts` 第一行常量为 `false`。

- [ ] **Step 2: 重载 app 看 console**

打开页面，应看到 JS 侧 console 里 `NetError`（因为业务服务端还没实现该路径，返回 404/业务码），但日志里应能看到请求发出（iOS console 有 NetBridge/APIClient 的 log）。

验证点：
- 打到的 URL 为 `https://user-*/friend/applications`（host 来自 `APIService.user.host`）
- method `GET`
- accept 按钮点击后，打到 `POST /friend/applications/accept` body `{"applicationId":"1"}`
- addEntries 请求打到 `GET /friend/addEntries`

- [ ] **Step 3: 改回 USE_MOCK=true，不要提交这段改动**

```bash
git checkout -- src/modules/contacts/newFriend/requests/friendRequestReq.ts
```

---

## Self-Review 结论

- Spec 覆盖：3 接口（Task 3）、类型（Task 1）、mock（Task 2）、store 接入（Task 4）、Row 适配（Task 5）、Page Footer 接入 + pushURL（Task 6）——全部到位。烟测覆盖 Task 7。
- Placeholder 扫描：无 TBD / TODO / "similar to"；代码块均为可直接粘贴的内容。
- 类型一致性：`FriendApplication` / `AddEntry` / `{ok: true}` 在 Task 1/2/3/4/5/6 完全对齐；函数名 `fetchFriendApplications` / `acceptFriendApplication` / `fetchAddEntries` 全局一致。
- 依赖假设：`ListCell.onPress` 在 Task 6 Step 2 有探测与兜底；`navigationBridge.pushURL` 已确认存在（来自 spec 调研）。
