# WeChatRN

> 高仿微信项目的 **React Native 侧** —— 不是独立 App,而是**以「页面提供方」身份嵌入原生微信壳**(WeChatSwift):原生每个二级页面宿主一个 RN 页面,目前用 RN 实现了 **19 个页面**(朋友圈、聊天、视频号、通讯录系列、设置等)。基于 **RN 0.84 新架构(Fabric + TurboModule)** + **TypeScript**,JS bundle 可走 OSS **热更新**。

---

## 架构:原生壳 + RN 页面宿主

不走「RN 接管整个 App」的路子,而是 **一个原生页面 = 一个 RN 页面宿主**,做原生与 RN 的细粒度混合:

```
原生 (WeChatSwift)                          RN (本仓库)
┌─────────────────────────┐
│ 点「发现 → 朋友圈」        │  pageName="moments"   ┌──────────────────────────┐
│ 创建 RN 容器 VC           │  + params ──────────► │ index.js → AppRoot        │
│ (RCTReactNativeFactory)   │                       │  └ PageHost(pageName)     │
│                           │                       │     └ PageRegistry 查表    │
│ NavbarBridge/NetBridge…   │ ◄──── TurboModule ───►│        └ MomentsPage 渲染  │
└─────────────────────────┘                       └──────────────────────────┘
```

- **PageHost / PageRegistry / routes**(`src/app/navigation/`):原生传入 `pageName + params`,RN 据 `routes.ts` 注册表惰性 `require` 对应页面渲染;启动时强校验「有且仅有一个 `initPage`」。
- **一份 bundle、多页面复用**:同一 RN 实例按需渲染任意已注册页面,原生只管「要哪个页 + 参数」。
- **热更新**:`bundle/ios/main.jsbundle` 产物上 OSS,原生加载远端 bundle,改 RN 不发版即更新。

---

## 已接入的 RN 页面(19)

| 模块 | 页面 |
|---|---|
| **发现** | 朋友圈 `moments` ⭐、视频号 `videoChannel`、扫一扫 `scan`、摇一摇 `shake`、附近的人 `nearby`、购物 `shopping`、搜一搜 `search`、游戏中心 `gameCenter` / 游戏容器 `gameContainer` |
| **通讯录** | 新的朋友 `contactNewFriends`、群聊 `contactGroups`、标签 `contactTags` / 新建标签 `contactTagCreate`、公众号 `contactOfficialAccounts`、通讯录搜索 `contactSearch` |
| **聊天 / 我** | 聊天详情 `chat`、个人资料 `userProfile`、设置 `settings` |
| **调试** | RN Debug 首页 `debugHome`(默认入口页) |

---

## ⭐ 桥接层:类型安全的 TurboModule 双向桥

`src/shared/bridges/` 是工程亮点 —— 把原生能力以**强类型、分层**方式暴露给 RN,全部基于 **新架构 TurboModule(codegen)**:

```
bridges/
├── common/      # 通用桥(7)
│   ├── navbar/         导航栏(原生/RN 双模式、右键、外观)
│   ├── navigation/     页面跳转(push 原生 / RN 页)
│   ├── net/            网络(复用原生网络栈、统一鉴权)
│   ├── cache/          缓存读写
│   ├── toast/          轻提示
│   ├── device/         设备信息
│   └── permission/     权限申请
└── business/    # 业务桥
    └── scan/           扫一扫 + 相册选图
```

**分三层、职责清晰**(以 navbar 为例):
- `NativeNavbarBridge.ts` — `TurboModuleRegistry.getEnforcing<Spec>('NavbarBridge')`,codegen 原生绑定层
- `navbarBridge.ts` — JS 封装层,补默认值 / 收敛类型 / 友好 API
- `hooks/useNavbar.ts` — React 钩子层,页面里声明式调用

业务侧只认顶层 API 与 hooks,native 协议改动被 wrapper 层吸收,不外溢到页面。

---

## ⭐ 旗舰页:朋友圈(Moments)

`src/modules/discover/moments/` —— 完整复刻朋友圈时间线:

- **数据**:`Post` / `Comment` 模型、`momentsReq` 请求层、`mockData` 假数据
- **状态**:`useMoments`(列表 / 点赞 / 分页)、`useCommentInput`(评论输入态)
- **组件**:`ImageGrid`(九宫格图,单/多图自适应)、`LikeList`、`CommentInput`、`PostActionSheet`(点赞/评论浮层)、`VideoThumb`、图片查看器(`react-native-image-viewing`)

是嵌入式 RN 页里复杂度最高的一个:列表性能、手势浮层、图文混排、与原生导航栏联动。

---

## 其它共享设施(`src/shared/`)

- **UI kit**(`ui/`):`PageScaffold` / `ScreenHeader` / `SearchBar` / `ListSection` / `ListCell` / `Avatar` / `EmptyState` / `icons` + 设计 token(`tokens.ts`)
- **事件总线**(`events/`):`EventBus` + `registry` + `useAppEvent`,跨页 / 原生事件订阅
- **网络**(`net/`):`http` 封装,经 `NetBridge` 复用原生网络栈
- **模型**(`models/`):`User` 等共享领域模型

---

## 目录结构

```
WeChatRN/
├── index.js / App.tsx        # 入口:AppRegistry → AppRoot → PageHost
├── src/
│   ├── app/navigation/       # PageHost · PageRegistry · routes · RouteParams
│   ├── modules/              # 业务页面(discover / contacts / chat / profile / debug)
│   └── shared/               # bridges · ui · events · net · models
├── bundle/ios/main.jsbundle  # 打包产物(上 OSS 热更)
├── ios/ · android/           # RN 原生工程(主要在 iOS 侧嵌入 WeChatSwift)
└── docs/
```

## 技术栈

- **React Native 0.84**(新架构:Fabric 渲染 + TurboModule)
- **TypeScript**(全量类型)
- `@react-navigation/native` · `react-native-screens` · `react-native-safe-area-context`
- `react-native-svg` · `react-native-webview` · `react-native-image-viewing`
- Jest 单测、ESLint + Prettier

---

## 开发

```sh
# 启动 Metro
yarn start

# 跑 iOS 自测(首次先 cd ios && bundle install && bundle exec pod install)
yarn ios

# 打离线 bundle(供原生 / OSS 热更)
npx react-native bundle --platform ios --dev false \
  --entry-file index.js --bundle-output bundle/ios/main.jsbundle
```

> 真实运行形态是被 **WeChatSwift** 原生工程通过 `RCTReactNativeFactory` 加载、按 `pageName` 渲染对应页面;独立 `yarn ios` 仅用于 RN 侧自测(默认进 `debugHome`)。

---

*WeChatSwift 高仿微信项目的 React Native 子工程,聚焦「原生壳 + RN 页面宿主」的混合开发与 TurboModule 桥接。*
