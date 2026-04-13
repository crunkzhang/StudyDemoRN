# RN 导航体系设计（Bridge-Driven Navigation）

**日期**: 2026-04-13
**作者**: @curry
**状态**: Draft — 待 Review

---

## 1. 背景与目标

### 1.1 现状问题

当前 `App.tsx` 使用 `useState<Page>` + `switch/case` 实现页面切换，导致：

- 扁平单层路由，无法实现 A → B → C 的多级跳转（例：聊天详情 → 某人主页 → 某人朋友圈）
- 页面间无法传参（`ChatDetailPage` 声明了 `chatId` / `contactName` 但 `App.tsx` 渲染时无法传递）
- `GameCenterPage` 内部用 `useState + require()` 手动切换到 `GameContainerPage`，是导航缺失的补丁
- 返回按钮是绝对定位浮层 (`App.tsx:73-77`)，与业务页面 header 重叠
- `@react-navigation/*` 已安装但从未使用，`src/app/navigation/` 为空目录

### 1.2 项目架构约束（已与用户确认）

本项目是**嵌入式 RN**，不是独立 RN App：

- 每个 RN 页面作为独立的 `RCTRootView` 由原生（iOS/Android）加载
- 原生侧的 `UINavigationController` / `FragmentManager` 维护完整页面栈
- **所有页面跳转都经原生栈**，无论 RN→RN、RN→原生、原生→RN
- 栈示例：`[NativeA] → [RN:moments] → [RN:userProfile] → [NativeB]`，四个页面都在原生栈里，支持逐级返回
- **RN 内部不维护导航栈**，react-navigation 不适用于本场景

### 1.3 目标

建立一套 **bridge-driven 的页面路由体系**，使 RN 侧能够：

1. 以类型安全的 API 发起页面跳转（`Navigation.push(name, params)`）
2. 通过统一入口接收原生传入的 `initialProperties` 并渲染正确的页面
3. 集中管理所有 RN 页面的声明、参数、路由路径（SSOT）
4. 为未来 deep link 能力预留扩展点，但当前阶段不实现 URL 解析

### 1.4 非目标

- ❌ 不引入 `react-navigation`（架构不匹配）
- ❌ 不实现完整 URL scheme 解析（YAGNI，未来需要时再加）
- ❌ 不改造原生侧页面栈管理（原生侧的 push/pop 实现不在本 spec 范围）
- ❌ 不做全局状态管理改造（独立议题）

---

## 2. 整体架构

```
┌──────────────────────────────────────────────────────────────┐
│                    Native App (iOS/Android)                  │
│  NavigationController / FragmentManager 维护页面栈           │
│                                                              │
│  Stack: [NativeA] → [RNContainer:moments] → [RNContainer:profile] │
└──────────────────────────────────────────────────────────────┘
                              ↕ bridge (NativeModule + Events)
┌──────────────────────────────────────────────────────────────┐
│                    RN Side (每个 RCTRootView)                │
│                                                              │
│  index.js  ──registerComponent──►  <AppRoot>                 │
│                                       │                      │
│                                       ▼                      │
│                               PageHost (注入 params)         │
│                                       │                      │
│                                       ▼                      │
│                        PageRegistry.resolve(pageName)        │
│                                       │                      │
│                                       ▼                      │
│                              具体页面组件                    │
└──────────────────────────────────────────────────────────────┘
```

### 2.1 职责划分

| 职责 | 承担方 |
|------|--------|
| 维护页面栈、转场动画、手势返回 | 原生 |
| 渲染 RN 页面、业务逻辑 | RN |
| 声明"有哪些 RN 页面、参数类型" | `routes.ts`（RN 侧） |
| 发起跳转 | RN 调 `Navigation.push()` → bridge → 原生 push 新容器 |
| 传参 | 原生 `initialProperties` → `PageHost` → Context → 目标组件 |
| 返回 | 原生手势/按钮 → 原生 pop；RN 主动返回走 `Navigation.pop()` → bridge |

### 2.2 目录结构

