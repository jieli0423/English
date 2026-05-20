import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const API_KEY = process.env.DEEPSEEK_API_KEY

function buildSystemPrompt(type) {
  if (type === 'analyze-sentence') {
    return `你是一名专业的考研英语语法分析专家。请分析用户输入的英文句子，并严格按以下 JSON 格式返回（不要包含 markdown 代码块标记）：

{
  "main": "句子主干结构",
  "clauses": [
    { "type": "从句类型", "text": "从句原文", "desc": "语法说明" }
  ],
  "modifiers": [
    { "text": "修饰成分原文", "type": "修饰类型", "desc": "作用说明" }
  ],
  "keyWords": [
    { "word": "单词", "meaning": "中文释义" }
  ],
  "translation": "整句中文翻译"
}

注意：
- main 只保留最核心的主谓宾/主系表结构
- clauses 列出所有从句，标注类型（如：让步状语从句、定语从句、宾语从句、主语从句等）
- modifiers 列出所有修饰成分（如：时间状语、地点状语、介词短语作定语等）
- keyWords 提取 4-6 个考研核心词汇
- translation 给出通顺的中文翻译`
  }

  if (type === 'review-writing') {
    return `你是一名专业的考研英语作文批改专家。请分析用户输入的英语作文，并严格按以下 JSON 格式返回（不要包含 markdown 代码块标记）：

{
  "score": 0-20之间的数字,
  "totalScore": 20,
  "level": "优秀/良好/一般/较差",
  "grammarIssues": [
    { "type": "错误类型", "original": "原文片段", "suggestion": "修改建议", "severity": "major/minor" }
  ],
  "improvements": [
    { "original": "原文表达", "advanced": "高级替换", "note": "替换说明" }
  ],
  "revisedEssay": "修改后的完整范文",
  "overallAdvice": "整体建议（一段中文文字）"
}

注意：
- score 基于考研英语作文评分标准（满分20分）
- grammarIssues 列出所有语法问题，严重问题 severity 为 major，轻微问题为 minor
- improvements 提供 3-5 个高级表达替换建议
- revisedEssay 输出完整的修改后范文
- overallAdvice 给出该作文的整体提升建议`
  }

  return ''
}

app.post('/api/analyze-sentence', async (req, res) => {
  const { sentence } = req.body
  if (!sentence || !sentence.trim()) {
    return res.status(400).json({ error: '请输入要分析的英文句子' })
  }

  if (!API_KEY) {
    return res.status(503).json({
      error: '服务未配置 API Key，请检查 .env 文件中的 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: buildSystemPrompt('analyze-sentence') },
          { role: 'user', content: sentence },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('DeepSeek API error:', response.status, errText)
      return res.status(502).json({ error: `DeepSeek API 返回错误 (${response.status})` })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return res.status(502).json({ error: 'DeepSeek API 返回内容为空' })
    }

    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      return res.status(502).json({ error: 'AI 返回格式异常，请重试' })
    }

    res.json(parsed)
  } catch (err) {
    console.error('Request failed:', err.message)
    res.status(502).json({ error: `请求 DeepSeek API 失败：${err.message}` })
  }
})

app.post('/api/review-writing', async (req, res) => {
  const { essay } = req.body
  if (!essay || !essay.trim()) {
    return res.status(400).json({ error: '请输入要批改的作文' })
  }

  if (!API_KEY) {
    return res.status(503).json({
      error: '服务未配置 API Key，请检查 .env 文件中的 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: buildSystemPrompt('review-writing') },
          { role: 'user', content: essay },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('DeepSeek API error:', response.status, errText)
      return res.status(502).json({ error: `DeepSeek API 返回错误 (${response.status})` })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return res.status(502).json({ error: 'DeepSeek API 返回内容为空' })
    }

    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      return res.status(502).json({ error: 'AI 返回格式异常，请重试' })
    }

    res.json(parsed)
  } catch (err) {
    console.error('Request failed:', err.message)
    res.status(502).json({ error: `请求 DeepSeek API 失败：${err.message}` })
  }
})

app.listen(PORT, () => {
  console.log(`✓ API proxy server running on http://localhost:${PORT}`)
  if (!API_KEY) {
    console.warn('⚠ DEEPSEEK_API_KEY not configured. Create .env file with DEEPSEEK_API_KEY=your_key')
  }
})
