# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指引。

## 项目概述

医职路（yizhilu）微信小程序 — 职业规划 + 心理教练 + 青少年成长的 AI 驱动 O2O 平台。

- **AppID**: `wx6c8032cff272a0ac`
- **技术栈**: 微信原生框架 (WXML/WXSS/JS) + 微信云开发 + DeepSeek API
- **GitHub**: `git@github.com:yvesxu12/yizhilu-miniprogram.git`

## 开发命令

```bash
# 无构建步骤。在微信开发者工具中直接打开项目目录即可编译预览。
# 点击"预览"生成二维码，手机扫码真机测试。
# 点击"上传"提交版本到小程序管理后台。

# 部署云函数（在微信开发者工具中操作）：
# 右键 cloudfunctions/<函数名> → 上传并部署
# 环境变量 DEEPSEEK_API_KEY 需在云开发控制台手动配置
```

## 架构

```
app.json          ← 页面注册 + TabBar + 云开发开关 + 窗口配置
app.js            ← 全局入口，用户登录状态管理（wx.getStorageSync('userInfo')）
app.wxss          ← 全局样式：.card, .btn-primary, .tag-*, .stars
utils/util.js     ← 工具函数 + AI API 封装（chatWithAI, analyzeMood）
cloudfunctions/   ← 微信云函数（需在微信开发者工具中上传部署）
```

**当前 `app.json` 只注册了 `pages/home/home`（单页面模式）。其他页面文件已存在于 `pages/` 目录，需要时在 `app.json` 的 `pages` 数组中注册即可激活。**

### 页面清单

| 目录 | 功能 | 状态 |
|------|------|------|
| `pages/home/` | 首页：Banner轮播 + 三线入口卡片 + 推荐教练横滑 + 免费工具 | 已注册 |
| `pages/service/` | 服务列表：4Tab切换（职业/教练/倾听/青少年）+ 筛选 + 真实数据 | 已开发 |
| `pages/mood/` | 心情日记：5级emoji选择 + AI共情回复 + 历史记录 | 已开发 |
| `pages/message/` | 消息列表：AI/真人混合对话列表 | 已开发 |
| `pages/mine/` | 个人中心：登录态 + 订单概况 + 菜单 | 已开发 |
| `pages/login/` | 微信一键登录 + 协议勾选 + 游客模式 | 已开发 |
| `pages/ai-chat/index/` | AI对话：三种角色（小暖倾听/小职规划/小知家长）+ 安全检测 | 已开发 |
| `pages/listen/connect/` | 倾听连接：时长选择 + 脉冲动画 + 通话界面 | 已开发 |
| `pages/provider/detail/` | 服务方详情：简介 + 服务列表 + 用户评价 | 已开发 |
| `pages/order/create/` | 三步下单：需求 → 时间 → 确认 | 已开发 |
| `pages/message/chat/` | 聊天详情：IM对话界面 | 已开发 |

### 云函数

| 函数 | 用途 | API 依赖 |
|------|------|----------|
| `aiChat` | AI对话（listener/career/parent 三种人格 Prompt） | DeepSeek API |
| `aiMood` | 心情日记 AI 共情回复（50字以内温暖回应） | DeepSeek API |
| `getOpenId` | 获取用户 OpenID | 微信云开发 |

**降级策略**: 所有 AI 云函数在 API 不可用时返回安全兜底回复，不会因 API 故障导致功能不可用。

### 数据流

- 用户状态：`wx.setStorageSync('userInfo')` → `app.globalData` → 页面 `onShow` 同步
- 心情日记：`wx.setStorageSync('mood_YYYY-MM-DD')` 单日记录 + `wx.setStorageSync('mood_history')` 历史数组
- 用户协议：`wx.setStorageSync('hasAgreedPrivacy')` 标记是否已同意
- 登录流程：`pages/login/login` → `wx.getUserProfile` → 写入 Storage → `navigateBack`

### 安全机制

- AI 对话页内置危险关键词检测（`dangerWords` 数组），触发时日志标注不阻断对话
- 所有 AI 云函数带 API 不可用降级回复
- 倾听/教练服务的合规措辞：不使用"心理咨询""治疗""诊断"等词

### 设计系统

- 主色 `#5B9BD5`（冷静蓝），辅助色 `#66BB6A`（温暖绿），强调色 `#F5A623`（暖橙）
- 卡片圆角 `16rpx`，按钮圆角 `48rpx`，阴影 `0 2rpx 12rpx rgba(0,0,0,0.06)`
- 单位全部使用 `rpx`（750rpx = 屏幕宽度）
