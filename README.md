# 考研英语 AI 提分训练平台

基于 DeepSeek 大模型的考研英语 AI 学习工具，覆盖长难句解析、阅读精讲、作文批改、单词记忆四大模块。

## 功能

- **AI 长难句解析** — 一键拆解句子主干、从句和修饰成分，标注考研考点
- **AI 阅读精讲** — 逐题精讲阅读文章，分析定位句、正确选项和干扰项
- **AI 作文批改** — 基于考研评分标准的智能批改，语法纠错 + 高级替换 + 润色范文
- **AI 单词记忆助手** — 自定义每日背词任务，AI 精讲单词的考研考点和记忆方法

## 快速开始

```bash
# 安装依赖
npm install

# 配置 API Key
# 复制 .env.example 为 .env，填入你的 DeepSeek API Key
cp .env.example .env

# 启动开发服务器（前端 + API 代理）
npm run dev
```

启动后访问 http://localhost:5173

## 环境要求

- Node.js >= 18
- npm >= 9

## 项目结构

```
├── server/              # API 代理服务（Express）
│   └── index.js         # DeepSeek API 调用（4 个端点）
├── src/
│   ├── components/      # React 页面组件
│   │   └── ui/          # 通用 UI 组件
│   ├── data/
│   │   └── mockData.js  # Mock 数据（AI 不可用时的降级数据）
│   └── services/
│       ├── api.js       # 前端 API 封装
│       └── prompts.js   # API 消息提示和 Mock 降级数据
├── .env                 # API Key（不提交到 Git）
├── .env.example         # 环境变量模板
└── vite.config.js       # Vite 配置（含 API 代理）
```

## API 端点

| 端点 | 功能 |
|---|---|
| `POST /api/analyze-sentence` | 长难句语法分析 |
| `POST /api/analyze-reading` | 阅读文章精讲分析 |
| `POST /api/review-writing` | 作文批改评分 |
| `POST /api/analyze-word` | 单词考研维度精讲 |

## 技术栈

- **前端**: React 18 + React Router v6 + Tailwind CSS 3 + Vite 5
- **后端**: Express（开发环境 API 代理）
- **AI**: DeepSeek API
