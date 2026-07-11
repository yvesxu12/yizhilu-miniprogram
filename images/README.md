# Tab Bar 图标说明

由于 Tab Bar 图标需要 PNG 格式，当前使用占位方案：

## 方案A：使用 iconfont 字体图标（推荐）
在 app.wxss 中引入 iconfont，然后在 tabBar 配置中使用字体图标。
需要配置 `"custom": true` 使用自定义 tabBar。

## 方案B：使用纯色占位图
在微信开发者工具中，tabBar 图标会显示为灰色方块，不影响功能验证。
后续可以替换为实际设计的图标。

## 方案C：在线生成简单图标
使用以下工具快速生成：
- iconfont.cn 下载8个图标（正常+选中态）
- 尺寸：81px × 81px
- 格式：PNG（透明背景）

## 需要的图标清单（共10个）：
- tab-home.png / tab-home-active.png     — 首页
- tab-service.png / tab-service-active.png — 服务
- tab-mood.png / tab-mood-active.png      — 心情
- tab-message.png / tab-message-active.png — 消息
- tab-mine.png / tab-mine-active.png      — 我的

## 快速解决方案：
在微信开发者工具中，如果缺少图标文件，tabBar仍能显示文字导航，
只是没有图标。可以正常开发和预览所有功能。