```
src/
├── app/
│   └── navigation/
│       ├── routes.ts           # 路由表（SSOT：pageName → {path, component}）
│       ├── types.ts            # RouteName + RouteParamsMap + Navigation API 签名
│       ├── PageRegistry.ts     # 根据 pageName 解析组件（懒加载）
│       ├── PageHost.tsx        # RN 根组件，接收 initialProperties，渲染目标页面
│       ├── RouteParamsContext.tsx  # React Context 承载当前页 params
│       ├── useRouteParams.ts   # 类型安全读取当前页参数
│       └── Navigation.ts       # push / pop / replace API
└── shared/
    └── bridges/
        └── native/
            └── navigationBridge.ts  # 调原生 push/pop 的 NativeModule 封装
```

---

## 3. 路由表与类型系统

### 3.1 路由表 (`routes.ts`)

所有 RN 页面集中声明，SSOT：

```ts
export const routes = {
  chat:          { path: '/chat/:chatId',        component: () => require('@/modules/chat/pages/ChatDetailPage').default },
  userProfile:   { path: '/profile/:userId',     component: () => require('@/modules/profile/pages/UserProfilePage').default },
  settings:      { path: '/settings',            component: () => require('@/modules/profile/pages/SettingsPage').default },
  moments:       { path: '/moments',             component: () => require('@/modules/discover/moments/pages/MomentsPage').default },
  videoChannel:  { path: '/video-channel',       component: () => require('@/modules/discover/videoChannel/pages/VideoChannelPage').default },
  scan:          { path: '/scan',                component: () => require('@/modules/discover/scan/pages/ScanPage').default },
  shake:         { path: '/shake',               component: () => require('@/modules/discover/shake/pages/ShakePage').default },
  nearby:        { path: '/nearby',              component: () => require('@/modules/discover/nearby/pages/NearbyPage').default },
  shopping:      { path: '/shopping',            component: () => require('@/modules/discover/shopping/pages/ShoppingPage').default },
  search:        { path: '/search',              component: () => require('@/modules/discover/search/pages/SearchPage').default },
  gameCenter:    { path: '/games',               component: () => require('@/modules/discover/game/pages/GameCenterPage').default },
  gameContainer: { path: '/games/:gameId',       component: () => require('@/modules/discover/game/pages/GameContainerPage').default },
} as const;
```

**要点：**
- `path` 字段当前不做解析，仅为 SSOT 和未来 deep link 扩展点
- `component` 使用 `() => require(...)` 懒加载，避免冷启动加载所有页面
- `as const` 保证 TS 推导出精确字面量类型

### 3.2 参数类型表 (`types.ts`)

```ts
export interface RouteParamsMap {
  chat:          { chatId: string; contactName?: string };
  userProfile:   { userId: string };
  settings:      void;
  moments:       void;
  videoChannel:  void;
  scan:          void;
  shake:         void;
  nearby:        void;
  shopping:      void;
  search:        { keyword?: string };
  gameCenter:    void;
  gameContainer: { gameId: string };
}

export type RouteName = keyof RouteParamsMap;
```

### 3.3 Navigation API 签名

```ts
interface NavigationAPI {
  push<K extends RouteName>(
    name: K,
    ...args: RouteParamsMap[K] extends void ? [] : [RouteParamsMap[K]]
  ): void;

  pop(): void;

  replace<K extends RouteName>(
    name: K,
    ...args: RouteParamsMap[K] extends void ? [] : [RouteParamsMap[K]]
  ): void;
}
```

**使用示例：**

```ts
Navigation.push('chat', { chatId: 'c1', contactName: '张伟' });  // ✓
Navigation.push('chat', { userId: 'u1' });                        // ✗ 编译错误
Navigation.push('settings');                                      // ✓ void 参数省略
Navigation.push('userProfile');                                   // ✗ 编译错误：缺 userId
```

### 3.4 组件内读取 params

```tsx
// ChatDetailPage.tsx
import { useRouteParams } from '@/app/navigation/useRouteParams';

export default function ChatDetailPage() {
  const { chatId, contactName = '聊天' } = useRouteParams('chat');
  // ...
}
```

`useRouteParams` 从 `RouteParamsContext` 读取，不使用全局变量，测试时可直接通过 Provider 注入 mock params。

---

## 4. Bridge 协议与数据流

### 4.1 冷启动流程（原生打开 RN 页面）

