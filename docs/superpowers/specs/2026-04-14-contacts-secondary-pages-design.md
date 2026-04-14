# 通讯录二级页面设计规范（WeChat 对齐 + 精致化）

> 日期：2026-04-14
> 范围：通讯录模块 6 个二级页面。5 个 RN 页面 + 1 个原生页面（联系人详情）。

## 1. 设计基础

### 1.1 色彩 Token

| Token | 值 | 用途 |
|---|---|---|
| `brand` | `#07C160` | 主操作按钮、选中态 |
| `brandPressed` | `#06AD56` | 主按钮按压 |
| `danger` | `#FA5151` | 删除、红点 |
| `bgPage` | `#EDEDED` | 分组列表页面底色 |
| `bgCard` | `#FFFFFF` | 卡片/行背景 |
| `bgCardPressed` | `#D9D9D9` | 行按压反馈 |
| `textPrimary` | `#191919` | 主文字 |
| `textSecondary` | `#888888` | 副文字 / 分组标题 |
| `textTertiary` | `#B2B2B2` | 占位、时间戳 |
| `separator` | `#E5E5E5` | 分割线（`StyleSheet.hairlineWidth`） |
| `searchBg` | `#E7E7E7` | 搜索框背景 |

### 1.2 字体

- iOS `System` / Android `sans-serif-medium`
- `title` 17/600 · `cellTitle` 17/400 · `cellSubtitle` 13/400 · `sectionHeader` 14/400 · `indexLabel` 11/400

### 1.3 尺寸 / 间距

- 列表行高 56（无副标题）/ 64（有副标题）
- 头像 40×40、圆角 4（方形圆角，非圆）
- 行左右 padding 16；头像-文字间距 12
- 分组之间灰色间隙 28

### 1.4 精致化细节（相对微信的微调）

1. 分割线使用 `hairlineWidth` + `#E5E5E5`，比微信原生稍淡
2. 行按压反馈：150ms 过渡（`Pressable` + `Animated.timing`），非瞬间跳变
3. 头像默认加 1px 内描边 `rgba(0,0,0,0.04)`，灰底上更清晰
4. 搜索框有 80ms 聚焦缩放（`scale 1 → 0.995`）
5. 空状态用 line-icon 风格插画（单色 `#CCCCCC`），不用 emoji

### 1.5 共用组件（新增于 `src/shared/ui/`）

- `ListCell.tsx` — 行容器（左图标/头像 + 主副文字 + 右 badge/箭头）
- `ListSection.tsx` — 白卡片分组，自动加 hairline
- `SearchBar.tsx` — 顶部圆角搜索框（7px 圆角、灰底、放大镜）
- `Avatar.tsx` — 图片 / 首字母 fallback / 9 宫格群聊头像
- `EmptyState.tsx` — 图标 + 文案 + 次级按钮

---

## 2. 页面规范

### 2.1 新的朋友（RN）

**顶部**：默认导航栏（`navMode: native`）标题"新的朋友"，右侧"添加朋友"。
**主体**：
- 顶部 `SearchBar`（"添加朋友"占位）
- 分组 1：朋友推荐（可选，有则显示）
- 分组 2：**新的朋友申请列表**
  - 行：头像 40 + 昵称（17/400） + 来源"朋友验证"（13/`textSecondary`）
  - 右侧状态：
    - 待接受：`brand` 实心按钮"接受"（高 28、圆角 4、内边距 12）
    - 已添加：`textTertiary` 文字"已添加"
    - 已过期：`textTertiary` 文字"已过期"
- 底部：`ListCell` "添加手机联系人" / "添加 QQ 好友"（左图标 + 右箭头）

**空状态**：列表为空时显示 `EmptyState`：线性"人+" 图标 + "还没有新的朋友" + 次按钮"添加朋友"。

---

### 2.2 群聊（RN）

**顶部**：导航栏"群聊"，右侧 "+"（发起群聊）。
**主体**：
- `SearchBar`
- `ListCell` "发起群聊"（左：brand 绿色圆角方图标 + "+" 白色 icon；右箭头）
- `ListCell` "保存到通讯录的群聊"（右箭头）
- 分组标题"我的群聊"
- 群聊行：**9 宫格头像**（40×40，内部 3×3 网格，每格 12×12 间距 1） + 群名 + 右侧成员数 `textTertiary`（"23"）

---

### 2.3 标签（RN）

**顶部**：导航栏"标签"，右侧"新建"（brand 色文字按钮）。
**主体**：
- 分组标题"按标签"
- 标签行（复用 `ListCell`）：
  - 左侧：去掉头像，缩进保持 16
  - 主文字：标签名 17/400
  - 副文字：`textTertiary` "3 个联系人"
  - 右：箭头
- 进入某标签 → 展示该标签下的联系人列表（复用通讯录行样式）

**空状态**：`EmptyState` 标签图标 + "还没有标签" + brand 按钮"新建标签"。

**新建标签页（二级）**：
- 导航栏右侧"保存"（brand 文字）
- 顶部 `TextInput` "请输入标签名"（白卡片、48 高、左 padding 16）
- 下方大按钮"从通讯录选择"（brand 色、高 44、圆角 6）
- 已选联系人以头像 chip 列表展示（横向滚动，头像 36+姓名 11）

