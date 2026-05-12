# AI HOT 个人速览页 — 设计文档

## 定位

个人快速浏览页 — 打开即看最新 AI 动态，极简高效，手机友好。

## 技术方案

- 单文件 `index.html`（HTML + CSS + JS 内联）
- 零外部依赖，双击即开
- 数据源：aihot.virxact.com 公开 API（匿名，无需 token）
- 缓存：localStorage 短期缓存 + JS 内存变量运行时缓存

## 页面结构

```
HEADER: Logo + 搜索框 + 存档入口
TAB BAR: 全部 | 模型发布 | 产品发布 | 行业动态 | 论文研究 | 技巧与观点
CONTENT: 毛玻璃新闻卡片列表
```

## 视觉风格

- 玻璃态（Glassmorphism）：深色渐变背景 + 毛玻璃卡片
- 背景：`#0f0c29 → #302b63 → #24243e` 缓慢流动动画
- 卡片：`rgba(255,255,255,0.08)` + `backdrop-filter: blur(20px)` + `border: rgba(255,255,255,0.12)`
- 分类标签色：模型 `#667eea` / 产品 `#f093fb` / 行业 `#4facfe` / 论文 `#43e97b` / 技巧 `#fa709a`

## 功能清单

### 核心
1. Tab 分类切换（前端过滤，零延迟）
2. 展开/收起摘要（默认只显示标题+来源+时间）
3. 原文链接（每条新闻可跳转原文）

### 搜索
- 输入关键词 → 调用 `items?q=关键词&take=30`
- 搜索结果替换当前内容区
- 清空搜索恢复 Tab 视图

### 日报存档
- 点击存档图标 → 底部滑出存档面板
- 显示最近 14 天日报索引（日期 + 头条标题）
- 点击某天 → 拉取完整日报 → 5 版块纵向排列 + 主编点评 + 快讯
- 返回按钮回到实时流

## 数据流

| 操作 | API 调用 | 缓存策略 |
|---|---|---|
| 页面加载 | `items?mode=selected&take=50` | localStorage 5 分钟 |
| 页面加载（后台） | `dailies?take=14` | localStorage 30 分钟 |
| Tab 切换 | 无（前端过滤） | JS 内存 |
| 搜索 | `items?q=xxx&take=30` | localStorage 10 分钟 |
| 存档点击 | `daily/{date}` | localStorage 2 小时 |
| 翻页 | `items?cursor=xxx&take=50` | 不缓存 |

## 移动端适配

- Tab 栏横滑（overflow-x: auto）
- 搜索框图标点击展开
- 卡片全宽 100%，16px 内边距
- 存档面板底部全屏弹出
- 触摸反馈（scale 微缩 + 透明度变化）

## 文件结构

```
d:\PM assistant\14_每日AI新闻\
  ├── SKILL.md
  ├── index.html    （单文件，所有代码内联）
  └── docs/plans/   （设计文档）
```