```
1. 原生侧：
   RCTRootView(
     moduleName: "WeChatRN",
     initialProperties: {
       pageName: "chat",
       params: { chatId: "c1", contactName: "张伟" }
     }
   )

2. index.js:
   AppRegistry.registerComponent('WeChatRN', () => AppRoot);

3. AppRoot (src/App.tsx 新版):
   function AppRoot(props) {
     return <PageHost {...props} />;
   }

4. PageHost:
   - 从 props 解构 { pageName, params }
   - PageRegistry.resolve(pageName) → 拿到组件
   - <RouteParamsProvider value={{ name: pageName, params }}>
       <TargetComponent />
     </RouteParamsProvider>
```

### 4.2 RN 发起跳转流程

```
1. 业务代码：
   Navigation.push('userProfile', { userId: 'u1' });

2. Navigation.ts:
   navigationBridge.push({ pageName: 'userProfile', params: { userId: 'u1' } });

3. navigationBridge (NativeModule):
   NativeModules.NavigationBridge.push({ pageName, params });

4. 原生侧（本 spec 不涉及实现，仅定义协议）：
   - 解析 pageName
   - 若为 RN 页面：创建新 RCTRootView，initialProperties = { pageName, params }
   - 若为原生页面（未来扩展）：走原生跳转逻辑
   - push 到 NavigationController
```

### 4.3 Bridge 协议定义

RN → Native（NativeModule 方法）：

```ts
NavigationBridge.push(payload: {
  pageName: string;      // RouteName
  params: object | null; // JSON-safe
  animated?: boolean;    // 默认 true
}): void;

NavigationBridge.pop(payload: {
  animated?: boolean;
}): void;

NavigationBridge.replace(payload: {
  pageName: string;
  params: object | null;
  animated?: boolean;
}): void;
```

**约束：**
- `params` 必须可 JSON 序列化（无函数、无循环引用、无 Date 对象）
- `pageName` 由 RN 侧路由表定义，原生侧需有对应映射表
- 原生侧不认识的 `pageName` 应触发降级处理（上报 + fallback 或忽略）

### 4.4 错误处理

| 场景 | 处理 |
|------|------|
| `pageName` 不在路由表 | dev 环境抛错，prod 环境 console.error + 不跳转 |
| `params` 类型错误 | 编译期由 TS 拦截（运行时不做二次校验，保持轻量） |
| `initialProperties` 中无 `pageName` | `PageHost` 渲染 fallback 错误页 + 上报 |
| NativeModule `NavigationBridge` 未注册 | Bridge 封装层 no-op + dev 环境 warn |

---

## 5. 迁移方案

### 5.1 改动清单

**新增文件：**
- `src/app/navigation/routes.ts`
- `src/app/navigation/types.ts`
- `src/app/navigation/PageRegistry.ts`
- `src/app/navigation/PageHost.tsx`
- `src/app/navigation/RouteParamsContext.tsx`
- `src/app/navigation/useRouteParams.ts`
- `src/app/navigation/Navigation.ts`
- `src/shared/bridges/native/navigationBridge.ts`

**修改文件：**
- `App.tsx` — 替换为简单的 `AppRoot`，委托给 `PageHost`
- `index.js` — 保持 `registerComponent('WeChatRN', () => AppRoot)` 不变
- `ChatDetailPage.tsx` — 从 `useRouteParams('chat')` 读取参数
- `GameCenterPage.tsx` — 删除内部 `useState<GameDefinition>` + `require()` 逻辑，改为 `Navigation.push('gameContainer', { gameId })`
- `GameContainerPage.tsx` — 删除 `onBack` prop，改为 `Navigation.pop()`；`game` 通过 `useRouteParams('gameContainer')` + `GAMES` 查表获取
- `MomentsPage.tsx` — 删除 `onBack` prop（返回由原生栈处理）
- `tsconfig.json` — 添加 `paths` 别名 `"@/*": ["src/*"]`
- `babel.config.js` — 添加 `babel-plugin-module-resolver` 配合别名

**删除：**
- `App.tsx` 中的 `HomePage` + `switch/case` 逻辑（调试入口另行处理，见 5.3）

### 5.2 页面迁移 Checklist（每个页面都走一遍）

