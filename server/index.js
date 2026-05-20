import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}))
app.use(express.json({ limit: '1mb' }))

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const API_KEY = process.env.DEEPSEEK_API_KEY

// DeepSeek API 请求超时（毫秒）
const DEEPSEEK_TIMEOUT = 25000

async function callDeepSeek(systemPrompt, userContent, maxTokens = 2048) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT)

  let response
  try {
    response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw Object.assign(new Error('DeepSeek API 请求超时，请稍后重试'), { status: 504 })
    }
    throw Object.assign(new Error(`请求 DeepSeek API 失败：${err.message}`), { status: 502 })
  }
  clearTimeout(timeoutId)

  if (!response.ok) {
    const errText = await response.text()
    console.error('DeepSeek API error:', response.status, errText)
    throw Object.assign(new Error(`DeepSeek API 返回错误 (${response.status})`), { status: 502 })
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw Object.assign(new Error('DeepSeek API 返回内容为空'), { status: 502 })
  }

  try {
    return safeJSONParse(content)
  } catch {
    throw Object.assign(new Error('AI 返回格式异常，请重试'), { status: 502 })
  }
}

/**
 * Fault-tolerant JSON parsing: handles markdown code blocks, trailing text, etc.
 */
function safeJSONParse(text) {
  if (!text) throw new Error('Empty response')

  // Try direct parse first
  try {
    return JSON.parse(text)
  } catch { /* fall through */ }

  // Try extracting JSON from markdown code blocks: ```json ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim())
    } catch { /* fall through */ }
  }

  // Try finding a JSON object with regex: {...}
  const objectMatch = text.match(/\{[\s\S]*\}/)
  if (objectMatch) {
    try {
      return JSON.parse(objectMatch[0])
    } catch { /* fall through */ }
  }

  // Try finding a JSON array with regex: [...]
  const arrayMatch = text.match(/\[[\s\S]*\]/)
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0])
    } catch { /* fall through */ }
  }

  // Last resort: try to fix common issues (single quotes, trailing commas)
  const cleaned = text
    .replace(/'/g, '"')             // replace single quotes with double
    .replace(/,\s*}/g, '}')         // remove trailing commas in objects
    .replace(/,\s*\]/g, ']')        // remove trailing commas in arrays
    .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')  // quote unquoted keys
  try {
    return JSON.parse(cleaned)
  } catch {
    throw new Error('AI returned non-JSON response that could not be parsed')
  }
}

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

  if (type === 'analyze-reading') {
    return `你是一名顶级的考研英语阅读讲解专家。请分析用户提供的阅读文章和题目，并严格按以下 JSON 格式返回（不要包含 markdown 代码块标记）：

{
  "structure": "文章整体结构分析（中文，2-3句话概括行文脉络）",
  "paragraphSummaries": [
    { "index": 1, "summary": "第一段主旨大意（中文）" },
    { "index": 2, "summary": "第二段主旨大意（中文）" }
  ],
  "questionAnalysis": [
    {
      "questionIndex": 1,
      "type": "题目类型",
      "locatingSentence": "该题在原文中的定位句（英文原文）",
      "correctAnswer": "正确选项字母（A/B/C/D）",
      "explanation": "为什么选这个选项（中文详细解析）",
      "errorAnalysis": "常见错误选项分析（中文）",
      "tips": "该类题型的解题技巧（中文）"
    }
  ],
  "generalTips": [
    "考研阅读通用技巧1",
    "考研阅读通用技巧2"
  ]
}

注意：
- 仔细分析每道题的原文定位句，确保定位准确
- 解析要详细，适合中国考研学生理解
- 解题技巧要具体、可操作`
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
      error: '服务未配置 API Key，请联系管理员配置 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  try {
    const parsed = await callDeepSeek(
      buildSystemPrompt('analyze-sentence'),
      sentence,
      2048
    )
    res.json(parsed)
  } catch (err) {
    console.error('analyze-sentence error:', err.message)
    const status = err.status || 502
    res.status(status).json({ error: err.message })
  }
})

app.post('/api/review-writing', async (req, res) => {
  const { essay } = req.body
  if (!essay || !essay.trim()) {
    return res.status(400).json({ error: '请输入要批改的作文' })
  }

  if (!API_KEY) {
    return res.status(503).json({
      error: '服务未配置 API Key，请联系管理员配置 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  try {
    const parsed = await callDeepSeek(
      buildSystemPrompt('review-writing'),
      essay,
      4096
    )
    res.json(parsed)
  } catch (err) {
    console.error('review-writing error:', err.message)
    const status = err.status || 502
    res.status(status).json({ error: err.message })
  }
})

app.post('/api/analyze-reading', async (req, res) => {
  const { passage, questions } = req.body
  if (!passage || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: '缺少阅读文章或题目数据' })
  }

  if (!API_KEY) {
    return res.status(503).json({
      error: '服务未配置 API Key，请联系管理员配置 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  try {
    const userContent = JSON.stringify({ passage, questions }, null, 2)
    const parsed = await callDeepSeek(
      buildSystemPrompt('analyze-reading'),
      userContent,
      4096
    )
    res.json(parsed)
  } catch (err) {
    console.error('analyze-reading error:', err.message)
    const status = err.status || 502
    res.status(status).json({ error: err.message })
  }
})

app.post('/api/analyze-word', async (req, res) => {
  const { word, meaning, phonetic, example } = req.body
  if (!word || !word.trim()) {
    return res.status(400).json({ error: '缺少单词信息' })
  }

  if (!API_KEY) {
    return res.status(503).json({
      error: '服务未配置 API Key，请联系管理员配置 DEEPSEEK_API_KEY',
      needConfig: true,
    })
  }

  const wordInfo = JSON.stringify({ word, meaning, phonetic, example }, null, 2)

  try {
    const parsed = await callDeepSeek(
      `你是一名顶级的考研英语词汇教学专家。请分析用户提供的考研英语单词，并严格按以下 JSON 格式返回（不要包含 markdown 代码块标记）：

{
  "chineseMeaning": "中文释义（精确到考研常考义项）",
  "examMeanings": ["考研常见含义1", "考研常见含义2", "考研常见含义3"],
  "rootAnalysis": "词根词缀分析（拆解词根、前缀、后缀，说明如何推导出词义）",
  "exampleSentence": "考研真题风格例句（英文）",
  "exampleTranslation": "例句中文翻译",
  "confusingWords": [
    { "word": "易混词", "meaning": "含义", "difference": "与目标词的区别" }
  ],
  "mnemonic": "联想记忆法（有趣、易记的联想方式，帮助记忆）",
  "collocations": ["常用搭配1", "常用搭配2", "常用搭配3", "常用搭配4"],
  "writingUsage": "写作可用表达（说明该词在考研写作中如何应用，给出具体句型）"
}

注意：
- 考研常见含义要列出 2-4 个高频义项
- 易混词辨析要说明核心区别
- 联想记忆法要具体、好记
- 写作可用表达要给出可直接套用的句型模板
- 所有中文解释要准确、适合考研学生理解`,
      wordInfo,
      2048
    )
    res.json(parsed)
  } catch (err) {
    console.error('analyze-word error:', err.message)
    const status = err.status || 502
    res.status(status).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✓ API proxy server running on http://localhost:${PORT}`)
  if (!API_KEY) {
    console.warn('⚠ DEEPSEEK_API_KEY not configured. Create .env file with DEEPSEEK_API_KEY=your_key')
  }
})