---

### 2.4 公众号（RN）

**顶部**：导航栏"公众号"，右侧放大镜（进入搜索）。
**主体**：
- 分组标题"全部公众号"（浅灰）
- 行（`ListCell` 变体，高 64）：
  - 左：**圆形头像 44×44**（公众号用圆，与联系人方形区分）
  - 主文字：公众号名 17/400
  - 副文字：最近推送标题 13/`textSecondary` 单行省略
  - 右：时间 11/`textTertiary`（"昨天" / "3-15"）+ 下方未读红点

---

### 2.5 联系人详情页 / 他人主页（**原生**）

> 本期只实现 iOS 原生（`WeChatSwift`），Android Kotlin 暂不实现。RN 通过 bridge 路由到 iOS 原生页；Android 侧先留路由占位。

**iOS（SwiftUI 或 UIKit + SnapKit）**：

- 整页底色 `#EDEDED`
- 顶部导航透明，右上角 "···" 更多
- **Header 区**（白卡片，圆角 0，底部 hairline）：
  - 头像 64×64 圆角 6，左 padding 16，垂直居中
  - 右侧：昵称 20/600、备注名（若有）15/`textSecondary`、微信号"微信号: xxx" 13/`textSecondary`、地区 13/`textSecondary`
- **信息分组 1**：设置备注和标签 / 朋友权限（右箭头）
- **信息分组 2**：朋友圈（右显示最近 3 张缩略图 28×28 / 箭头）/ 视频号
- **信息分组 3**：更多信息（性别、地区）
- **底部粘性操作区**（白色卡片 + 顶部 hairline，安全区内）：
  - 两个等宽按钮，间距 12：
    - 主按钮「发消息」 `brand` 背景 + 白字 + 聊天气泡 icon（高 48、圆角 8）
    - 次按钮「音视频通话」白底 + brand 描边 + brand 字 + 视频 icon

**Android**：本期不实现。

**精致化**：
- Header 下拉到超出 120 时，头像随手指下移（`translateY = offset * 0.4`）与标题渐显
- 发消息按钮按压时微信没有动效，我们加一个 `scale 1 → 0.97` 100ms

---

### 2.6 搜索页（RN）

**入口**：点通讯录顶部搜索框，push 本页，带淡入 120ms。

**顶部**：
- 自定义搜索条（替换默认 navbar）：左"取消"文字按钮（brand 色）+ 右侧搜索框 `flex:1`，自动 focus
- 状态栏同步白色

**主体（分态）**：

1. **空查询态**：
   - 横向快捷入口（4 grid）："联系人" / "群聊" / "聊天记录" / "公众号"，每个 = 圆角方形浅灰底 + 线性 icon + 14 标签
2. **输入中态**：
   - 分组展示结果：
     - "联系人"：ListCell，匹配字符高亮 `brand` 色
     - "群聊"：九宫格头像 + 群名
     - "聊天记录"：头像 + 昵称 + 命中消息摘录（匹配高亮）+ 时间
     - "公众号"：圆头像 + 名称
   - 每组最多显示 3 条，>3 显示"查看更多（N）"
3. **无结果态**：`EmptyState` 放大镜图标 + "没有找到相关结果"

**交互**：
- 输入防抖 200ms
- 清除按钮（灰色 × 圆形）在输入框右侧
- 命中字符使用 `<Text>` 分片，`brand` 色标出

---

## 3. 目录结构与文件

```
src/modules/contacts/views/
  NewFriendsScreen.tsx          // 2.1
  GroupChatsScreen.tsx          // 2.2
  TagsScreen.tsx                // 2.3
  TagCreateScreen.tsx           // 2.3 子页
  OfficialAccountsScreen.tsx    // 2.4
  SearchScreen.tsx              // 2.6
  components/
    FriendRequestRow.tsx
    GroupAvatar.tsx
    TagChip.tsx
    SearchHitText.tsx
    QuickEntryGrid.tsx

src/shared/ui/
  ListCell.tsx
  ListSection.tsx
  SearchBar.tsx
  Avatar.tsx
  EmptyState.tsx
  tokens.ts                     // 色彩/字体/间距 token

WeChatSwift/.../ContactDetail/
  ContactDetailViewController.swift
  ContactDetailHeaderView.swift
  ContactDetailActionBar.swift

```

> Android（`WeChatKotlin`）本期不实现。

## 4. 路由 / Bridge

- RN 5 个页面通过现有 RN Navigator 注册
- 联系人详情：RN 调用 `NativeRouter.push('ContactDetail', {userId})` → iOS 打开原生页；Android 先返回未实现或降级 RN 占位
- 搜索页：从通讯录首页的搜索框触发，`navigation.navigate('ContactSearch')`

## 5. 验收清单

- [ ] 所有行按压反馈使用 150ms 过渡
- [ ] 分割线使用 `hairlineWidth`
- [ ] 不使用任何 emoji，图标全部为 SVG / 矢量
- [ ] 点击区域满足 ≥44pt
- [ ] 文字对比度 ≥4.5:1（已通过 token 保证）
- [ ] 空状态、加载态、错误态均覆盖
- [ ] iOS / Android 原生详情页视觉对齐 RN 页面
- [ ] 搜索防抖 200ms，命中高亮正确