- [ ] 在 `routes.ts` 注册
- [ ] 在 `RouteParamsMap` 声明参数类型
- [ ] 组件内若需参数，改用 `useRouteParams(name)`
- [ ] 页面内跳转改用 `Navigation.push/pop/replace`
- [ ] 删除 `onBack` prop（交给原生栈）
- [ ] 验证 PageScaffold 的 `navMode` 是否仍合适

### 5.3 调试入口（HomePage 去留）

原 `App.tsx` 的 HomePage 是开发期调试菜单。迁移后方案：

- **保留**：作为 dev 环境下的调试入口，注册为 `debugHome` 路由，原生侧在 debug build 中默认打开此页面
- HomePage 内每个菜单项改为 `Navigation.push('xxx', ...)`，真实走原生栈，便于调试完整跳转链路

### 5.4 原生侧需要配合的事项（本 spec 不实现，仅列出需求）

1. 实现 `NavigationBridge` NativeModule，暴露 `push/pop/replace`
2. 在原生侧建立 `pageName → RN/Native 页面` 的映射表
3. 打开 RN 容器时，将 `pageName` + `params` 通过 `initialProperties` 注入
4. 原生页面也能被 RN 端 `Navigation.push('someNativePage')` 触发（pageName 空间是共享的）

---

## 6. 测试策略

| 层 | 测试内容 | 手段 |
|----|---------|------|
| `PageRegistry` | pageName 解析、未知 pageName 报错 | Jest 单测 |
| `useRouteParams` | 正确从 Context 取值、无 Provider 时报错 | React Testing Library |
| `Navigation` API | 调用 bridge 时参数正确 | Mock NativeModule + Jest |
| `PageHost` | 根据 pageName 渲染正确组件 + 注入 params | RTL |
| 类型系统 | `push` 调用的参数类型检查 | TS `expectError` / `tsd` 断言 |

---

## 7. 风险与缓解

| 风险 | 影响 | 缓解 |
|------|------|------|
| 原生侧 NativeModule 未就绪 | RN 侧无法真正跳转 | Bridge 封装层做 no-op + dev warn，前期可用 HomePage 调试菜单模拟 |
| 懒加载 `require()` 在 Metro 打包异常 | 某些页面白屏 | CI 增加烟雾测试：遍历 routes 逐个 resolve 检查不抛错 |
| `params` 序列化丢失复杂对象 | 页面拿到的数据不完整 | 文档明确约束；dev 环境在 bridge 层检测不可序列化内容并 warn |
| GameCenter → GameContainer 改走原生栈后，`GameDefinition` 完整对象无法传递 | 原方案是内存传 `game` 对象 | 改为传 `gameId`，GameContainerPage 内从 `GAMES` 常量按 id 查询 |

---

## 8. 未来扩展点（out of scope）

- **Deep Link 支持**：`routes.ts` 的 `path` 字段已预留；未来加一个 `resolveByPath(url)` 函数即可
- **页面结果回传**：需要 `push` 返回 Promise，等被 pop 时 resolve；原生侧需配合提供回调机制（可作为 v2）
- **页面栈查询**：`Navigation.getStack()` / `Navigation.popToRoot()`，等确有需求再加

---

## 9. 附录：参考示例

### 9.1 完整的跳转示例

```tsx
// MomentsPage.tsx 中点某人头像
import { Navigation } from '@/app/navigation/Navigation';

<Pressable onPress={() => Navigation.push('userProfile', { userId: post.user.id })}>
  <Avatar uri={post.user.avatar} />
</Pressable>
```

```tsx
// UserProfilePage.tsx 接收
import { useRouteParams } from '@/app/navigation/useRouteParams';

export default function UserProfilePage() {
  const { userId } = useRouteParams('userProfile');
  // ...
}
```

### 9.2 新增页面 checklist（3 步）

1. 写组件 `XxxPage.tsx`
2. 在 `routes.ts` 加一行：`xxx: { path: '/xxx', component: () => require('...').default }`
3. 在 `RouteParamsMap` 加一行：有参数写 `xxx: { userId: string }`，无参数写 `xxx: void`

完成。类型系统自动推导，使用方立刻可用。
