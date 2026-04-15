# NewFriend 页面接口设计

**日期**：2026-04-15
**范围**：通讯录二级页「新的朋友」（`src/modules/contacts/newFriend/`）
**状态**：设计定稿，待实施

---

## 目标

为 NewFriend 页面定义接口清单、数据结构、mock 开关与接入方式。本次仅覆盖该页面；其他通讯录二级页（groupChat / officialAccount / tag / search / common）后续按同一模式逐一完成。

## 背景与约束

- 网络桥接与 `http` 封装已就绪（`src/shared/net`）
- 页面已实现的 UI 动作：
  - 拉取好友申请列表（展示 pending/accepted/expired 三态）
  - 接受好友申请（仅 pending 态显示按钮）
  - Footer 两个入口：「添加手机联系人」「添加 QQ 好友」（当前硬编码，未接接口）
- 页面未实现的 UI 动作：拒绝 / 忽略 / 搜索添加 / 通讯录导入页 → 这次不做

## 接口清单

域：`NetDomain.User`；默认 mock 打开（`USE_MOCK = true`）。

| # | 方法 / 路径 | 入参 | 出参 |
|---|---|---|---|
| 1 | `GET  /friend/applications` | — | `FriendApplication[]` |
| 2 | `POST /friend/applications/accept` | `{applicationId: string}` | `{ok: true}` |
| 3 | `GET  /friend/addEntries` | — | `AddEntry[]` |

### 接口 1：好友申请列表
- 页面进入时拉取一次
- 响应直接为数组（业务域走 APIResp 外壳，http 层拆包后返回 data）

### 接口 2：接受好友申请
- 点击 pending 行右侧「接受」按钮
- 成功后前端本地把该条 `status` 改为 `'accepted'`；服务端回包仅 `{ok: true}`
- 失败：`console.warn` 即可，状态不变

### 接口 3：添加入口列表
- 页面进入时拉取一次；驱动 Footer 两个 ListCell 的渲染
- 后端可追加入口（微信小程序 / 面对面添加…），前端无需发版
- 点击走 `navigationBridge.pushURL(entry.jumpUrl)`，原生 Router 自动识别 native / RN 路由

## 数据结构

```ts
// models/types.ts
export type FriendApplicationStatus = 'pending' | 'accepted' | 'expired';

export interface FriendApplication {
  id: string;
  name: string;
  avatar?: string;
  source: string;                      // "来自手机联系人：陆涛"
  status: FriendApplicationStatus;
}

export interface AddEntry {
  id: string;
  title: string;                       // "添加手机联系人"
  iconUrl?: string;                    // 预留；当前后端不下发，前端继续用 UserPlus
  iconBgColor: string;                 // 区分不同入口的底色（#F39B38 / #4D7CFE）
  jumpUrl: string;                     // 原生 / RN 皆由原生 Router 自动解析
}
```

说明：
- `FriendApplication` 取代旧 `FriendRequest` 类型（避免与 HTTP request 撞词）
- `iconUrl` 字段预留；后续若前端配套图标映射表，则前端从 url 提取 basename 做 key 映射到本地矢量组件，找不到映射时降级 `<Image source={{uri}}/>`。本次不实施该映射

## 文件布局

```
src/modules/contacts/newFriend/
├── models/
│   ├── types.ts              # FriendApplication / AddEntry
│   └── mockData.ts           # mockApplications / mockAddEntries
├── requests/
│   └── friendRequestReq.ts   # const USE_MOCK = true; 三个导出函数
├── stores/
│   └── useFriendRequest.ts   # 加 addEntries 状态 + accept 改 async
├── components/
│   └── FriendRequestRow.tsx  # 不改
└── pages/
    └── NewFriendPage.tsx     # Footer 改为 map(addEntries)；onPress 调 pushURL
```

## Mock 开关机制

每个页面的 `requests/*.ts` 顶部定义一个 `const USE_MOCK = true;`，文件内所有请求函数按它分流：

```ts
const USE_MOCK = true;

export const fetchFriendApplications = (): Promise<FriendApplication[]> =>
  USE_MOCK
    ? Promise.resolve(mockApplications)
    : http.get<FriendApplication[]>(NetDomain.User, '/friend/applications');

export const acceptFriendApplication = (applicationId: string): Promise<{ok: true}> =>
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

切换策略：
- 本地开发默认 `true`（mock）
- 后端联调时改成 `false`（单个页面的常量，就地可改）
- 无需全局配置，单文件顶部一个开关，边界清楚

## 页面接入改动

**useFriendRequest hook**
- 增加 `addEntries` 状态；`useEffect` 并行拉列表与入口
- `accept` 改为 `async`：先 `await acceptFriendApplication(id)`，成功后本地 `setList`；失败 `console.warn` 不改 UI

**NewFriendPage**
- 删除硬编码的两个 ListCell
- `ListFooterComponent` 改为基于 `addEntries.map(...)` 渲染
- 每个 ListCell 的 `onPress` → `navigationBridge.pushURL(entry.jumpUrl)`

**Row / 其他 UI 组件**：不动

## Mock 数据

```ts
// models/mockData.ts
export const mockApplications: FriendApplication[] = [
  {id: '1', name: '陆涛', source: '来自手机联系人：陆涛', status: 'pending'},
  {id: '2', name: '林夏', source: '朋友验证：同事推荐', status: 'pending'},
  {id: '3', name: '周诗', source: '朋友验证：好久不见', status: 'accepted'},
  {id: '4', name: '吴迪', source: '朋友验证：你好',     status: 'expired'},
];

export const mockAddEntries: AddEntry[] = [
  {id: 'phone', title: '添加手机联系人', iconBgColor: '#F39B38', jumpUrl: 'wechatrn://contact/addByPhone'},
  {id: 'qq',    title: '添加 QQ 好友',   iconBgColor: '#4D7CFE', jumpUrl: 'wechatrn://contact/addByQQ'},
];
```

`jumpUrl` 的具体 scheme 到实施时对齐现有 router 规范（本 spec 不定）。

## 错误处理

- 列表 / 入口拉取失败：`console.warn` 并保持空列表（现有行为）
- 接受失败：`console.warn`，列表项状态保持 `pending`，用户可重试

业务错误（`NetBizError`）与网络错误（`NetError`）在本页面统一 `console.warn` 即可，暂不弹 Toast；日后有统一提示组件再接。

## 不在本次范围

- 拒绝 / 忽略接口（UI 未实现）
- 候选联系人列表页（按 `jumpUrl` 跳出去后的目的页）
- 添加好友的搜索 / 扫一扫 / 面对面
- 其他通讯录二级页（后续按同模板完成）

## 实施顺序

1. 类型 + mock 数据
2. `requests/friendRequestReq.ts` 三个函数 + USE_MOCK 开关
3. `useFriendRequest` 接入（拉入口、accept async 化）
4. `NewFriendPage` Footer 改 map 渲染 + pushURL
5. 本地跑通（mock=true），视觉与现状一致；把 USE_MOCK 临时切 false 看 JS→原生桥调用日志，确认 domain/path/body 正确
